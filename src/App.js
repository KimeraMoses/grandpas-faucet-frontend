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
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const Address = useSelector((state) => state.auth.address);
  const Address_Local = localStorage.getItem("Address");
  let isConnected = false;
  
    if(Address || Address_Local){
      isConnected = true
      console.log("Found", Address, isConnected)
    }else{
      isConnected = false
      console.log("Not found", isConnected)
    }


  useEffect(() => {
    AutoAuthenticate(dispatch);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={(isAuthenticated && isConnected) ?  <Navigate to="/transactions" />:<Login />} />
        <Route path="/*" element={<Home />}>
          <Route
            path="confirm-otp"
            element={isAuthenticated?<Navigate to="/connect-metamask" />: (isAuthenticated && isConnected)?<Navigate to="/transactions" />:
              <MainTemplate
                type="otp"
                title="OTP"
                description="Please enter the OTP received at your email addresses to continue."
              />
            }
          />
          <Route
            path="sign-up"
            element={(isAuthenticated && isConnected)?<Navigate to="/transactions" />: 
              <MainTemplate
                type="whiteBoard"
                title="WhiteBoard Crypto"
                description="Please click the button below to setup your account on WhiteBoard Crypto."
              />
            }
          />
          <Route
            path="connect-metamask"
            element={!isAuthenticated?<Navigate to="/sign-in" />: (isAuthenticated && isConnected)?<Navigate to="/transactions" />:
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
          <Route path="transactions" element={(isConnected && isAuthenticated)?<Transactions />: <Navigate to="/sign-in"/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
