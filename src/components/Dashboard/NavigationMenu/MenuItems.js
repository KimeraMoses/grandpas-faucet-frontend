import React from 'react'
//===MUI IMPORTS===
import SchoolIcon from "@material-ui/icons/SchoolOutlined";
import DashboardIcon from "@material-ui/icons/Speed";
import PdfIcon from "@material-ui/icons/PictureAsPdf";
import NewUnivIcon from "@material-ui/icons/AccountBalance";
import MessageIcon from "@material-ui/icons/Message";
import TimeTableIcon from "@material-ui/icons/Apps";
import ForumIcon from "@material-ui/icons/ForumOutlined";
import CalenderIcon from "@material-ui/icons/DateRangeOutlined";
import ViewListIcon from "@material-ui/icons/ViewList";
import ProgressIcon from "@material-ui/icons/AutorenewOutlined";
import NotificationsIcon from "@material-ui/icons/NotificationsActive";
import { BlackListIcon, SettingIcon, TokensIcon, TransactionsIcon,SiteSettingsIcon } from '../../../containers/Icons/Icons';
import { Outlet, useLocation, NavLink, Link } from "react-router-dom";


export const UserMenuItems = [
    {
        icon: <SiteSettingsIcon />,
        url: 'site-settings',
        title: 'Site Settings'
    },
    {
        icon: <TransactionsIcon />,
        url: 'transactions',
        title: 'Transactions',
       
    }, 
    {
        icon: <BlackListIcon />,
        url: 'blacklist',
        title: 'Blacklist',
    },
    {
        icon: <BlackListIcon />,
        url: 'blacklist-settings',
        title: 'Blacklist Settings',
    },
    {
        icon: <TokensIcon />,
        url: 'tokens',
        title: 'Tokens'
    }

  ]
