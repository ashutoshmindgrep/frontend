import Customer from "./Customer";
import Delivery from "./Delivery";
import Restaurant from "./Restaurant";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>
          Food Delivery App&nbsp;
          <span>
            | Backend powered by <b>Godspeed</b>
          </span>
        </h1>
        <div className="wrapper">
          <Customer />
          <Restaurant />
          <Delivery />
        </div>
      </div>
    </div>
  );
}
