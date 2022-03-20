import React from "react";
import { NavLink } from "react-router-dom";

//===MUI IMPORTS===

//===COMPONENT IMPORTS===
// import { AdminMenuItems, UserMenuItems, CordinatorsMenu } from "./MenuItems";
import {
  BlackListIcon,
  TokensIcon,
  TransactionsIcon,
  SiteSettingsIcon,
} from "../../../containers/Icons/Icons";
import classes from "./DashBoardMenu.module.css";

const DashBoardMenuItem = (props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        classes.gpa__dashboard_menu_item_wrapper +
        " " +
        (isActive ? `${classes.gpa__selected_menu_item}` : "")
      }
      to={`/dashboard/${props.menuItemLink}`}
      end
    >
      <div className={classes.gpa__dashboard_menu_item_icon_wrapper}>
        {props.menuItemIcon}
      </div>
      <div className={classes.gpa__dashboard_menu_item_title_wrapper}>
        {props.menuItemTitle}
      </div>
    </NavLink>
  );
};

const DashBoardMenu = (props) => {
  const { DashMenuTitle } = props;

  const UserMenuItems = [
    {
      icon: (
        <SiteSettingsIcon
          isActive={DashMenuTitle === "site-settings" ? true : false}
        />
      ),
      url: "site-settings",
      title: "Site Settings",
    },
    {
      url: "transactions",
      title: "Transactions",
      icon: (
        <TransactionsIcon
          isActive={DashMenuTitle === "transactions" ? true : false}
        />
      ),
    },
    {
      icon: (
        <BlackListIcon
          isActive={DashMenuTitle === "blacklist" ? true : false}
        />
      ),
      url: "blacklist",
      title: "Blacklist",
    },
    {
      url: "blacklist-settings",
      title: "Blacklist Settings",
      icon: (
        <BlackListIcon
          isActive={DashMenuTitle === "blacklist-settings" ? true : false}
        />
      ),
    },
    {
      icon: <TokensIcon isActive={DashMenuTitle === "tokens" ? true : false} />,
      url: "tokens",
      title: "Tokens",
    },
  ];

  return (
    <div className={classes.gpa__dashboard_menu_wrapper}>
      <div className={classes.gpa__dashboard_menu_title}>
        <h3>Navigation</h3>
      </div>
      {UserMenuItems.map((menu, index) => {
        return (
          <DashBoardMenuItem
            key={index}
            menuItemIcon={menu.icon}
            menuItemLink={menu.url}
            menuItemTitle={menu.title}
            menuCount={menu.count}
          />
        );
      })}
    </div>
  );
};

export default DashBoardMenu;
