import React, { useContext } from "react";
import "./fooditem.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../context/storeContext";

function FoodItem({ _id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart, URL } =
    useContext(storeContext);

  return (
    <div className="food-item">
      <div className="img-container">
        <img
          src={URL + "/images/" + image}
          alt="network error"
          className="item-img"
        />
        {!cartItems[_id] ? (
          <img
            onClick={() => addToCart(_id)}
            src={assets.add_icon_white}
            alt=""
            className="add"
          />
        ) : (
          <div className="counter">
            <img
              onClick={() => removeFromCart(_id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[_id]}</p>
            <img
              onClick={() => addToCart(_id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="info">
        <div className="rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="item-info">{description}</p>
        <p className="item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
