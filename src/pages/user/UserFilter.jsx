import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Select } from "antd";

export const UserFilter = () => {
  return (
    <Card>
      <Row>
        <Col span={16}>
          <Row gutter={16}>
            <Col span={8}>
              <Input.Search placeholder="search" />
            </Col>
            <Col span={4}>
              <Select
                className="w-full"
                allowClear="true"
                placeholder="Select Role"
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="customer">Customer</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select className="w-full" allowClear="true" placeholder="Status">
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          <Button type="primary" icon={<PlusOutlined />}>
            Add User
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
