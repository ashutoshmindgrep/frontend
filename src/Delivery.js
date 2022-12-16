import { Layout, Card, List, Button, Typography, Divider } from "antd";
import { useState, useEffect } from "react";
import { fetchData } from "./service";

const Deliveries = ({ orderAccepted, selectedRestaurant }) => {
  const [deliveries, setDelerivies] = useState([]);

  const fetchDeliveries = () => {
    // actually it's fetch orders
    if (selectedRestaurant) {
      fetchData(
        `http://demo.godspeed.systems/fetch-orders/${selectedRestaurant.id}`
      ).then((response) => {
        setDelerivies(response);
      });
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, [orderAccepted]);

  const acceptDelivery = (item) => {
    const deliveryId = 1;
    fetch(`http://demo.godspeed.systems/fetch-orders/${deliveryId}`, {
      method: "POST",
      body: JSON.stringify({
        accept: false,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectDelivery = (deliveryId) => {};

  return (
    <>
      {deliveries
        .filter(
          (order, index) => order.orderStatus === "WAITING_FOR_DELIVERY_PARTNER"
        )
        .filter((_, index) => index < 1)
        .map((item, index) => (
          <Card
            key={index}
            size="small"
            title="New Delivery"
            style={{ marginBottom: "12px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography.Text>from:</Typography.Text>
              <Typography.Text>{selectedRestaurant.name}</Typography.Text>
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
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  acceptDelivery(item);
                }}
              >
                Accept
              </Button>
            </div>
          </Card>
        ))}

      <List
        size="small"
        header="Today's deliveries"
        bordered
        itemLayout="horizontal"
        dataSource={deliveries}
        locale={{ emptyText: "There are no deliveries today." }}
        renderItem={(item, index) => {
          return (
            <List.Item key={index}>
              <a href="#">{`Delivery #${index + 1}`}</a>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default function Delivery({ orderAccepted, selectedRestaurant }) {
  return (
    <Layout style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
      <Layout.Header style={{ background: "#455d7a", color: "white" }}>
        <p>Delivery App</p>
      </Layout.Header>
      <Layout.Content style={{ padding: "6px", textAlign: "left" }}>
        <Deliveries
          selectedRestaurant={selectedRestaurant}
          orderAccepted={orderAccepted}
        />
      </Layout.Content>
    </Layout>
  );
}
