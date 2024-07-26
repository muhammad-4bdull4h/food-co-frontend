import React, { useContext, useEffect, useState } from "react";
import "./placeorder.css";
import { storeContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, setCartItems, URL } =
    useContext(storeContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    country: "",
  });

  const placeOrder = async (e) => {
    e.preventDefault();
    
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let res = await axios.post(URL + "/api/order/place", orderData, {
      headers: { token },
    });
    if (res.data.success) {
      setCartItems({});
      navigate("/myorders");
      toast.success("Order Placed Successfully");
    } else {
      navigate("/");
      alert("order failed");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="order-left">
        <p className="title">Delivery Information</p>
        <div className="fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.lastName}
            name="lastName"
            type="text"
            placeholder="last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          value={data.email}
          name="email"
          type="email"
          placeholder="email address"
        />
        <input
          required
          onChange={onChangeHandler}
          value={data.street}
          name="street"
          type="text"
          placeholder="Street"
        />
        <div className="fields">
          <input
            required
            onChange={onChangeHandler}
            value={data.city}
            name="city"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.state}
            name="state"
            type="text"
            placeholder="State/Province"
          />
        </div>
        <div className="fields">
          <input
            required
            name="zipCode"
            value={data.zipCode}
            onChange={onChangeHandler}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.county}
            name="country"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          type="text"
          placeholder="phone"
        />
      </div>
      <div className="order-right">
        <div className="total">
          <h2>Cart totals</h2>
          <div>
            <div className="total-details">
              <p>Sub total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
