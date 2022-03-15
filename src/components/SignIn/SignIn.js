import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

//====REDUX IMPORTS====//
import { useSelector, useDispatch } from "react-redux";
import { Login } from "../../store/Actions/AuthActions";

//====MUI IMPORTS====//
import { Alert } from "@material-ui/lab";

//====COMPONENT IMPORTS===//
import Button from "../Button/Button";
import "./SignIn.css";

const SignIn = () => {
  const message = useSelector((state) => state.auth.message);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isHuman, setIsHuman] = useState(false);
  const [values, setValues] = useState({
    email: "",
  });
  const [ip, setIP] = useState("");

  //creating function to load ip address from the API
  const getData = async () => {
    try {
      const res = await fetch(`https://api.ipify.org?format=json`, {
        method: "GET",
      });
      const data = await res.json();
      setIP(data.ip);
      console.log("ip", data);
    } catch (error) {
      console.log("Recap Error", error);
      setIP("");
    }
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError("");
    setValues({ ...values, [name]: value });
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
      navigate("/confirm-otp");
    } catch (error) {
      if (!navigator.onLine) {
        return setError("Please connect to the internet to sign in");
      }
      navigate("/sign-up");
    }
  };

  const VerifyRecaptha = (response, remoteip) => {
    return async (dispatch) => {
      console.log(response, remoteip)
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASEURL}/accounts/verify-reCaptcha`,
          {
            method: "POST",
            body: JSON.stringify({
              response,
              remoteip,
            }),
            headers: new Headers({
              "Content-type": "application/json",
            }),
          }
        );
        const data = await res.json();
        setIsHuman(data.success);
      } catch (error) {
        setError(
          "Recaptcha verification failed, Please reload page and try again"
        );
      }
    };
  };

  const RecaptchaHandler = async (value) => {
    if (value !== null) {
      await dispatch(VerifyRecaptha(value, ip));
    }
    // if value is null recaptcha expired
    if (value === null) setIsHuman(false);
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
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_SITE_KEY}
              onChange={RecaptchaHandler}
            />
          </div>
          <Button type="submit" disabled={isLoading || !isHuman}>
            {isLoading ? "Logging in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
