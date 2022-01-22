import { Checkbox, FormControlLabel } from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import React from "react";
import "./SignUp.css";
import Button from "../Button/Button";

const SignUp = () => {
  return (
    <div className="grandpa__sign_up">
      <h4>Sign In</h4>
      <p>Please sign in using your registetered email address to continue.</p>
      <div className="grandpa__form_wrapper">
        <form>
          <input
            type="text"
            placeholder="Enter Email Address…"
            className="grandpa__input_field"
          />
          <div className="grandpa__checkbox">
            <Checkbox
              icon={<CircleUnchecked />}
              checkedIcon={<CircleChecked />}
            />
            I am Human
            
          </div>
          <Button>Sign In</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
