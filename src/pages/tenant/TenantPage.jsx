import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Drawer, Space, Table, theme } from "antd";
import { Link } from "react-router";
import { TenantFilter } from "./TenantFilter";
import { useQuery } from "@tanstack/react-query";
import { getTenant } from "../../http/api";
import { useState } from "react";

export const TenantPage = () => {
  const [open, setOpen] = useState(false);
  // const [form] = Form.useForm();
  const { data: tenant } = useQuery({
    queryKey: ["tenant"],
    queryFn: () =>
      getTenant().then((res) => {
        return res.data;
      }),
  });
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
        <div>
          <Table dataSource={tenant} columns={columns} rowKey={"id"} />;
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
            <Button type="primary">Submit</Button>
          </Space>
        }
      >
        {/* <Form form={form} layout="vertical">
          <UserForm />
        </Form> */}
        <h1>jhff</h1>
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
