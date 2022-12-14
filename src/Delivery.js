import { Layout, Card, List, Button, Typography, Divider } from "antd";
import { useState, useEffect } from "react";
import { fetchData } from "./service";

const Deliveries = () => {
  const [deliveries, setDelerivies] = useState([
    { orderStatus: "WAITING_FOR_APPROVAL_FROM_RESTAURANT" },
    { orderStatus: "" },
  ]);

  const fetchDeliveries = () => {
    // actually it's fetch orders
    fetchData("/fetch-orders")
      .then((res) => res.json())
      .then((response) => {
        setDelerivies(response);
      });
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const acceptDelivery = (deliveryId) => {};
  const rejectDelivery = (deliveryId) => {};

  return (
    <>
      <Card size="small" title="New Delivery" style={{ marginBottom: "12px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography.Text>from:</Typography.Text>
          <Typography.Text>Restaurant Name</Typography.Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography.Text>to:</Typography.Text>
          <Typography.Text>Customer address</Typography.Text>
        </div>
        <Divider></Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "6px",
          }}
        >
          <Button size="small" danger style={{ marginRight: "6px" }}>
            Reject
          </Button>
          <Button size="small" type="primary">
            Accept
          </Button>
        </div>
      </Card>
      <List
        size="small"
        header="Today's deliveries"
        bordered
        itemLayout="horizontal"
        dataSource={deliveries}
        locale={{ emptyText: "There are no deliveries today." }}
        renderItem={(item, index) => {
          return (
            <List.Item>
              <a href="#">{`Delivery #${index + 1}`}</a>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default function Delivery() {
  return (
    <Layout style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
      <Layout.Header style={{ background: "#455d7a", color: "white" }}>
        <p>Delivery App</p>
      </Layout.Header>
      <Layout.Content style={{ padding: "6px", textAlign: "left" }}>
        <Deliveries />
      </Layout.Content>
    </Layout>
  );
}
