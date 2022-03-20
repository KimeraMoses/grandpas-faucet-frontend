
import {
  fetchSettingsFail,
  fetchSettingsPending,
  fetchSettingsSuccess,
  updateSettingFail,
  updateSettingsPending,
  updateSettingSuccess,
} from "../Slices/settingsSlice";

export const fetchSiteSettings = (AuthToken, apiToken) => {
  return async (dispatch) => {
    if (AuthToken && apiToken) {
      dispatch(fetchSettingsPending());
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/site-settings/`,
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
        const SiteSettings = await response.json();
        dispatch(fetchSettingsSuccess(SiteSettings));
        localStorage.setItem("Grand__Settings", JSON.stringify(SiteSettings));
      } catch (error) {
        dispatch(fetchSettingsFail(error));
      }
    } else {
      return;
    }
  };
};

export const updateSiteSettings =
  (AuthToken, apiToken, uuid, admin_email, maintenance, use_dev_network) =>
  async (dispatch) => {
    dispatch(updateSettingsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/site-settings/${uuid}`,
        {
          method: "PUT",
          body: JSON.stringify({
            admin_email,
            maintenance,
            use_dev_network,
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
      dispatch(updateSettingSuccess(data));
      dispatch(fetchSiteSettings(AuthToken, apiToken));
    } catch (error) {
      dispatch(updateSettingFail(error));
    }
  };

