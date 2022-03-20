import React from "react";
import AppBar from "../AppBar/AppBar";
import Faq from "../FAQs/Faq";
import SignIn from "../SignIn/SignIn";
import "./Home.css";

const Login = () => {
  return (
    <div className="grandpa__wrapper">
      <AppBar/>
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
