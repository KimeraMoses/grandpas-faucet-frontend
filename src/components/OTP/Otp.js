import React, { useState } from "react";

//====REDUX IMPORTS====//
import { useDispatch, useSelector } from "react-redux";
import { OTPVerify } from "../../store/Actions/AuthActions";

//====MUI IMPORTS====//
import { Alert } from "@material-ui/lab";

//====COMPONENT IMPORTS====//
import Button from "../Button/Button";
import "../SignIn/SignIn.css";

const Otp = () => {
  const message = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const [error, setError] = useState(message);
  const [values, setValues] = useState({
    otp: "",
  });
  const uuid = user && user.uuid;
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Verifying otp..." : "Continue"}
        </Button>
      </form>
    </>
  );
};

export default Otp;
