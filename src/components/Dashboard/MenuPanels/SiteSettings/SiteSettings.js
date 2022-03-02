import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../../../containers/UI/InputField/InputField";
import {
  fetchSiteSettings,
  updateSiteSettings,
} from "../../../../store/Actions/UserActions";
import Button from "../../../Button/Button";
import classes from "./SiteSettings.module.css";

const SiteSettings = () => {
  const { token, apiToken } = useSelector((state) => state.auth);
  const settings = useSelector((state) => state.settings.settings);
  const isLoading = useSelector((state) => state.settings.isUpdating);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    maintenance: "",
    testNetwork: "",
  });
  const uuid = settings && settings.uuid;
  useEffect(() => {
    setValues({
      email: settings && settings.admin_email,
      maintenance: settings && settings.maintenance,
      testNetwork: settings && settings.use_dev_network,
    });
  }, [settings]);

  useEffect(() => {
    dispatch(fetchSiteSettings(token, apiToken));
  }, [token,apiToken, dispatch]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSwitchInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const settingsUpdateHandler = async (e) => {
    e.preventDefault();

    if (values.email.length < 1) {
      return setError("Please enter a valid email");
    }

    try {
      setError("");
      await dispatch(
        updateSiteSettings(
          token,
          apiToken,
          uuid,
          values.email,
          values.maintenance,
          values.testNetwork
        )
      );
      setMessage("Settings saved successfully");
    } catch (error) {
      setError("Failed to save changes");
    }
  };

  return (
    <div className={classes.site_settings_wrapper}>
      <form onSubmit={settingsUpdateHandler}>
        <div className={classes.setting_content_wrapper}>
          {!message && error && (
            <div style={{ textAlign: "left", marginBottom: 5 }}>
              <Alert severity="error">{error}</Alert>
            </div>
          )}
          {!isLoading && message && (
            <Alert
              style={{ textAlign: "left", marginBottom: 5 }}
              severity="success"
            >
              {message}
            </Alert>
          )}

          <div className={classes.input_field_label_wrapper}>
            <h3>Admin Email Address</h3>
            <InputField
              placeholder="Paul.Elliott@fakemail.com"
              value={values.email}
              name="email"
              onChange={handleInput}
            />
          </div>
          <div className={classes.input_field_label_wrapper}>
            <h3>Site Maintenance</h3>
            <InputField
              placeholder="Maintenance"
              checked={values.maintenance}
              value={values.maintenance}
              name="maintenance"
              onChange={handleSwitchInput}
              toggle={true}
            />
          </div>
          <div className={classes.input_field_label_wrapper}>
            <h3>Switch To Test Networks</h3>
            <InputField
              placeholder="Switch To Test Networks"
              checked={values.testNetwork}
              value={values.testNetwork}
              name="testNetwork"
              onChange={handleSwitchInput}
              toggle={true}
            />
          </div>
        </div>
        <div className={classes.setttings_action_btn_wrapper}>
          <Button type="submit">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettings;
