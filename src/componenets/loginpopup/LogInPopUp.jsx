import React, { useContext, useEffect, useState } from "react";
import "./loginpopup.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../context/storeContext";
import axios from "axios";
import { toast } from "react-toastify";

function LogInPopUp({ setshowLogin }) {
  const [currState, setcurrState] = useState("logIn");
  const { URL, token, setToken } = useContext(storeContext);
  const [disabled, setdisable] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setData((prev) => ({ ...prev, [name]: val }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setdisable(true);
    let newUrl = URL;
    if (currState === "logIn") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    let res = await axios.post(newUrl, data);

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      setshowLogin(false);
      setToken(res.data.token);
      currState === "logIn"
        ? toast.success("logged in successfully")
        : toast.success("created account successfully in successfully");
      setdisable(false);
    } else {
      toast.error(res.data.message);
      setdisable(false);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="title">
          <h2>{currState}</h2>
          <img
            onClick={() => setshowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="log-input">
          {currState === "logIn" ? (
            <></>
          ) : (
            <input
              onChange={onchangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="your name"
              required
            />
          )}

          <input
            name="email"
            onChange={onchangeHandler}
            type="email"
            placeholder="your email"
            required
          />
          <input
            name="password"
            onChange={onchangeHandler}
            type="password"
            placeholder="password"
            required
          />
        </div>
        <button
          className={`${disabled ? "disable" : ""}`}
          disabled={disabled}
          type="submit"
        >
          {currState === "signUp" ? "create account" : "Login"}
        </button>
        <div className="condition">
          <input type="checkbox" required />
          <p>
            By clicking on "Create account" or "Login", you agree to our terms{" "}
          </p>
        </div>
        {currState === "logIn" ? (
          <p>
            create a new account?{" "}
            <span onClick={() => setcurrState("signUp")}>Click Here</span>
          </p>
        ) : (
          <></>
        )}
        {currState === "signUp" ? (
          <p>
            Already Have an accoun ?{" "}
            <span onClick={() => setcurrState("logIn")}>Click Here</span>
          </p>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}

export default LogInPopUp;
