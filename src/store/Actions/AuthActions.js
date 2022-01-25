import { baseUrl } from "..";
import {
  authenticationPending,
  authenticationSuccess,
  authenticationFail,
  updateProfilePending,
  updateProfileSuccess,
  updateProfileFail,
  logout,
  autoAuthenticationSuccess,
  verificationPending,
  verificationFail,
  verificationSuccess,
} from "../Slices/authSlice";
import {
  forgotPasswordFail,
  forgotPasswordPending,
  forgotPasswordSuccess,
  requestVerificationFail,
  requestVerificationPending,
  requestVerificationSuccess,
  UpdatePasswordFail,
  UpdatePasswordPending,
  UpdatePasswordSuccess,
} from "../Slices/passwordSlice";
import {
  UserRegistrationPending,
  UserRegistrationSuccess,
  UserRegistrationFail,
} from "../Slices/userRegistrationSlice";

export const Login = (email) => {
  return async (dispatch) => {
    dispatch(authenticationPending());
    const response = await fetch(`${baseUrl}/accounts/login`, {
      method: "POST",
      body: JSON.stringify({
        email
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error)
     
      // dispatch(authenticationFail(error));
    }
    const data = await response.json();
    console.log(data)
    dispatch(
      authenticationSuccess({
        data,
        user: data.user,
        token: data.token,
        uuid: data.uuid,
      })
    );

    SaveTokenInLocalStorage(dispatch, data);
  };
};

export const OTPVerify = (
 otp,
 uuid
) => {
  return async (dispatch) => {
    dispatch(verificationPending());
    const response = await fetch(`${baseUrl}/accounts/verify-otp/${uuid}`, {
      method: "POST",
      body: JSON.stringify({
        otp
      }),
      headers: new Headers({
        "Content-type": "application/json"
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(verificationFail(error));
    }
    const data = await response.json();
    dispatch(verificationSuccess(data.status));
  };
};



export const SaveTokenInLocalStorage = (dispatch, userDetails) => {
  logOutTimer(dispatch, userDetails.expiresIn);
  let AuthTokenDetails = {
    token: userDetails.token,
    expiresIn: userDetails.expiresIn,
    expirationtime: userDetails.expirationtime,
  };
  localStorage.setItem("AuthToken", JSON.stringify(AuthTokenDetails));
  localStorage.setItem("CurrentUser", JSON.stringify(userDetails.user));
};

export const logOutTimer = (dispatch, timer) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer);
};

export const AutoAuthenticate = (dispatch, history) => {
  const AuthToken = localStorage.getItem("AuthToken");
  const CurrentUser = localStorage.getItem("CurrentUser");
  let UserToken = "";
  if (!AuthToken) {
    dispatch(logout());
    return;
  }
  UserToken = JSON.parse(AuthToken);
  let expireDate = new Date(UserToken.expirationtime);
  let todaysDate = new Date();
  if (todaysDate > expireDate) {
    return dispatch(logout());
  }
  let data = {
    token: UserToken.token,
    user: JSON.parse(CurrentUser),
  };
  // validateToken(UserToken)
  dispatch(autoAuthenticationSuccess(data));

  const timer = expireDate.getTime() - todaysDate.getTime();
  logOutTimer(dispatch, timer);
};
