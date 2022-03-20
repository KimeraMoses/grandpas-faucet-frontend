import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "../../../../../containers/UI/Dropdown/CustomDropdown";
import InputField from "../../../../../containers/UI/InputField/InputField";
import {
  AddToBlackListSetting,
  DeleteBlackListSetting,
  EditBlackListSetting,
} from "../../../../../store/Actions/BlackListActions";
import { fetchAllTokens } from "../../../../../store/Actions/TokensActions";
import Button from "../../../../Button/Button";
import classes from "./BlackListSettingsModal.module.css";

const BlackListSettingsModal = (props) => {
  const { token, apiToken } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const {
    title,
    description,
    action,
    setOpen,
    selected,
    setSelected,
    selectedName,
    setSelectedName,
  } = props;
  const TokensData = useSelector((state) => state.tokens.tokens);
  const BlackListedData = useSelector(
    (state) => state.blackList.blackListSettings
  );
  const isLoading = useSelector((state) => state.blackList.isLoading);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    max_amount: "",
    max_amount_duration: "",
  });
  let selectedToken = BlackListedData.filter(
    (token) => token.uuid === selected
  )[0];

  useEffect(() => {
    if (selectedToken && action === "edit") {
      setSelectedName(selectedToken.token && selectedToken.token.name);
      setValues({
        max_amount: selectedToken.max_amount,
        max_amount_duration: selectedToken.max_amount_duration,
      });
    }
  }, [selected, selectedToken,action,setSelectedName]);

  const cancelBtnHandler = () => {
    setValues({
      max_amount: "",
      max_amount_duration: "",
    });
    setSelectedName("Select Token");
    setOpen(false);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setError("");
  };

  useEffect(() => {
    dispatch(fetchAllTokens(token, apiToken));
  }, [token, apiToken, dispatch]);

  const deleteBlackList = async (e) => {
    e.preventDefault();
    await dispatch(DeleteBlackListSetting(selected, token, apiToken));
    setOpen(false);
  };

  const addToBlackList = async (e) => {
    e.preventDefault();
    if (values.max_amount.length < 1) {
      return setError("Please enter a valid amount");
    }
    if (values.max_amount_duration.length < 1) {
      return setError("Please enter a valid duration");
    }
    try {
      setError("");
      await dispatch(
        AddToBlackListSetting(
          token,
          apiToken,
          selected,
          +values.max_amount,
          +values.max_amount_duration
        )
      );
      setSelectedName("Select Token");
      setValues({ max_amount: "", max_amount_duration: "" });
      setOpen(false);
    } catch (error) {
      return setError("Failed to add token to BlackList");
    }
  };

  const editBlackListSetting = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await dispatch(
        EditBlackListSetting(
          token,
          apiToken,
          +values.max_amount,
          +values.max_amount_duration,
          selected
        )
      );
      setValues({
        max_amount: "",
        max_amount_duration: "",
      });
      setSelectedName("Select Token");
      setOpen(false);
    } catch (error) {
      return setError("Failed to edit Black List");
    }
  };
  return (
    <div className={classes.new_black_list_wrapper}>
      {error && (
        <div style={{ textAlign: "left", marginBottom: 5 }}>
          <Alert
            severity="error"
          >
            {error}
          </Alert>
        </div>
      )}
      <div className={classes.new_black_list_header}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <form
        onSubmit={
          action === "delete"
            ? deleteBlackList
            : action === "edit"
            ? editBlackListSetting
            : addToBlackList
        }
      >
        {(action === "add" || action === "edit") && (
          <>
            <div className={classes.new_input_field_wrapper}>
              <CustomDropdown
                isTokens={true}
                selected={selected}
                setSelected={setSelected}
                isSelect={true}
                ArrayData={TokensData}
                selectedName={selectedName}
                setSelectedName={setSelectedName}
              />
            </div>
            <div className={classes.new_input_field_wrapper__half}>
              <div className={classes.field_wrapper_left}>
                <InputField
                  placeholder="Max Amount"
                  type="number"
                  value={values.max_amount}
                  name="max_amount"
                  onChange={onChangeHandler}
                  fullWidth={true}
                  step={0.01}
                  min={0}
                />
              </div>
              <div className={classes.field_wrapper_right}>
                <InputField
                  placeholder="Max Amount Duration"
                  type="number"
                  value={values.max_amount_duration}
                  name="max_amount_duration"
                  onChange={onChangeHandler}
                  fullWidth={true}
                  min={0}
                />
              </div>
            </div>
          </>
        )}

        <div className={classes.black_list_action_btns}>
          <div className={classes.cancel_btn_wrapper}>
            <Button
              variant="tartiary"
              fullWidth={true}
              onClick={cancelBtnHandler}
              type="button"
            >
              Cancel
            </Button>
          </div>
          <div className={classes.add_new_blacklist_btn_wrapper}>
            <Button
              variant="primary"
              fullWidth={true}
              onClick={
                action === "delete"
                  ? deleteBlackList
                  : action === "edit"
                  ? editBlackListSetting
                  : addToBlackList
              }
            >
              {action === "delete" && isLoading
                ? "Deleting..."
                : action === "delete" && !isLoading
                ? "Delete"
                : action === "add" && isLoading
                ? "Adding..."
                : action === "edit" && isLoading
                ? "Saving Changes..."
                : action === "edit" && !isLoading
                ? "Edit BlackList"
                : "Add To Blacklist"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlackListSettingsModal;
