import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import { toast } from "react-toastify";

function NavBar({ setshowLogin, showLogin }) {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, food_list, setCartItems, setToken } =
    useContext(storeContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/");
    toast.success("logged out");
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img className="logo" src={assets.logo} alt="" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to={"/"}
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#appdownload"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <img onClick={() => setMenu("")} src={assets.basket_icon} alt="" />
          </Link>
          {getTotalCartAmount() === 0 ? <></> : <div className="dot"></div>}
        </div>
        {food_list.length === 0 ? (
          ""
        ) : !token ? (
          <button onClick={() => setshowLogin(!showLogin)}>Sign in</button>
        ) : (
          <div className="nav-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <Link to={"/myorders"}>
                <li>
                  <img src={assets.bag_icon} alt="" /> <p>Orders</p>{" "}
                </li>
              </Link>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>{" "}
              </li>
            </ul>
          </div>
        )}
        {/* {} */}
      </div>
    </div>
  );
}

export default NavBar;
