import { Checkbox, FormControlLabel } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import React from "react";
import "../SignUp/SignUp.css";
import Button from "../Button/Button";

const Otp = () => {
  return (
    <form>
      <input type="text" placeholder="OTP" className="grandpa__input_field" />
      <Button>Continue</Button>
    </form>
  );
};

export default Otp;
