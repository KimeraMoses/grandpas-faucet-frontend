import {
  deleteTokenFail,
  deleteTokenPending,
  deleteTokenSuccess,
  editTokenFail,
  editTokenPending,
  editTokenSuccess,
  fetchTokensFail,
  fetchTokensPending,
  fetchTokensSuccess,
} from "../Slices/tokensSlice";

export const fetchAllTokens = (AuthToken, apiToken) => async (dispatch) => {
  dispatch(fetchTokensPending());
  if (AuthToken && apiToken) {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASEURL}/token/`, {
        method: "GET",
        headers: new Headers({
          "Content-type": "application/json",
          apiKey: process.env.REACT_APP_APIKEY,
          apiToken: apiToken,
          token: AuthToken,
          Authorization: "Bearer " + AuthToken,
        }),
      });
      const tokens = await response.json();
      dispatch(fetchTokensSuccess(tokens));
      console.log("Tokens",tokens)
    } catch (error) {
      dispatch(fetchTokensFail(error));
    }
  } else {
    return;
  }
};

export const DeleteToken = (uuid, AuthToken, apiToken) => async (dispatch) => {
  dispatch(deleteTokenPending());
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/token/${uuid}`,
      {
        method: "DELETE",
        headers: new Headers({
          "Content-type": "application/json",
          apiKey: process.env.REACT_APP_APIKEY,
          apiToken: apiToken,
          token: AuthToken,
          Authorization: "Bearer " + AuthToken,
        }),
      }
    );
    const res = await response.json();
    dispatch(deleteTokenSuccess(res.data));
    dispatch(fetchAllTokens(AuthToken, apiToken));
  } catch (error) {
    dispatch(deleteTokenFail(error));
  }
};

export const EditTokenDetails =
  (
    uuid,
    AuthToken,
    apiToken,
    name,
    maximum_amount,
    smart_contract,
    total_value,
    gas,
    provider_url,
    provider_url_dev,
    private_key,
    private_key_dev,
    wallet_address_dev,
    enabled
  ) =>
  async (dispatch) => {
    dispatch(editTokenPending());
    try {
      const response = fetch(`${process.env.REACT_APP_BASEURL}/token/${uuid}`, {
        method: "PUT",
        body: JSON.stringify({
          uuid,
          AuthToken,
          apiToken,
          name,
          maximum_amount,
          smart_contract,
          total_value,
          gas,
          provider_url,
          provider_url_dev,
          private_key,
          private_key_dev,
          wallet_address_dev,
          enabled,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          apiKey: process.env.REACT_APP_APIKEY,
          apiToken: apiToken,
          token: AuthToken,
          Authorization: "Bearer " + AuthToken,
        }),
      });
      const res = await response.json();
      // console.log(res);
      dispatch(editTokenSuccess());
    } catch (error) {
      dispatch(editTokenFail());
      // console.log(error);
    }
  };
