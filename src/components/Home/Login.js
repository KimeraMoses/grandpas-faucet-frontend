import React from "react";
import { Link } from "react-router-dom";
import Grandpa_Logo from "../../assets/images/Grandpa-Logo.png";
import Faq from "../FAQs/Faq";
import SignIn from "../SignIn/SignIn";
import "./Home.css";

const Login = () => {
  return (
    <div className="grandpa__wrapper">
      <div className="grandpa__header">
        <Link to="/">
          <img src={Grandpa_Logo} alt="GrandPa" />
        </Link>
      </div>
      <div className="grandpa__content_wrapper">
        <div className="grandpa__main_content_wrapper">
          <SignIn />
        </div>
        <div className="grandpa__faq_wrapper">
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default Login;
