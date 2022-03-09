import { useEffect } from "react";
// import { loadReCaptcha } from 'react-google-recaptcha';
import { Routes, Route, Navigate } from "react-router-dom";
import Confirmation from "./components/Confirmation/Confirmation";
import Home from "./components/Home/Home";
import MainTemplate from "./components/MainTemplate/MainTemplate";
import Transactions from "./components/Transactions/Transactions";
import Login from "./components/Home/Login";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AutoAuthenticate } from "./store/Actions/AuthActions";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import "./containers/Theme/ThemeColors.css";
import SiteSettings from "./components/Dashboard/MenuPanels/SiteSettings/SiteSettings";
import UserTransactions from "./components/Dashboard/MenuPanels/Transactions/UserTransactions";
import BlackList from "./components/Dashboard/MenuPanels/BlackList/BlackList";
import Tokens from "./components/Dashboard/MenuPanels/Tokens/Tokens";
import EnhancedTable from "./components/Dashboard/SortableTable";

function App() {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.user.email);
  const adminEmail = useSelector(
    (state) => state.settings.settings.admin_email
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isVerified = useSelector((state) => state.auth.isAuth);
  const hasAddress = useSelector((state) => state.auth.hasAddress);
  const hasWallet = useSelector((state) => state.auth.hasWallet);
  const isAdmin = userEmail === adminEmail ? true : false;
  const isAuthenticated = isLoggedIn && isVerified && hasAddress && hasWallet;

  console.log(isAdmin);
  useEffect(() => {
    AutoAuthenticate(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/test" element={<EnhancedTable />} />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/transactions" />
            ) : isLoggedIn && !isVerified ? (
              <Navigate to="/confirm-otp" />
            ) : isLoggedIn && isVerified && !hasAddress ? (
              <Navigate to="/connect-metamask" />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/*" element={<Home />}>
          <Route
            path="confirm-otp"
            element={
              !isLoggedIn ? (
                <Navigate to="/sign-in" />
              ) : isLoggedIn && isVerified && isAdmin ? (
                <Navigate to="/dashboard/site-settings" />
              ) : isLoggedIn && isVerified && !isAdmin ? (
                <Navigate to="/connect-metamask" />
              ) : (
                <MainTemplate
                  pageType="otp"
                  title="OTP"
                  description="Please enter the OTP received at your email addresses to continue."
                />
              )
            }
          />
          <Route
            path="sign-up"
            element={
              !isLoggedIn &&
              !isVerified && (
                <MainTemplate
                  pageType="whiteBoard"
                  title="WhiteBoard Crypto"
                  description="Please click the button below to setup your account on WhiteBoard Crypto."
                />
              )
            }
          />
          <Route
            path="connect-metamask"
            element={
              isAuthenticated ? (
                <Navigate to="/transactions" />
              ) : !isLoggedIn ? (
                <Navigate to="/sign-in" />
              ) : !isVerified ? (
                <Navigate to="/confirm-otp" />
              ) : (
                <MainTemplate
                  pageType="metaMask"
                  title="MetaMask Wallet"
                  description="Please click the button below to connect your MetaMask Wallet account."
                />
              )
            }
          />
          <Route
            path="transaction-success"
            element={
              <MainTemplate
                pageType="transactionSuccess"
                title="Transaction Status"
                description="Congratulations! Your transaction has been completed successfully."
              />
            }
          />
          <Route
            path="transaction-fail"
            element={
              <MainTemplate
                pageType="transactionFail"
                title="Transaction Status"
                description="Oh no! Something went wrong and your transaction could not be completed."
              />
            }
          />
          <Route
            path="transaction-blacklisted"
            element={
              <MainTemplate
                pageType="transactionBlackListed"
                title="Transaction Status"
                description="Unfortunately, your account has been blacklisted for the next 24 hours. Please try again later."
              />
            }
          />
          <Route path="confirm" element={<Confirmation />} />
          <Route
            path="transactions"
            element={
              !isLoggedIn ? (
                <Navigate to="/sign-in" />
              ) : !isVerified ? (
                <Navigate to="/confirm-otp" />
              ) : !hasAddress ? (
                <Navigate to="/connect-metamask" />
              ) : (
                <Transactions />
              )
            }
          />
        </Route>
        <Route
          path="/dashboard/*"
          element={isAdmin ? <Dashboard /> : <Navigate to="/sign-in" />}
        >
          <Route path="site-settings" element={<SiteSettings />} />
          <Route path="transactions" element={<UserTransactions />} />
          <Route path="blacklist" element={<BlackList />} />
          <Route path="tokens" element={<Tokens />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
