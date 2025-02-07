import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { Link } from "react-router";
import { TenantFilter } from "./TenantFilter";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createTenant, getTenant } from "../../http/api";
import { useMemo, useState } from "react";
import { TenantForm } from "./form/TenantForm";
import { debounce } from "lodash";

export const TenantPage = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [formFilter] = Form.useForm();
  const [queryParams, setQuserParams] = useState({
    perPage: 6,
    currentPage: 1,
    q: "",
  });
  const { data: tenant } = useQuery({
    queryKey: ["tenant", queryParams],
    queryFn: async () => {
      const query = `perPage=${queryParams.perPage}&currentPage=${queryParams.currentPage}&q=${queryParams.q}`;
      return getTenant(query).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const debouncedUpdate = useMemo(() => {
    return debounce((value) => {
      setQuserParams((prev) => ({ ...prev, q: value }));
    }, 500);
  });
  const searchFilter = (value) => {
    const changedField = value
      .map((item) => ({
        [item.name[0]]: item.value,
      }))
      .reduce((acc, item) => ({ ...acc, ...item }), {});

    if ("q" in changedField) {
      debouncedUpdate(changedField.q);
    } else {
      setQuserParams((prev) => ({ ...prev, ...changedField }));
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: (userData) => createTenant(userData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tenant"] });
      form.resetFields();
      setOpen(false);
    },
  });
  const onSubmitForm = async () => {
    await form.validateFields();
    mutate(form.getFieldValue());
  };
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <>
      <Space direction="vertical" size={16} className="w-full">
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            {
              title: <Link to={"/"}>Home</Link>,
            },
            {
              title: "Resturant",
            },
          ]}
        />
        <Form form={formFilter} onFieldsChange={(value) => searchFilter(value)}>
          <TenantFilter
            onFilterChange={(name, value) => {
              console.log(value);
            }}
          >
            <Button
              onClick={() => setOpen(true)}
              type="primary"
              icon={<PlusOutlined />}
            >
              Add Resturant
            </Button>
          </TenantFilter>
        </Form>
        <div>
          <Table
            pagination={{
              total: tenant?.total,
              pageSize: queryParams.perPage,
              current: queryParams.currentPage,
              onChange: (page) => {
                setQuserParams((prev) => ({ ...prev, currentPage: page }));
              },
            }}
            dataSource={tenant?.data}
            columns={columns}
            rowKey={"id"}
          />
        </div>
      </Space>
      <Drawer
        title="Create a new Resturant"
        width={720}
        onClose={() => setOpen(false)}
        open={open}
        destroyOnClose={true}
        styles={{
          body: {
            paddingBottom: 80,
            background: colorBgLayout,
          },
        }}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={onSubmitForm} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <TenantForm />
        </Form>
      </Drawer>
    </>
  );
};
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
