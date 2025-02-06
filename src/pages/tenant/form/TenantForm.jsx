import { Card, Col, Form, Input, Row, Space } from "antd";

export const TenantForm = () => {
  return (
    <Row>
      <Space direction="vertical">
        <Col span={24}>
          <Space direction="vertical" size={16}>
            <Card title="Basic Reaturant Info" className="w-[675px]">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Name"
                    name={"name"}
                    rules={[
                      {
                        required: true,
                        message: "Please input the name!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Address"
                    name={"address"}
                    rules={[
                      { required: true, message: "Please input the address!" },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>
      </Space>
    </Row>
  );
};
