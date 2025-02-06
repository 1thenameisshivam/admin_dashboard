import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import {
  GiftFilled,
  HomeFilled,
  ProductFilled,
  ShopFilled,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router";
import { Logo } from "../components/icons/Logo";
export const Dashboard = () => {
  const { user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
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
              padding: 0,
              background: colorBgContainer,
            }}
          />
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
