import { baseUrl } from "..";
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
} from "../Slices/authSlice";

export const Login = (email) => {
  return async (dispatch) => {
    dispatch(authenticationPending());
    const response = await fetch(`${baseUrl}/accounts/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      let errorMessage = "";
      if (error.err === "User is not registered to whiteboard crypto.") {
        errorMessage = "Account not found, redirecting to whiteboard Crypto...";
      }
      dispatch(authenticationFail(errorMessage));
    }
    const res = await response.json();
    console.log(res);
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
    SaveTokenInLocalStorage(dispatch, userInfo);
  };
};

export const OTPVerify = (otp, uuid) => {
  return async (dispatch) => {
    dispatch(verificationPending());
    const response = await fetch(`${baseUrl}/accounts/verify-otp/${uuid}`, {
      method: "POST",
      body: JSON.stringify({
        otp,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      let Errormessage = "";
      if (error.msg === "OTP incorrect.") {
        Errormessage = "OTP entered is incorrect";
      }
      dispatch(verificationFail(Errormessage));
      console.log(error);
    }
    const data = await response.json();
    let Errormessage = "";
    if (data.msg === "OTP incorrect.") {
      Errormessage = "OTP entered is incorrect";
    }
    dispatch(verificationSuccess(Errormessage));
    dispatch(isAuthenticated())
    localStorage.setItem("isVerified", true)
    // console.log(data)
  };
};

export const CreateWallet = (address, account_uuid, apiToken, AuthToken) => {
  return async (dispatch) => {
    dispatch(createWalletPending());
    if (address && address.length>0) {
        const response = await fetch(`${baseUrl}/wallet-address/`, {
          method: "POST",
          body: JSON.stringify({
            address,
            account_uuid,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: "asdfasdfasdfasdfasfasfasdf",
            apiToken: apiToken,
            Authorization: "Bearer " + AuthToken,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          dispatch(createWalletFail(error));
          // console.log(error);
        }
        const res = await response.json();
        // console.log(res);
        dispatch(createWalletSuccess(res.data));
        localStorage.setItem("Wallet", JSON.stringify(res.data));
      }else{
        return
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
  let UserToken = "";
  if (!AuthToken) {
    dispatch(logout());
    return;
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
