import React from "react";
import "./Button.css";

const Button = (props) => {
    const { type, disabled } = props
  return (
    <button
      className={`grandpa__btn ${
        type === "secondary" ? "grandpa__btn_secondary" : "grandpa__btn_primary"
      } ${disabled? "btn__disabled" : ""}`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
