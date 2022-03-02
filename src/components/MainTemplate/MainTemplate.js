
import React, { useState } from "react";
import "../SignIn/SignIn.css";
import Button from "../Button/Button";
import Otp from "../OTP/Otp";
import Confirmation from "../Confirmation/Confirmation";
import WhiteBoard from "../WhiteBoard/WhiteBoard";
import MetaMask from "../MetaMask/MetaMask";
import TransactionStatus from "../TransactionStatus/TransactionStatus";
import { Alert } from "@material-ui/lab";

const MainTemplate = (props) => {
  const { title, description, pageType } = props;
  const [message, setMessage] = useState("No account with your email found!");
  // const user = useSelector((state) => state.auth.user);

  return (
    <div className="grandpa__sign_up">
      {pageType === "otp" ? (
        // <Alert severity="success">Your OTP is {user && user.otp}</Alert>
        <Alert severity="success">Please check your email for the OTP</Alert>
      ) : (
        pageType === "whiteBoard" && (
          <Alert severity="error" icon={false}>
            {message}
          </Alert>
        )
      )}
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="grandpa__form_wrapper">
        {pageType === "otp" ? (
          <Otp />
        ) : pageType === "confirm" ? (
          <Confirmation />
        ) : pageType === "whiteBoard" ? (
          <WhiteBoard setMessage={setMessage} />
        ) : pageType === "metaMask" ? (
          <MetaMask />
        ) : pageType === "transactionSuccess" ? (
          <TransactionStatus status="success" />
        ) : pageType === "transactionFail" ? (
          <TransactionStatus status="fail" />
        ) : pageType === "transactionBlackListed" ? (
          <TransactionStatus status="blacklisted" />
        ) : (
          <form>
            <input
              type="text"
              placeholder="Enter Email Address…"
              className="grandpa__input_field"
            />
            <Button>Sign In</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MainTemplate;
