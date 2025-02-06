import { Card, Col, Input, Row, Select } from "antd";

// eslint-disable-next-line react/prop-types
export const UserFilter = ({ onFilterChange, children }) => {
  return (
    <Card>
      <Row>
        <Col span={16}>
          <Row gutter={16}>
            <Col span={8}>
              <Input.Search
                onChange={(e) => onFilterChange("SearchQuery", e.target.value)}
                placeholder="search"
              />
            </Col>
            <Col span={4}>
              <Select
                onChange={(e) => onFilterChange("RoleFilter", e)}
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
              <Select
                onChange={(e) => onFilterChange("StatusFilter", e)}
                className="w-full"
                allowClear="true"
                placeholder="Status"
              >
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
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
