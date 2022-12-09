import { useState } from "react";
import "./restaurant.css";

const NoOrder = () => {
  return <div className="no-order">there are no orders today.</div>;
};

const Order = () => {
  return <div className="order">There is an upcoming order.</div>;
};

export default function Restaurant() {
  const [order] = useState(0);

  return (
    <div className="app">
      <h2 style={{ background: "#f95959" }}>Restaurant App</h2>
      {order === 0 ? <NoOrder /> : <Order />}
    </div>
  );
}
