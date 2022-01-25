import React from "react";
import { Link, Outlet } from "react-router-dom";
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
      {/* <div
        className="grandpa__link__wrapper"
        style={{
          padding: "10px 30px 10px",
          backgroundColor: "#262626",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          borderRadius: 10,
          marginTop: 10
        }}
      >
        <Link to="/sign-in">Sign in</Link>
        <Link to="/confirm-otp">Confirm Otp</Link>
        <Link to="/sign-up">Sign up</Link>
        <Link to="/connect-metamask">Connect Mask</Link>
        <Link to="/status">Status</Link>
        <Link to="/transactions">Transactions</Link>
      </div> */}
    </div>
  );
};

export default Login;
