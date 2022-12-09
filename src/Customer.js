import { useEffect, useState } from "react";
import "./customer.css";

const RestaurantOne = ({ name, cuisine }) => {
  return (
    <div className="restaurant">
      <div className="left"></div>
      <div className="right">
        <p className="name">{name}</p>
        <p className="cuisine">{cuisine}</p>
      </div>
    </div>
  );
};

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/find-restaurant-near-me?city=dehradun")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div className="restaurant-list">
      {[
        { name: "Kumar Veg", cuisine: "Veg, Indian, Punjabi" },
        { name: "Punjabi Tadka", cuisine: "Non veg, Indian, Punjabi" },
        { name: "Bottle and Kitchen", cuisine: "Continental, Indian, Fusion " }
      ].map((restaurant, index) => (
        <RestaurantOne key={index} {...restaurant} />
      ))}
    </div>
  );
};

export default function Customer() {
  return (
    <div className="app">
      <h2 style={{ background: "#233142", color: "white" }}>Customer App</h2>
      <RestaurantList />
    </div>
  );
}
