import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Confirmation from "./components/Confirmation/Confirmation";
import Home from "./components/Home/Home"
import MainTemplate from "./components/MainTemplate/MainTemplate";
import SignUp from "./components/SignUp/SignUp";
import Transactions from "./components/Transactions/Transactions";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
           <Route path="sign-in" element={<SignUp />} />
           <Route path="otp-confirm" element={<MainTemplate type="otp" title="OTP" description="Please enter the OTP received at your email addresses to continue." />} />
           <Route path="white-board" element={<MainTemplate type="whiteBoard" title="WhiteBoard Crypto" description="Please click the button below to setup your account on WhiteBoard Crypto." />} />
           <Route path="meta-mask" element={<MainTemplate type="metaMask" title="MetaMask Wallet" description="Please click the button below to connect your MetaMask Wallet account." />} />
           <Route path="status" element={<MainTemplate type="status" title="Transaction Status" description="Congratulations! Your transaction has been completed successfully." />} />
           <Route path="confirm" element={<Confirmation />} />
           <Route path="transactions" element={<Transactions />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;
