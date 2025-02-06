import { Card, Col, Form, Input, Row } from "antd";

export const UserForm = () => {
  return (
    <Row>
      <Col span={24}>
        <Card title="Basic User Info">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
