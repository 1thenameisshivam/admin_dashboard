import {
  CodeSandboxOutlined,
  LineChartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../store";
import { Card, Space, Statistic, Typography, Row, Col, Divider } from "antd";

function HomePage() {
  const { user } = useAuthStore();
  const { Title } = Typography;

  return (
    <div style={{ padding: "20px", background: "#f5f5f5" }}>
      <Title level={4}>Welcome, {user.firstName} 😊</Title>
      <Row gutter={[16, 16]}>
        {/* Left Section */}
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card bordered={false} className="w-[100%]">
                <Statistic
                  title={
                    <Space>
                      <CodeSandboxOutlined className="bg-green-200 rounded p-1" />
                      Total Orders
                    </Space>
                  }
                  value={52}
                  valueStyle={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} className="w-[100%]">
                <Statistic
                  title={
                    <Space>
                      <LineChartOutlined className="bg-blue-200 rounded p-1" />
                      Total Sale
                    </Space>
                  }
                  value={70000}
                  prefix="₹"
                  valueStyle={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                />
              </Card>
            </Col>
          </Row>
          <Card
            bordered={false}
            className="w-[100%]"
            style={{ marginTop: "16px", height: "200px" }}
          >
            Sales Chart (Placeholder)
          </Card>
        </Col>

        {/* Right Section */}
        <Col xs={24} lg={8}>
          <Card
            bordered={false}
            style={{
              height: "100%",
              overflow: "auto",
            }}
          >
            <Title level={5} className="font-bold pb-4">
              <Space size={10}>
                <ShoppingOutlined />
                Recent Orders
              </Space>
            </Title>
            <div>
              {/* Sample Recent Orders */}
              <div className="flex justify-between font-medium">
                <div>
                  <div>Pizza, Margarita</div>
                  <div className="text-gray-400">Bandra, Mumbai </div>
                </div>
                <div>₹500</div>
                <div>Delivered</div>
              </div>
            </div>
            <Divider></Divider>
            <div>
              {/* Sample Recent Orders */}
              <div className="flex justify-between font-medium">
                <div>
                  <div>Pizza, Margarita</div>
                  <div className="text-gray-400">Bandra, Mumbai </div>
                </div>
                <div>₹500</div>
                <div>Delivered</div>
              </div>
            </div>
            <Divider></Divider>
            <div>
              {/* Sample Recent Orders */}
              <div className="flex justify-between font-medium">
                <div>
                  <div>Pizza, Margarita</div>
                  <div className="text-gray-400">Bandra, Mumbai </div>
                </div>
                <div>₹500</div>
                <div>Delivered</div>
              </div>
            </div>
            <Divider></Divider>
            <div>
              {/* Sample Recent Orders */}
              <div className="flex justify-between font-medium">
                <div>
                  <div>Pizza, Margarita</div>
                  <div className="text-gray-400">Bandra, Mumbai </div>
                </div>
                <div>₹500</div>
                <div>Delivered</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
