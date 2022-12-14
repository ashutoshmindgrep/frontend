import { Layout, List, Tag, Typography, Button, Card, Divider } from "antd";
import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([
    { orderStatus: "WAITING_FOR_APPROVAL_FROM_RESTAURANT" },
    { orderStatus: "" },
  ]);

  const fetchOrders = () => {
    fetch("/fetch-orders")
      .then((res) => res.json())
      .then((response) => {
        setOrders(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const acceptOrder = (orderId) => {
    fetchData(`/accept-or-reject-order/${orderId}`, "POST", {
      accept: true,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("order accepted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectOrder = (orderId) => {
    fetchData(`/accept-or-reject-order/${orderId}`, "POST", {
      accept: false,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("order accepted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card size="small" title="New Order" style={{ marginBottom: "12px" }}>
        <List
          bordered
          header="Items"
          size="small"
          dataSource={[{ title: "Paneed Pasanda", quantity: 1 }]}
          renderItem={(item) => (
            <List.Item>
              {item.title}
              <span style={{ color: "#ccc" }}> x </span>
              {item.quantity}
            </List.Item>
          )}
        />
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
        header="Today's orders"
        bordered
        itemLayout="horizontal"
        dataSource={orders}
        locale={{ emptyText: "There are no orders today." }}
        renderItem={(item, index) => {
          return (
            <List.Item>
              <a href="#">{`Order #${index + 1}`}</a>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default function Restaurant() {
  return (
    <Layout style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
      <Layout.Header style={{ background: "#f95959" }}>
        <p>Restaurant App</p>
      </Layout.Header>
      <Layout.Content style={{ padding: "6px", textAlign: "left" }}>
        <Orders />
      </Layout.Content>
    </Layout>
  );
}
