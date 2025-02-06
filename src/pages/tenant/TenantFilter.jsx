/* eslint-disable react/prop-types */
import { Card, Col, Input, Row } from "antd";

export const TenantFilter = ({ onFilterChange, children }) => {
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
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};
