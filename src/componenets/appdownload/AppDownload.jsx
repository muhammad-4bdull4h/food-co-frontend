import React from "react";
import "./appdownload.css";
import { assets } from "../../assets/assets";

function AppDownload() {
  return (
    <div className="appdownload" id="appdownload">
      <p>
        For beter Experience download <br /> Tomato App
      </p>
      <div className="app-platform">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
}

export default AppDownload;
