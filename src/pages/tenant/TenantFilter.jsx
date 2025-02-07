/* eslint-disable react/prop-types */
import { Card, Col, Form, Input, Row } from "antd";

export const TenantFilter = ({ children }) => {
  return (
    <Card>
      <Row>
        <Col span={16}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name={"q"}>
                <Input.Search placeholder="search" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};
