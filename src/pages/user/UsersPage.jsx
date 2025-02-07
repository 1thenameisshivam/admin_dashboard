import {
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Spin,
  Table,
  theme,
} from "antd";
import { Link } from "react-router";
import { cerateUser, getUsers } from "../../http/api";
import { useAuthStore } from "../../store";
import { Navigate } from "react-router";
import { UserFilter } from "./UserFilter";
import { useMemo, useState } from "react";
import { UserForm } from "./form/UserForm";
import { debounce } from "lodash";

export const UsersPage = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [queryParams, setQuserParams] = useState({
    perPage: 6,
    currentPage: 1,
    q: "",
    role: "",
  });
  const queryClient = useQueryClient();
  // eslint-disable-next-line no-unused-vars
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: async () => {
      const query = `perPage=${queryParams.perPage}&currentPage=${queryParams.currentPage}&q=${queryParams.q}&role=${queryParams.role}`;
      return getUsers(query).then((res) => res.data.users);
    },
    placeholderData: keepPreviousData,
  });
  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: (userData) => cerateUser(userData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      form.resetFields();
      setOpen(false);
    },
  });
  const debouncedUpdate = useMemo(() => {
    return debounce((value) => {
      setQuserParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
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
      setQuserParams((prev) => ({ ...prev, ...changedField, currentPage: 1 }));
    }
  };

  if (user.role !== "admin") {
    return <Navigate to={"/"}></Navigate>;
  }
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const onSubmitForm = async () => {
    await form.validateFields();
    mutate(form.getFieldValue());
  };
  return (
    <>
      <Space direction="vertical" size={16} className="w-full">
        <Flex justify="space-between">
          <Breadcrumb
            separator={<RightOutlined />}
            items={[
              {
                title: <Link to={"/"}>Home</Link>,
              },
              {
                title: "Users",
              },
            ]}
          />
          {isFetching && <Spin indicator={<LoadingOutlined spin />} />}
        </Flex>
        <Form form={formFilter} onFieldsChange={(value) => searchFilter(value)}>
          <UserFilter>
            <Button
              onClick={() => setOpen(true)}
              type="primary"
              icon={<PlusOutlined />}
            >
              Add User
            </Button>
          </UserFilter>
        </Form>

        <div>
          <Table
            pagination={{
              total: data?.total,
              pageSize: queryParams.perPage,
              current: queryParams.currentPage,
              onChange: (page) => {
                setQuserParams((prev) => ({ ...prev, currentPage: page }));
              },
              showTotal: (total, range) => {
                return `Showing${range[0]}-${range[1]} of ${total} items`;
              },
            }}
            dataSource={data?.data}
            columns={columns}
            rowKey={"id"}
          />
        </div>
      </Space>
      <Drawer
        title="Create a new user"
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
          <UserForm />
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
    render: (text, record) => (
      <h1>
        <Link to={`/users/${record.id}`}>
          {record.firstName} {record.lastName}
        </Link>
      </h1>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Resturant",
    dataIndex: "tenant",
    key: "tenant",
    render: (text, record) => {
      {
        return record.tenant?.name;
      }
    },
  },
];
