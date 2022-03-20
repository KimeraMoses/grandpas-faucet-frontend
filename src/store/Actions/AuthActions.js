import {
  authenticationPending,
  authenticationSuccess,
  logout,
  autoAuthenticationSuccess,
  verificationPending,
  verificationFail,
  verificationSuccess,
  authenticationFail,
  createWalletPending,
  createWalletSuccess,
  createWalletFail,
  isAuthenticated,
  isConnected,
} from "../Slices/authSlice";
import { fetchSettingsSuccess } from "../Slices/settingsSlice";
import { fetchSiteSettings } from "./UserActions";
import {
  requestOtpFail,
  requestOtpPending,
  requestOtpSuccess,
} from "../Slices/otpSlice";

export const Login = (email) => {
  return async (dispatch) => {
    dispatch(authenticationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/accounts/login`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: new Headers({
          "Content-type": "application/json",
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      let errorMessage = "";
      if (error.err === "User is not registered to whiteboard crypto.") {
        errorMessage = "Account not found, redirecting to whiteboard Crypto...";
      }
      dispatch(authenticationFail(errorMessage));
    }
    const res = await response.json();
    dispatch(
      authenticationSuccess({
        user: res.data,
        apiToken: res.apiToken,
        token: res.token,
      })
    );
    dispatch(fetchSiteSettings(res.token, res.apiToken));
    SaveTokenInLocalStorage(dispatch, res);
  };
};

export const OTPVerify = (otp, uuid) => {
  return async (dispatch) => {
    dispatch(verificationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/accounts/verify-otp/${uuid}`,
      {
        method: "POST",
        body: JSON.stringify({
          otp,
        }),
        headers: new Headers({
          "Content-type": "application/json",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      let Errormessage = "";
      if (error.msg === "OTP incorrect.") {
        Errormessage = "OTP entered is incorrect";
      }
      dispatch(verificationFail(Errormessage));
    }
    const data = await response.json();
    let Errormessage = "";
    if (data.msg === "OTP incorrect.") {
      Errormessage = "OTP entered is incorrect";
    }
    dispatch(verificationSuccess(Errormessage));
    dispatch(isAuthenticated());
    localStorage.setItem("Grand__isVerified", true);
  };
};

export const RequestOtp = (uuid) => async (dispatch) => {
  dispatch(requestOtpPending());
  if (uuid) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/accounts/resend-otp/${uuid}`,
        {
          method: "POST",
          headers: new Headers({
            "Content-type": "application/json",
          }),
        }
      );
      const data = await response.json();
      dispatch(requestOtpSuccess(data.msg));
    } catch (error) {
      dispatch(requestOtpFail(error.msg));
    }
  } else {
    return;
  }
};

export const CreateWallet = (address, account_uuid, apiToken, AuthToken) => {
  return async (dispatch) => {
    dispatch(createWalletPending());
    if (address && address.length > 0) {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/wallet-address/`,
        {
          method: "POST",
          body: JSON.stringify({
            address,
            account_uuid,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
            apiToken: apiToken,
            Authorization: "Bearer " + AuthToken,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        dispatch(createWalletFail(error));
      }
      const res = await response.json();
      dispatch(createWalletSuccess(res.data));
      localStorage.setItem("Grand__Wallet", JSON.stringify(res.data));
    } else {
      return;
    }
  };
};

export const SaveTokenInLocalStorage = (dispatch, userDetails) => {
  logOutTimer(dispatch, userDetails.expiresIn);
  
  let AuthTokenDetails = {
    token: userDetails.token,
    apiToken: userDetails.apiToken,
    expiresIn: userDetails.expiresIn,
    expirationTime: userDetails.expirationTime,
  };
  localStorage.setItem("Grand__AuthToken", JSON.stringify(AuthTokenDetails));
  localStorage.setItem("Grand__CurrentUser", JSON.stringify(userDetails.data));
};

export const logOutTimer = (dispatch, timer) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer);
};

export const AutoAuthenticate = (dispatch) => {
  const AuthToken = localStorage.getItem("Grand__AuthToken");
  const CurrentUser = localStorage.getItem("Grand__CurrentUser");
  const siteSettings = localStorage.getItem("Grand__Settings");
  const isAuth = localStorage.getItem("Grand__isVerified");
  const Address = localStorage.getItem("Grand__Address");
  const Wallet = localStorage.getItem("Grand__Wallet");
  let UserToken = "";
  if (!AuthToken) {
    dispatch(logout());
    return;
  }
  if (!!isAuth) {
    dispatch(isAuthenticated());
  }
  if (Address && Address.length > 0) {
    dispatch(isConnected(Address));
  }
  if (Wallet) {
    dispatch(createWalletSuccess(JSON.parse(Wallet)));
  }
  if (siteSettings) {
    dispatch(fetchSettingsSuccess(JSON.parse(siteSettings)));
  }
  UserToken = JSON.parse(AuthToken);
  let expireDate = new Date(UserToken.expirationTime);
  let todaysDate = new Date();
  if (todaysDate > expireDate) {
    return dispatch(logout());
  }

  let data = {
    token: UserToken.token,
    apiToken: UserToken.apiToken,
    user: JSON.parse(CurrentUser),
  };
  dispatch(autoAuthenticationSuccess(data));

  const timer = expireDate.getTime() - todaysDate.getTime();
  logOutTimer(dispatch, timer);
};
