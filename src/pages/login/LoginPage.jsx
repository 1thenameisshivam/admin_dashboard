import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  Space,
} from "antd";
import { Logo } from "../../components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login, logOut, self } from "../../http/api";
import { useAuthStore } from "../../store";

const LoginPage = () => {
  const { setUser, logout } = useAuthStore();
  const loginUser = async (userData) => {
    const { data } = await login(userData);
    return data;
  };
  const getSelf = async () => {
    const { data } = await self();
    return data;
  };
  const { refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false,
  });

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logOut,
    onSuccess: async () => {
      logout();
      return;
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      const { data } = await refetch();
      if (data.user.role == "customer") {
        logoutMutate();
        return;
      }
      setUser(data.user);
    },
  });

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
            <Form
              onFinish={(value) => {
                mutate({ email: value.email, password: value.password });
              }}
              initialValues={{ remember: true }}
            >
              {isError && (
                <Alert
                  type="error"
                  message={error?.response?.data?.errors[0].message}
                  style={{ marginBottom: 20 }}
                />
              )}
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
                <Button
                  loading={isPending}
                  type={"primary"}
                  htmlType="submit"
                  className="w-full"
                >
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
