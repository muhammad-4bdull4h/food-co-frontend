import React, { useState } from "react";
import "./home.css";
import Header from "../../componenets/header/Header";
import ExploreMenu from "../../componenets/exploremenu/ExploreMenu";
import FoodDisplay from "../../componenets/fooddisplay/FoodDisplay";
import AppDownload from "../../componenets/appdownload/AppDownload";

function Home() {
  const [category, setCategory] = useState("All");
  return (
    <div className="home">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} setCategory={setCategory} />
      <AppDownload />
    </div>
  );
}

export default Home;
