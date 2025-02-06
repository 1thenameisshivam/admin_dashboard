import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import {
  BellFilled,
  GiftFilled,
  HomeFilled,
  ProductFilled,
  ShopFilled,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router";
import { Logo } from "../components/icons/Logo";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "../http/api";
export const Dashboard = () => {
  const { user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuthStore();
  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logOut,
    onSuccess: async () => {
      logout();
      return;
    },
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (user == null) {
    return <Navigate to={"auth/login"} replace={true} />;
  }

  const items = [
    {
      key: "/",
      icon: <HomeFilled />,
      label: <NavLink to={"/"}>Home</NavLink>,
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: <NavLink to={"/users"}>Users</NavLink>,
    },
    {
      key: "/resturants",
      icon: <ShopFilled />,
      label: <NavLink to={"/resturants"}>Resturants</NavLink>,
    },
    {
      key: "/products",
      icon: <ProductFilled />,
      label: <NavLink to={"/products"}>Products</NavLink>,
    },
    {
      key: "/promos",
      icon: <GiftFilled />,
      label: <NavLink to={"/promos"}>Promos</NavLink>,
    },
  ];

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="p-5">
            <Logo />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={["/"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              background: colorBgContainer,
            }}
          >
            <Flex align="center" justify="space-between">
              <Badge text="global user" status="success" />
              <Space size={16}>
                <Badge dot={true}>
                  <BellFilled />
                </Badge>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        label: "Logout",
                        onClick: () => logoutMutate(),
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <Avatar
                    style={{
                      backgroundColor: "#fde3cf",
                      color: "#f56a00",
                    }}
                  >
                    U
                  </Avatar>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            PizzaHouse ©{new Date().getFullYear()} Created by SK
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
