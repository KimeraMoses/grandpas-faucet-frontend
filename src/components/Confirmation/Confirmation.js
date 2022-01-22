import { Checkbox, FormControlLabel } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import React from "react";
import "./Confirmation.css";
import Button from "../Button/Button";

const Confirmation = () => {
  return (
    // <div >
    <form className="grandpa__checkbox_wrapper">
      <div className="grandpa__checkbox">
        <Checkbox icon={<CircleUnchecked />} checkedIcon={<CircleChecked />} />
        I am Human
      </div>
      <Button type="secondary">Connect</Button>
    </form>
    // </div>
  );
};

export default Confirmation;
