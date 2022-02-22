import React, { useState } from "react";

//===MUI IMPORTS===
import ArrowDropUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowDropDownIcon from "@material-ui/icons/KeyboardArrowDown";

//===REDUX IMPORTS===

//===COMPONENT IMPORTS===
import classes from "./CustomDropdown.module.css";
const SortMethodsArray = [
  { name: "Alphabetical", value: "alphabetical" },
  {
    name: "Asending",
    value: "asending",
  },
  {
    name: "Decending",
    value: "decending",
  },
];

const CustomDropdown = (props) => {
  const { selected, setSelected, isSelect, ArrayData } = props;
  const [isActive, setIsActive] = useState(false);
  const selectedItemHandler = (name) => {
    setSelected(name);
    setIsActive(false);
  };

  return (
    <div
      className={classes.gpa__dropdown}
      onClick={(e) => setIsActive(!isActive)}
    >
      <div className={classes.gpa__dropdown_button}>
        <div className={classes.gpa__dropdown_button_text}>
          {selected}
        </div>
        <div>{isActive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </div>
      {isActive && (
        <div className={classes.gpa__dropdown_content}>
          {ArrayData &&
            ArrayData.map((option, index) => {
              return (
                <div
                  key={index}
                  className={classes.gpa__dropdown_item}
                  onClick={(e) => selectedItemHandler(option.address)}
                >
                  {option.address}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
