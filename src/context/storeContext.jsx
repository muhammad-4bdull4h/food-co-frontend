import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const storeContext = createContext(null);

export const StorecontextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const URL = String(import.meta.env.VITE_URL);
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      toast.success("Added to cart")
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      toast.success("Added to cart")
    }
    if (token) {
      let res = await axios.post(
        URL + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    toast.success("removed from cart")
    if (token) {
      let res = await axios.delete(URL + "/api/cart/remove", {
        headers: { token },
        data: { itemId },
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      {
        if (cartItems[item] > 0) {
          let itemInfo = food_list.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${URL}/api/food/list`);
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const res = await axios.get(URL + "/api/cart/get", { headers: { token } });
    setCartItems(res.data.cartData);
  };

  useEffect(() => {
    async function LoadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    LoadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    URL,
    token,
    setToken,
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};
