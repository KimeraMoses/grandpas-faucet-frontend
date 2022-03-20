import React from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../../../store/Slices/authSlice";
//===MUI IMPORTS===
import LogoutIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Speed";
import TransactionsIcon from "@material-ui/icons/ReceiptOutlined";

//===COMPONENT IMPORTS===\
import classes from "./UserMenu.module.css";
import UserMenuItem from "./UserMenuItem";
import { useDispatch, useSelector } from "react-redux";

const UserMenu = () => {
  const user = useSelector((state) => state.auth.user);
  const settings = useSelector((state) => state.settings.settings);
  const userEmail = user && user.email;
  const adminEmail = settings && settings.admin_email;
  const isAdmin = userEmail === adminEmail ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogoutHandler = () => {
    dispatch(logout());
    navigate("/sign-in");
  };
  return (
    <>
      <div className={`${classes.gpa__userAccount_setting_wrapper}`}>
        {isAdmin && (
          <>
            {window.location.href.includes("dashboard") ? (
              <UserMenuItem
                itemLink="/transactions"
                itemIcon={<TransactionsIcon />}
                itemTitle="Transactions"
              />
            ) : (
              <UserMenuItem
                itemLink="/dashboard/site-settings"
                itemIcon={<DashboardIcon />}
                itemTitle="Dashboard"
              />
            )}
          </>
        )}
        <div className={classes.grandpa__logout_btn} onClick={LogoutHandler}>
          <LogoutIcon /> Logout
        </div>
      </div>
    </>
  );
};
export default UserMenu;
