import { Checkbox, FormControlLabel } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import React, { useState } from "react";
import "../SignIn/SignIn.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OTPVerify } from "../../store/Actions/AuthActions"

const Otp = () => {
  const message = useSelector((state) => state.auth.message);
  const isLoading = useSelector(state=>state.auth.isLoading)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    otp: "",
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setError("")
    setValues({ ...values, [name]: event.target.value });

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
      await dispatch(OTPVerify(values.otp));
      setValues({ email: "" });
      navigate('/connect-metamask')
    } catch (error) {
      setError(
        "Failed to verify Otp, Please try again later"
      );
    }
  };

  return (
    <form onSubmit={OtpVerificationHandler}>
      <input type="number" placeholder="OTP" value={values.otp} onChange={handleChange} className="grandpa__input_field" />
      <Button type="submit">Continue</Button>
    </form>
  );
};

export default Otp;
