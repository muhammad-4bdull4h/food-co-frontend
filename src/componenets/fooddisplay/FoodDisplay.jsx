import React, { useContext } from "react";
import "./fooddisplay.css";
import { storeContext } from "../../context/storeContext";
import FoodItem from "../fooditem/FoodItem";
import Loader from "../loader/Loader";

function FoodDisplay({ category, setCategory }) {
  const { food_list } = useContext(storeContext);

  if (food_list.length === 0) {
    return <Loader />;
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category)
            return <FoodItem key={index} {...item} />;
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
