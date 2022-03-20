import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import Faq from "../FAQs/Faq";
import "./Home.css";

const Home = () => {
  return (
    <div className="grandpa__wrapper">
      <AppBar />
      <div className="grandpa__content_wrapper">
        <div className="grandpa__main_content_wrapper">
          <Outlet />
        </div>
        <div className="grandpa__faq_wrapper">
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default Home;
