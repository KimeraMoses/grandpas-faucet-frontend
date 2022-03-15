import {
  createBlackListFail,
  createBlackListPending,
  createBlackListSuccess,
  deleteBlackListFail,
  deleteBlackListPending,
  deleteBlackListSuccess,
  fetchBlackListFail,
  fetchBlackListPending,
  fetchBlackListSuccess,
} from "../Slices/blackListSlice";

export const fetchBlackList = (AuthToken, apiToken) => async (dispatch) => {
  dispatch(fetchBlackListPending());
  if (AuthToken && apiToken) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/blacklist`,
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
      const data = await response.json();
      dispatch(fetchBlackListSuccess(data));
      console.log(data)
    } catch (error) {
      dispatch(fetchBlackListFail(error));
      console.log(error)
    }
  } else {
    return;
  }
};
export const AddToBlackList =
  (
    AuthToken,
    apiToken,
    account_uuid,
    wallet_id,
    wallet_address_uuid,
    ip_address
  ) =>
  async (dispatch) => {
    dispatch(createBlackListPending());
    if (AuthToken && apiToken) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/blacklist`,
          {
            method: "POST",
            body: JSON.stringify({
              account_uuid,
              wallet_id,
              wallet_address_uuid,
              ip_address,
            }),
            headers: new Headers({
              "Content-type": "application/json",
              apiKey: process.env.REACT_APP_APIKEY,
              apiToken: apiToken,
              token: AuthToken,
              Authorization: "Bearer " + AuthToken,
            }),
          }
        );
        const data = await response.json();
        dispatch(createBlackListSuccess(data));
      } catch (error) {
        dispatch(createBlackListFail(error));
      }
    } else {
      return;
    }
  };

export const DeleteBlackList =
  (uuid, AuthToken, apiToken) => async (dispatch) => {
    dispatch(deleteBlackListPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/blacklist/${uuid}`,
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
      dispatch(deleteBlackListSuccess(res.data));
      dispatch(fetchBlackList(AuthToken, apiToken));
    } catch (error) {
      dispatch(deleteBlackListFail(error));
    }
  };
