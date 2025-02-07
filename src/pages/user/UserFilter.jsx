import { Card, Col, Form, Input, Row, Select } from "antd";

// eslint-disable-next-line react/prop-types
export const UserFilter = ({ children }) => {
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
            <Col span={4}>
              <Form.Item name={"role"}>
                <Select
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
            {/* <Col span={4}>
              <Select
                onChange={(e) => onFilterChange("StatusFilter", e)}
                className="w-full"
                allowClear="true"
                placeholder="Status"
              >
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col> */}
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};
