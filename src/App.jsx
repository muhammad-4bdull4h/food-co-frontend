import React, { useState } from "react";
import NavBar from "./componenets/navbar/NavBar";
import "./App.css";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeorder/PlaceOrder";
import Footer from "./componenets/footer/Footer";
import LogInPopUp from "./componenets/loginpopup/LogInPopUp";
import MyOrders from "./pages/myorders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 8:45:20 / 10:01:04

function App() {
  const [showLogin, setshowLogin] = useState(false);
  return (
    <>
      {showLogin && <LogInPopUp setshowLogin={setshowLogin} />}
      <div className="app">
        <ToastContainer/>
        <NavBar setshowLogin={setshowLogin} showLogin={showLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
