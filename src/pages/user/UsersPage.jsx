import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router";

export const UsersPage = () => {
  return (
    <div>
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
    </div>
  );
};
