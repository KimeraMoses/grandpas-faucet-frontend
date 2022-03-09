import React, { useState } from "react";

//====REDUX IMPORTS====//
import { useDispatch, useSelector } from "react-redux";
import { OTPVerify,RequestOtp } from "../../store/Actions/AuthActions";

//====MUI IMPORTS====//
import { Alert } from "@material-ui/lab";

//====COMPONENT IMPORTS====//
import classes from "./Otp.module.css";
import Button from "../Button/Button";
import "../SignIn/SignIn.css";

const Otp = () => {
  const message = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const [error, setError] = useState(message);
  const [resending, setIsLoading]=useState(false)
  const [values, setValues] = useState({
    otp: "",
  });
  const uuid = user && user.uuid;
  const RequestOtpHandler= async()=>{
    setIsLoading(true)
    try{
      await dispatch(RequestOtp(uuid))
      setIsLoading(false)
    }catch(error){
      setError("Failed to resend Otp, try again")
      setIsLoading(false)
    }
    
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setError("");
    setValues({ ...values, [name]: value });
  };

  const OtpVerificationHandler = async (e) => {
    e.preventDefault();

    if (values.otp.length < 1) {
      return setError("Please enter the otp sent to your email");
    }
    if (values.otp.length < 5) {
      return setError("Please enter a valid OTP");
    }

    try {
      setError("");
      await dispatch(OTPVerify(+values.otp, uuid));
      setValues({ otp: "" });
    } catch (error) {
      setError("Failed to verify Otp, Please try again later");
    }
  };

  return (
    <>
      {!message && error && (
        <div style={{ textAlign: "left", marginBottom: 5 }}>
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {!isLoading && message && (
        <Alert style={{ textAlign: "left", marginBottom: 5 }} severity="error">
          {message}
        </Alert>
      )}
      <form onSubmit={OtpVerificationHandler}>
        <input
          type="number"
          placeholder="OTP"
          value={values.otp}
          name="otp"
          onChange={handleChange}
          className="grandpa__input_field"
        />
        <div className={classes.otp__action_wrapper}>
          <Button disabled={resending} variant="secondary" onClick={RequestOtpHandler}>
            {resending ? "Requesting otp..." : "Resend Otp"}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying otp..." : "Continue"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Otp;
