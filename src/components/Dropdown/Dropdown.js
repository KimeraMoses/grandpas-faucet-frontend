import React, { useState } from "react";

//===MUI IMPORTS===
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Paper } from "@material-ui/core";

//===REDUX IMPORTS===

//===COMPONENT IMPORTS===
import classes from "./Dropdown.module.css";
import { useSelector } from "react-redux";

const Dropdown = (props) => {
  const { selected, setSelected, values, setValues } = props;
  const [isActive, setIsActive] = useState(false);
  const Faucets = useSelector((state) => state.transactions.faucets);
  const selectedItemHandler = (Value) => {
    setSelected(Value.name);
    setIsActive(false);
    setValues({ ...values, faucet:Value.uuid  });
  };

  return (
    <div className={classes.gpa__dropdown}>
      <div
        className={classes.gpa__dropdown_button}
        onClick={(e) => setIsActive(!isActive)}
      >
        <div className={classes.gpa__dropdown_button_text}>
          {selected}
        </div>
        <div>{isActive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </div>
      {isActive && (
        <Paper
          className={classes.gpa__dropdown_content}
        >
          {Faucets && Faucets.map((faucet, index) => {
            return (
              <div
                key={index}
                className={classes.gpa__dropdown_item}
                onClick={(e) => selectedItemHandler(faucet)}
              >
                {faucet.name}
              </div>
            );
          })}
        </Paper>
      )}
    </div>
  );
};

export default Dropdown;
