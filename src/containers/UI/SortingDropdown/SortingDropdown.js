import React, { useState } from "react";

//===MUI IMPORTS===
import ArrowDropUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowDropDownIcon from "@material-ui/icons/KeyboardArrowDown";

//===REDUX IMPORTS===

//===COMPONENT IMPORTS===
import classes from "../Dropdown/CustomDropdown.module.css";

const SortingDropdown = (props) => {
  const { selected, setSelected, ArrayData } = props;
  const [selectedName, setSelectedName] = useState(selected)
  const [isActive, setIsActive] = useState(false);
  const selectedItemHandler = (option) => {
    setSelected(option.value);
    setSelectedName(option.name)
    setIsActive(false);
  };

  return (
    <div
      className={classes.gpa__dropdown}
      onClick={(e) => setIsActive(!isActive)}
    >
      <div className={classes.gpa__dropdown_button}>
        <div className={classes.gpa__dropdown_button_text}>
          {"Sort by : "}
          {selectedName}
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
                  onClick={(e) => selectedItemHandler(option)}
                >
                  {option.name}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SortingDropdown;
