import { Layout } from "antd";
import Customer from "./Customer";
import Delivery from "./Delivery";
import Restaurant from "./Restaurant";

import "./styles.css";

export default function App() {
  return (
    <Layout>
      <Layout.Header style={{ color: "white" }}>
        <p>
          Food Delivery App | Backend powered by <b>Godspeed</b>
        </p>
      </Layout.Header>
      <Layout.Content className="wrapper">
        <Customer />
        <Restaurant />
        <Delivery />
      </Layout.Content>
    </Layout>
  );
}
