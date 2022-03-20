import React from "react";
import { Link } from "react-router-dom";

//===COMPONENT IMPORTS===
import classes from "./UserMenuItem.module.css";

const UserMenuItem = (props) => {
  return (
    <Link
      to={`${props.itemLink}`}
      className={classes.gpa__link_item}
    >
      {props.itemIcon} {props.itemTitle}
    </Link>
  );
};
export default UserMenuItem;
