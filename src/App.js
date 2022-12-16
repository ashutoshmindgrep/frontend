import { Layout } from "antd";
import { useState } from "react";

import Customer from "./Customer";
import Delivery from "./Delivery";
import Restaurant from "./Restaurant";

import "./styles.css";

export default function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderAccepted, setOrderAccepted] = useState(false);

  return (
    <Layout>
      <Layout.Header style={{ color: "white" }}>
        <p>
          Food Delivery App | Backend powered by <b>Godspeed</b>
        </p>
      </Layout.Header>
      <Layout.Content className="wrapper">
        <Customer
          selectRestaurant={(restaurant) => {
            setSelectedRestaurant(restaurant);
          }}
          placeOrderSuccess={() => {
            setOrderPlaced(!orderPlaced);
          }}
        />
        <Restaurant
          selectedRestaurant={selectedRestaurant}
          orderPlaced={orderPlaced}
          orderAcceptedSuccess={() => {
            setOrderAccepted(!orderAccepted);
          }}
        />
        <Delivery
          orderAccepted={orderAccepted}
          selectedRestaurant={selectedRestaurant}
        />
      </Layout.Content>
    </Layout>
  );
}
