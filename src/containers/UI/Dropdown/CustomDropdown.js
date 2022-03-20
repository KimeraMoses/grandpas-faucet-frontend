import React, { useState } from "react";

//===MUI IMPORTS===
import ArrowDropUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowDropDownIcon from "@material-ui/icons/KeyboardArrowDown";

//===REDUX IMPORTS===

//===COMPONENT IMPORTS===
import classes from "./CustomDropdown.module.css";

const CustomDropdown = (props) => {
  const { selected, setSelected, ArrayData, isTokens,selectedName,setSelectedName } = props;
  const [isActive, setIsActive] = useState(false);
  const selectedItemHandler = (option) => {
    setSelected(isTokens ? option._id : option.address);
    setSelectedName(isTokens ? option.name : option.address);
    setIsActive(false);
  };
  return (
    <div
      className={classes.gpa__dropdown}
      onClick={(e) => setIsActive(!isActive)}
    >
      <div className={classes.gpa__dropdown_button}>
        <div className={classes.gpa__dropdown_button_text}>{selectedName}</div>
        <div>{isActive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </div>
      {isActive && (
        <div className={classes.gpa__dropdown_content}>
          {ArrayData &&
            ArrayData.map((option) => {
              return (
                <div
                  key={option.name}
                  className={classes.gpa__dropdown_item}
                  onClick={(e) => selectedItemHandler(option)}
                >
                  {isTokens ? option.name : option.address}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
