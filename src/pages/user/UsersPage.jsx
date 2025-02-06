import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Space, Table } from "antd";
import { Link } from "react-router";
import { getUsers } from "../../http/api";
import { useAuthStore } from "../../store";
import { Navigate } from "react-router";
import { UserFilter } from "./UserFilter";

export const UsersPage = () => {
  const { user } = useAuthStore();
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
        />
        <div>
          <Table dataSource={data} columns={columns} rowKey={"id"} />;
        </div>
      </Space>
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
