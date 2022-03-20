import React, { useState } from "react";
import Grandpa_Logo from "../../assets/images/Grandpa-Logo.png";
import { Link } from "react-router-dom";
import { SettingIcon } from "../../containers/Icons/Icons";
import PersonIcon from '@material-ui/icons/Person';
import classes from "./AppBar.module.css";
import { Fade, Paper, Popper } from "@material-ui/core";
import UserMenu from "./UserMenu/UserMenu";
import { useSelector } from "react-redux";

const AppBar = () => {
  const user = useSelector((state) => state.auth.user);
  const settings = useSelector((state) => state.settings.settings);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isVerified = useSelector((state) => state.auth.isAuth);
  const userEmail = user && user.email;
  const adminEmail = settings && settings.admin_email;
  const isAdmin = userEmail === adminEmail ? true : false;

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
    setPlacement(newPlacement);
  };
  const userProfilePopperCloseHandler = () => {
    setOpen(false);
  };
  return (
    <div className={classes.grandpa__header}>
      <Link to="/">
        <img src={Grandpa_Logo} alt="GrandPa" />
      </Link>
      {isLoggedIn && isVerified && (
        <div className={classes.grandpa__icon_wrapper}>
          <div
            className={classes.dashboard__setting_icon_wrapper}
            onClick={handleClick("bottom-start")}
          >
            {isAdmin ? <SettingIcon /> : <PersonIcon />}
          </div>

          <Paper className={classes.grandpa__user_account_settings}>
            {open && (
              <Popper
                open={open}
                onMouseLeave={userProfilePopperCloseHandler}
                onClick={userProfilePopperCloseHandler}
                anchorEl={anchorEl}
                placement={placement}
                transition
                className={`${classes.gpa__userAccount_popper_up_wrapper} ${!isAdmin? classes.gpa__user_menu_wrapper: ''}`}
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper
                      elevation={3}
                      className={classes.grandpa__dropmenu_wrapper}
                    >
                      <UserMenu />
                    </Paper>
                  </Fade>
                )}
              </Popper>
            )}
          </Paper>
        </div>
      )}
    </div>
  );
};

export default AppBar;
