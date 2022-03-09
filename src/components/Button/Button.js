import React from "react";
import "./Button.css";

const Button = (props) => {
    const { variant, disabled, fullWidth } = props
  return (
    <button
      className={`grandpa__btn ${
        variant === "secondary" ? "grandpa__btn_secondary" :variant==="tartiary"? "grandpa__btn_tartiary": "grandpa__btn_primary"
      } ${fullWidth? "grandpa__btn_full": ""} ${disabled? "btn__disabled" : ""}`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
