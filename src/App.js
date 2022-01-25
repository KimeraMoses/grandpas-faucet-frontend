import { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Confirmation from "./components/Confirmation/Confirmation";
import Home from "./components/Home/Home";
import MainTemplate from "./components/MainTemplate/MainTemplate";
import SignIn from "./components/SignIn/SignIn";
import Transactions from "./components/Transactions/Transactions";
import "./App.css";
import Login from "./components/Home/Login";

function App() {
  const isLoggedIn = true;

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Login/>}/>
        <Route path="/*" element={<Home />}>
          <Route
            path="confirm-otp"
            element={
              <MainTemplate
                type="otp"
                title="OTP"
                description="Please enter the OTP received at your email addresses to continue."
              />
            }
          />
          <Route
            path="sign-up"
            element={
              <MainTemplate
                type="whiteBoard"
                title="WhiteBoard Crypto"
                description="Please click the button below to setup your account on WhiteBoard Crypto."
              />
            }
          />
          <Route
            path="connect-metamask"
            element={
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
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
