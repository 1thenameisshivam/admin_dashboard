/* eslint-disable react/no-unknown-property */
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Layout, Space } from "antd";
import { Logo } from "../../components/icons/Logo";

const LoginPage = () => {
  return (
    <>
      <Layout className="h-[100vh] flex justify-center items-center">
        <Space direction="vertical" size="large">
          <Layout.Content className="flex justify-center">
            <Logo />
          </Layout.Content>
          <Card
            className="w-[300px]"
            title={
              <Space className="w-full justify-center text-xl">
                <LockFilled />
                Sign in
              </Space>
            }
          >
            <Form initialValues={{ remember: true }}>
              <Form.Item
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <div className="flex justify-between">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="pt-[8px] text-[12px] " href="#">
                  Forgot password
                </a>
              </div>

              <Form.Item>
                <Button type={"primary"} htmlType="submit" className="w-full">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
