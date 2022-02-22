import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "../../../../../containers/UI/Dropdown/CustomDropdown";
import InputField from "../../../../../containers/UI/InputField/InputField";
import {
  DeleteToken,
  EditTokenDetails,
} from "../../../../../store/Actions/TokensActions";
import Button from "../../../../Button/Button";
import classes from "../../BlackList/Actions/BlackListModal.module.css";

const TokenModel = (props) => {
  const { title, description, action, setOpen, selected } = props;
  const { token, apiToken } = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.tokens.isLoading);
  const EnabledTokens = useSelector((state) => state.tokens.tokens);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // console.log(SelectedToken);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    max_value: "",
    max_amount: "",
    smart_contract: "",
    gas: "",
    provider_url: "",
    dev_url: "",
    private_key: "",
    dev_private_key: "",
    dev_wallet_address: "",
    status: true,
  });
  let selectedToken;
  useEffect(() => {
    selectedToken = EnabledTokens.filter((token) => token.uuid === selected)[0];
    setValues({
      name: selectedToken.name,
      max_amount: selectedToken.maximum_amount,
      smart_contract: selectedToken.smart_contract,
      max_value: selectedToken.total_value,
      gas: selectedToken.gas,
      provider_url: selectedToken.provider_url,
      dev_url: selectedToken.provider_url_dev,
      private_key: selectedToken.private_key,
      dev_private_key: selectedToken.private_key_dev,
      dev_wallet_address: selectedToken.wallet_address_dev,
      status: selectedToken.enabled,
    });
  }, [selected]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSwitchInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleTokenDelete = async (e) => {
    e.preventDefault();
    console.log("Deleted", selected);
    await dispatch(DeleteToken(selected, token, apiToken));
    setOpen(false);
  };

  const addToBlackListHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        EditTokenDetails(
          selected,
          token,
          apiToken,
          values.name,
          values.max_amount,
          values.smart_contract,
          values.total_value,
          values.gas,
          values.provider_url,
          values.dev_url,
          values.private_key,
          values.dev_private_key,
          values.wallet_address_dev,
          values.status
        )
      );
      setMessage("Token Edited Successfully");
      setOpen(false)
    } catch (error) {
      setError("Faild to edit token details");
    }
  };

  return (
    <div className={classes.new_black_list_wrapper}>
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
      <div className={classes.new_black_list_header}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <form onSubmit={addToBlackListHandler}>
        {action === "add" && (
          <>
            <InputField
              placeholder="Name"
              name="name"
              value={values.name}
              onChange={handleInput}
            />
            <InputField
              placeholder="Maximum Value"
              type="number"
              name="max_value"
              value={values.max_value}
              onChange={handleInput}
            />
            <InputField
              placeholder="Maximum Amount"
              type="number"
              name="max_amount"
              value={values.max_amount}
              onChange={handleInput}
            />
            <InputField
              placeholder="Smart Contract"
              name="smart_contract"
              value={values.smart_contract}
              onChange={handleInput}
            />
            <InputField
              placeholder="Gas"
              name="gas"
              value={values.gas}
              onChange={handleInput}
            />
            <InputField
              placeholder="Provider URL"
              name="provider_url"
              value={values.provider_url}
              onChange={handleInput}
            />
            <InputField
              placeholder="Dev Provider URL"
              name="dev_url"
              value={values.dev_url}
              onChange={handleInput}
            />
            <InputField
              placeholder="Private Key"
              name="private_key"
              value={values.private_key}
              onChange={handleInput}
            />
            <InputField
              placeholder="Dev Private Key"
              name="dev_private_key"
              value={values.dev_private_key}
              onChange={handleInput}
            />
            <InputField
              placeholder="Dev Wallet Address"
              name="dev_wallet_address"
              value={values.dev_wallet_address}
              onChange={handleInput}
            />
            <InputField
              placeholder="Status"
              checked={values.status}
              value={values.status}
              name="status"
              onChange={handleSwitchInput}
              toggle={true}
            />
          </>
        )}
        <div className={classes.black_list_action_btns}>
          <div className={classes.cancel_btn_wrapper}>
            <Button
              variant="tartiary"
              fullWidth={true}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
          <div className={classes.add_new_blacklist_btn_wrapper}>
            <Button
              variant="primary"
              fullWidth={true}
              disabled={isLoading}
              onClick={
                action === "delete" ? handleTokenDelete : addToBlackListHandler
              }
            >
              {action === "delete" && isLoading
                ? "Deleting..."
                : action === "delete" && !isLoading
                ? "Delete"
                : action === "add" && isLoading? "Updating..." :"Update Token"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TokenModel;
