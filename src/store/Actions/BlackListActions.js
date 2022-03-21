import {
  createBlackListFail,
  createBlackListPending,
  createBlackListSuccess,
  deleteBlackListFail,
  deleteBlackListPending,
  deleteBlackListSuccess,
  editBlackListSettingFail,
  editBlackListSettingPending,
  editBlackListSettingSuccess,
  fetchBlackListFail,
  fetchBlackListPending,
  fetchBlackListSettingsFail,
  fetchBlackListSettingsPending,
  fetchBlackListSettingsSuccess,
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
    } catch (error) {
      dispatch(fetchBlackListFail(error));
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

// ==========BLACK LIST SETTINGS========

export const fetchBlackListSettings =
  (AuthToken, apiToken) => async (dispatch) => {
    dispatch(fetchBlackListSettingsPending());
    if (AuthToken && apiToken) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/blacklist-settings/`,
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
        dispatch(fetchBlackListSettingsSuccess(data));
      } catch (error) {
        dispatch(fetchBlackListSettingsFail(error));
      }
    } else {
      return;
    }
  };

export const AddToBlackListSetting =
  (AuthToken, apiToken, token, max_amount, max_amount_duration) =>
  async (dispatch) => {
    dispatch(createBlackListPending());
    if (AuthToken && apiToken) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/blacklist-settings`,
          {
            method: "POST",
            body: JSON.stringify({
              token,
              max_amount,
              max_amount_duration,
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
        dispatch(fetchBlackListSettings(AuthToken, apiToken));
      } catch (error) {
        dispatch(createBlackListFail(error));
      }
    } else {
      return;
    }
  };

export const EditBlackListSetting =
  (AuthToken, apiToken, max_amount, max_amount_duration, uuid) =>
  async (dispatch) => {
    dispatch(editBlackListSettingPending());
    if (AuthToken && apiToken) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/blacklist-settings/${uuid}`,
          {
            method: "PUT",
            body: JSON.stringify({
              max_amount,
              max_amount_duration,
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
        dispatch(editBlackListSettingSuccess(data));
        dispatch(fetchBlackListSettings(AuthToken, apiToken));
      } catch (error) {
        dispatch(editBlackListSettingFail(error));
      }
    } else {
      return;
    }
  };

export const DeleteBlackListSetting =
  (uuid, AuthToken, apiToken) => async (dispatch) => {
    dispatch(deleteBlackListPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/blacklist-settings/${uuid}`,
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
      dispatch(fetchBlackListSettings(AuthToken, apiToken));
    } catch (error) {
      dispatch(deleteBlackListFail(error));
    }
  };
