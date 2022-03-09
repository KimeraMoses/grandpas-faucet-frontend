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
    const userInfo = {
      user: res.data,
      apiToken: res.apiToken,
      token: res.token,
    };
    dispatch(fetchSiteSettings(res.token, res.apiToken));
    SaveTokenInLocalStorage(dispatch, userInfo);
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
    localStorage.setItem("isVerified", true);
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
      // let message=""
      // if(data.msg ==='OTP has been sent to mail. Check your mail and enter the otp. It will reset in 200 seconds.'){
      //   message="A new Otp has been sent to your email, Please check your email now as it expires in 200 seconda"
      // }
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
      localStorage.setItem("Wallet", JSON.stringify(res.data));
    } else {
      return;
    }
  };
};

export const SaveTokenInLocalStorage = (dispatch, userDetails) => {
  // logOutTimer(dispatch, userDetails.expiresIn);
  let AuthTokenDetails = {
    token: userDetails.token,
    apiToken: userDetails.apiToken,
  };
  localStorage.setItem("AuthToken", JSON.stringify(AuthTokenDetails));
  localStorage.setItem("CurrentUser", JSON.stringify(userDetails.user));
};

// export const logOutTimer = (dispatch, timer) => {
//   setTimeout(() => {
//     dispatch(logout());
//   }, timer);
// };

export const AutoAuthenticate = (dispatch) => {
  const AuthToken = localStorage.getItem("AuthToken");
  const CurrentUser = localStorage.getItem("CurrentUser");
  const siteSettings = localStorage.getItem("settings");
  const isAuth = localStorage.getItem("isVerified");
  const Address = localStorage.getItem("Address");
  const Wallet = localStorage.getItem("Wallet");
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
  if(siteSettings){
    dispatch(fetchSettingsSuccess(JSON.parse(siteSettings)))
  }

  UserToken = JSON.parse(AuthToken);
  // let expireDate = new Date(UserToken.expirationtime);
  // let todaysDate = new Date();
  // if (todaysDate > expireDate) {
  //   return dispatch(logout());
  // }
  let data = {
    token: UserToken.token,
    apiToken: UserToken.apiToken,
    user: JSON.parse(CurrentUser),
  };
  // validateToken(UserToken)
  dispatch(autoAuthenticationSuccess(data));

  // const timer = expireDate.getTime() - todaysDate.getTime();
  // logOutTimer(dispatch, timer);
};
