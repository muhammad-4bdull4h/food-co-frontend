import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../../context/storeContext";
import { assets } from "../../assets/assets";
import "./myorders.css";
import axios from "axios";

function MyOrders() {
  const [data, setData] = useState([]);
  const { URL, token } = useContext(storeContext);

  const fetchOrders = async () => {
    const res = await axios.get(URL + "/api/order/userorders", {
      headers: { token },
    });
    setData(res.data.data);
  };

  useEffect(() => {
    if (token) {
      (async () => {
        await fetchOrders();
      })();
    } else {
      setData([]);
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, idx) => {
          return (
            <div key={idx} className="my-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ",";
                  }
                })}
              </p>
              <p>${order.amount}</p>
              <p>items:{order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>{" "}
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrders;
