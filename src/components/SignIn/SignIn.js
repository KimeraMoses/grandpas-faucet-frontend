import {useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import "./SignIn.css";
import Button from "../Button/Button";
import { Login } from "../../store/Actions/AuthActions";

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
      return setError("A valid email is required to Sign in");
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
      setError(
        "Failed to sign in, Please try again later"
      );
    }
  };


  return (
    <div className="grandpa__sign_up">
      {error && <Alert severity="error">{error}</Alert>}
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
          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
