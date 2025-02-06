import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { Link } from "react-router";
import { getUsers } from "../../http/api";
import { useAuthStore } from "../../store";
import { Navigate } from "react-router";
import { UserFilter } from "./UserFilter";
import { useState } from "react";
import { UserForm } from "./form/UserForm";

export const UsersPage = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return getUsers().then((res) => res.data.users);
    },
  });
  if (user.role !== "admin") {
    return <Navigate to={"/"}></Navigate>;
  }
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
              title: "Users",
            },
          ]}
        />
        <UserFilter
          onFilterChange={(name, value) => {
            console.log(value);
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            type="primary"
            icon={<PlusOutlined />}
          >
            Add User
          </Button>
        </UserFilter>
        <div>
          <Table dataSource={data} columns={columns} rowKey={"id"} />;
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
            <Button onClick={() => setOpen(true)} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
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
];
