import { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Confirmation from "./components/Confirmation/Confirmation";
import Home from "./components/Home/Home";
import MainTemplate from "./components/MainTemplate/MainTemplate";
import SignIn from "./components/SignIn/SignIn";
import Transactions from "./components/Transactions/Transactions";
import "./App.css";
import Login from "./components/Home/Login";
import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AutoAuthenticate } from "./store/Actions/AuthActions";
function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isVerified = useSelector((state) => state.auth.isAuth);
  const hasAddress = useSelector((state) => state.auth.hasAddress);
  const hasWallet = useSelector(state=>state.auth.hasWallet);

  const isAuthenticated = isLoggedIn && isVerified && hasAddress && hasWallet;
  console.log("isLoggedIn", isLoggedIn)
  console.log("isVerified", isVerified)
  console.log("hasAddress", hasAddress)
  console.log("hasWallet", hasWallet)
  console.log(isAuthenticated)
  
  useEffect(() => {
    AutoAuthenticate(dispatch);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={isAuthenticated?<Navigate to="/transactions"/>:(isLoggedIn && !isVerified)? <Navigate to="/confirm-otp"/>:(isLoggedIn && isVerified && !hasAddress)?<Navigate to="/connect-metamask"/>: <Login />} />
        <Route path="/*" element={<Home />}>
          <Route
            path="confirm-otp"
            element={!isLoggedIn?<Navigate to="/sign-in"/>: (isLoggedIn && isVerified)? <Navigate to="/connect-metamask"/>:
              <MainTemplate
                type="otp"
                title="OTP"
                description="Please enter the OTP received at your email addresses to continue."
              />
            }
          />
          <Route
            path="sign-up"
            element={(!isLoggedIn && !isVerified) &&
              <MainTemplate
                type="whiteBoard"
                title="WhiteBoard Crypto"
                description="Please click the button below to setup your account on WhiteBoard Crypto."
              />
            }
          />
          <Route
            path="connect-metamask"
            element={isAuthenticated? <Navigate to="/transactions"/>:!isLoggedIn?<Navigate to="/sign-in"/>:!isVerified?<Navigate to="/confirm-otp"/>:
              <MainTemplate
                type="metaMask"
                title="MetaMask Wallet"
                description="Please click the button below to connect your MetaMask Wallet account."
              />
            }
          />
          <Route
            path="status"
            element={
              <MainTemplate
                type="status"
                title="Transaction Status"
                description="Congratulations! Your transaction has been completed successfully."
              />
            }
          />
          <Route path="confirm" element={<Confirmation />} />
          <Route path="transactions" element={!isLoggedIn? <Navigate to="/sign-in"/>:!isVerified? <Navigate to="/confirm-otp"/>:!hasAddress?<Navigate to="/connect-metamask"/>: <Transactions />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
