import { Checkbox, FormControlLabel } from "@material-ui/core";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import React from "react";
import "../SignIn/SignIn.css";
import Button from "../Button/Button";
import Otp from "../OTP/Otp";
import Confirmation from "../Confirmation/Confirmation";
import WhiteBoard from "../WhiteBoard/WhiteBoard";
import MetaMask from "../MetaMask/MetaMask";
import TransactionStatus from "../TransactionStatus/TransactionStatus";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";

const MainTemplate = (props) => {
  const { title, description, type, action } = props;
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="grandpa__sign_up">
      <Alert severity="success">Your OTP is {user && user.otp}</Alert>
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="grandpa__form_wrapper">
        {type === "otp" ? (
          <Otp />
        ) : type === "confirm" ? (
          <Confirmation />
        ) : type === "whiteBoard" ? (
          <WhiteBoard />
        ) : type === "metaMask" ? (
          <MetaMask />
        ) : type === "status" ? (
          <TransactionStatus status="success"/>
        ) : (
          <form>
            <input
              type="text"
              placeholder="Enter Email Address…"
              className="grandpa__input_field"
            />
            {(type === "signin" || type === "check") && (
              <div className="grandpa__checkbox">
                <Checkbox
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleChecked />}
                />
                I am Human
              </div>
            )}
            <Button>Sign In</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MainTemplate;
