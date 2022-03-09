import { fetchWalletFail, fetchWalletPending, fetchWalletSuccess } from "../Slices/walletSlice";



export const fetchAllWallet = (AuthToken, apiToken) => async (dispatch) => {
    dispatch(fetchWalletPending());
    if (AuthToken && apiToken) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/wallet-address/`,
          {
            method: "GET",
            headers: new Headers({
              "Content-type": "application/json",
              apiKey: process.env.REACT_APP_APIKEY,
              apiToken: apiToken,
              token: AuthToken,
              Authorization: "Bearer " + AuthToken,
            }),
          }
        );
        const wallet = await response.json();
        dispatch(fetchWalletSuccess(wallet));
      } catch (error) {
        dispatch(fetchWalletFail(error));
      }
    } else {
      return;
    }
  };
