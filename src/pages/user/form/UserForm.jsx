import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenant } from "../../../http/api";

export const UserForm = () => {
  const { data: tenant } = useQuery({
    queryKey: ["tenant"],
    queryFn: () =>
      getTenant().then((res) => {
        return res.data;
      }),
  });
  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size={16}>
          <Card title="Basic User Info">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name={"firstName"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name={"lastName"}
                  rules={[
                    { required: true, message: "Please input your last name!" },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name={"email"}
                  rules={[
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Security Info">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name={"password"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Role Info">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={"Id"}
                  name={"id"}
                  rules={[
                    {
                      required: true,
                      message: "Role is required",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    onChange={() => {}}
                    className="w-full"
                    allowClear="true"
                    placeholder="Select Role"
                  >
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="customer">Customer</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={"Tenant Id"}
                  name={"tenantId"}
                  rules={[
                    {
                      required: true,
                      message: "Tenant is required",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    onChange={() => {}}
                    className="w-full"
                    allowClear="true"
                    placeholder="Select Resturant"
                  >
                    {tenant?.map((details) => (
                      <Select.Option key={details.id} value={details.id}>
                        {details.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};
