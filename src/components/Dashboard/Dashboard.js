import React, { useState } from "react";
import { IconButton, Zoom } from "@material-ui/core";
import {Outlet, useLocation } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import classes from "./Dashboard.module.css";
import DashBoardMenu from "./NavigationMenu/DashBoardMenu";
import AppBar from "../AppBar/AppBar";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const DashMenuTitle = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  let menuTitle = "";
  switch (location.pathname) {
    case `/dashboard/${DashMenuTitle}`:
      menuTitle = DashMenuTitle.replace(/-/g, " ");
      break;
    default:
      menuTitle = "DashBoard";
      break;
  }
  return (
    <div className={classes.dashboard_page_wrapper}>
      <AppBar />
      <div className={classes.grandpa__dashboard_wrapper}>
        <div className={classes.menu__wrapper}>
          <DashBoardMenu DashMenuTitle={DashMenuTitle} />
        </div>
        <div className={classes.mobile_menu_wrapper}>
          <div className={classes.mobile_menu_toggle_wrapper}>
            <div className={classes.selected_menu_item_title}>
              <h3>Navigation Menu</h3>
            </div>
            <div className={classes.toggle_icon_wrapper}>
              <IconButton aria-label="Menu" onClick={() => setOpen(!open)}>
                {open ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </div>
          </div>
        </div>
        <Zoom direction="right" in={open} mountOnEnter unmountOnExit>
          <div className={`${classes.mobile_menu} ${classes.mobile_menu_open}`}>
            <DashBoardMenu DashMenuTitle={DashMenuTitle} />
          </div>
        </Zoom>

        <div className={classes.selected_menu_item_wrapper}>
          <div className={classes.selected_menu_item_title}>
            <h3>{menuTitle}</h3>
          </div>
          <div className={classes.gpa__dashbaord_selected_item_display_wrapper}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
