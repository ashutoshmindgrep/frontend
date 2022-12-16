import { Layout, List, Tag, Typography, Button, Card, Divider } from "antd";
import { useState, useEffect } from "react";
import { fetchData } from "./service";

const Orders = ({ orderPlaced, restaurantId, orderAcceptedSuccess }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    if (restaurantId) {
      fetchData(`http://demo.godspeed.systems/fetch-orders/${restaurantId}`)
        .then((response) => {
          setOrders(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [orderPlaced]);

  const acceptOrder = (orderId) => {
    fetch(`http://demo.godspeed.systems/accept-or-reject-order/${orderId}`, {
      method: "POST",
      body: JSON.stringify({
        accept: true,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        fetchOrders();
        orderAcceptedSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectOrder = (orderId) => {
    fetch(`http://demo.godspeed.systems/accept-or-reject-order/${orderId}`, {
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
        fetchOrders();
        orderAcceptedSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const readyForPickUp = (orderId) => {
    fetch(`http://demo.godspeed.systems/food-prepared/${orderId}`, {
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
        fetchOrders();
        orderAcceptedSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {orders
        .filter((order, index) => order.orderStatus === "PLACED")
        .filter((_, index) => index < 1)
        .map((order) =>
          order.orderStatus === "PLACED" ? (
            <Card
              key={order.id}
              size="small"
              title="New Order"
              style={{ marginBottom: "12px" }}
            >
              <List
                bordered
                header="Items"
                size="small"
                dataSource={order.orderItems}
                renderItem={(item) => (
                  <List.Item>
                    {`Item ${item.id}`}
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
                <Button
                  size="small"
                  danger
                  style={{ marginRight: "6px" }}
                  onClick={() => {
                    rejectOrder(order.id);
                  }}
                >
                  Reject
                </Button>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    acceptOrder(order.id);
                  }}
                >
                  Accept
                </Button>
              </div>
            </Card>
          ) : null
        )}

      <List
        size="small"
        header="Today's orders"
        bordered
        itemLayout="horizontal"
        dataSource={orders}
        locale={{ emptyText: "There are no orders today." }}
        renderItem={(item, index) => {
          return (
            <List.Item
              key={index}
              extra={
                item.orderStatus === "WAITING_FOR_APPROVAL_FROM_RESTAURANT" ? (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => readyForPickUp(item.id)}
                  >
                    Ready for Pickup
                  </Button>
                ) : (
                  <Tag
                    color={
                      item.orderStatus === "WAITING_FOR_DELIVERY_PARTNER"
                        ? "green"
                        : "yellow"
                    }
                  >
                    {item.orderStatus}
                  </Tag>
                )
              }
            >
              <a href="#">{`Order #${index + 1}`}</a>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default function Restaurant({
  selectedRestaurant,
  orderPlaced,
  orderAcceptedSuccess,
}) {
  return (
    <Layout style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
      <Layout.Header style={{ background: "#f95959" }}>
        <p>
          Restaurant App{" "}
          {selectedRestaurant ? `(${selectedRestaurant.name})` : null}
        </p>
      </Layout.Header>
      <Layout.Content style={{ padding: "6px", textAlign: "left" }}>
        <Orders
          orderPlaced={orderPlaced}
          restaurantId={selectedRestaurant ? selectedRestaurant.id : null}
          orderAcceptedSuccess={orderAcceptedSuccess}
        />
      </Layout.Content>
    </Layout>
  );
}
