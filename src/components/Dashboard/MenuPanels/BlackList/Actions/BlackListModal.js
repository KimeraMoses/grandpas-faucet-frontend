import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "../../../../../containers/UI/Dropdown/CustomDropdown";
import {
  AddToBlackList,
  DeleteBlackList,
  fetchBlackList,
} from "../../../../../store/Actions/BlackListActions";
import { fetchAllWallet } from "../../../../../store/Actions/WalletActions";
import Button from "../../../../Button/Button";
import classes from "./BlackListModal.module.css";

const BlackListModal = (props) => {
  const { token, apiToken } = useSelector((state) => state.auth);
  const { title, description, action, setOpen,selected,setSelected } = props;
  const WalletData = useSelector((state) => state.wallet.Wallet);
  const isLoading = useSelector((state) => state.blackList.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllWallet(token, apiToken));
  }, [token, apiToken,dispatch]);

  let selectedWallet = WalletData.filter(
    (wallet) => wallet.address === selected
  )[0];
  useEffect(() => {
  }, [selectedWallet]);
  const deleteBlackList = async(e) => {
    e.preventDefault();
    await dispatch(DeleteBlackList(selected, token, apiToken))
    setOpen(false)
  };
  const addToBlackList = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        AddToBlackList(
          token,
          apiToken,
          selectedWallet.account.uuid,
          selectedWallet._id,
          selectedWallet.uuid,
          "192.168.1.1"
        )
      );
      setSelected("Select Wallet Address");
      setOpen(false);
      dispatch(fetchBlackList(token, apiToken));
    } catch (error) {
      return;
    }
  };
  return (
    <div className={classes.new_black_list_wrapper}>
      <div className={classes.new_black_list_header}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <form>
        {action === "add" && (
          <div className={classes.new_input_field_wrapper}>
            <CustomDropdown
              selected={selected}
              setSelected={setSelected}
              isSelect={true}
              ArrayData={WalletData}
            />
          </div>
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
              onClick={action === "delete" ? deleteBlackList : addToBlackList}
            >
              {action === "delete" && isLoading
                ? "Deleting..."
                : action === "delete" && !isLoading
                ? "Delete"
                : action === "add" && isLoading
                ? "Adding..."
                : "Add To Blacklist"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlackListModal;
