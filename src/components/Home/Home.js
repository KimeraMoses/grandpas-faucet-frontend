import React from "react";
import { Outlet } from "react-router-dom";

import Grandpa_Logo from "../../assets/images/Grandpa-Logo.png";
import Faq from "../FAQs/Faq";
import SignUp from "../SignUp/SignUp";
import "./Home.css";

const Home = () => {
  return (
    <div className="grandpa__wrapper">
      <div className="grandpa__header">
        <img src={Grandpa_Logo} alt="GrandPa" />
      </div>
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
