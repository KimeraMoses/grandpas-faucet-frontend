import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";

//====REDUX IMPORTS====//
import {useSelector, useDispatch } from "react-redux";
import { Login } from "../../store/Actions/AuthActions";

//====MUI IMPORTS====//
import { Alert } from "@material-ui/lab";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

//====COMPONENT IMPORTS===//
import Button from "../Button/Button";
import "./SignIn.css";

const SignIn = () => {
  const message = useSelector((state) => state.auth.message);
  const isLoading = useSelector(state=>state.auth.isLoading)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError("")
    setValues({ ...values, [name]: event.target.value });

  };

  const LoginHandler = async (e) => {
    e.preventDefault();

    if (values.email.length < 1) {
      return setError("Please enter to Sign in");
    }
    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(values.email)) {
      setError("Please enter valid email address.");
    }

    try {
      setError("");
      await dispatch(Login(values.email));
      setValues({ email: "" });
      navigate('/confirm-otp')
    } catch (error) {
      navigate("/sign-up")
    }
  };


  return (
    <div className="grandpa__sign_up">
      {(error || message) && <Alert severity="error">{error || message}</Alert>}
      <h4>Sign In</h4>
      <p>Please sign in using your registetered email address to continue.</p>
      <div className="grandpa__form_wrapper">
        <form onSubmit={LoginHandler}>
          <input
            type="text"
            placeholder="Enter Email Address…"
            className="grandpa__input_field"
            value={values.email}
            name="email"
            onChange={handleChange}
          />
          <div className="grandpa__checkbox">
            <Checkbox
              icon={<CircleUnchecked />}
              checkedIcon={<CircleChecked />}
            />
            I am Human
            
          </div>
          <Button type="submit" disabled={isLoading}>{isLoading? "Logging in...": "Sign In"}</Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
