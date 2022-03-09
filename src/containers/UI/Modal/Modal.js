import React from "react";

//===MUI IMPORTS===
import { Box, Modal } from "@material-ui/core";

//===COMPONENTS IMPORTS===
import classes from "./Modal.module.css";
import BlackListModal from "../../../components/Dashboard/MenuPanels/BlackList/Actions/BlackListModal";
import TokenModel from "../../../components/Dashboard/MenuPanels/Tokens/TokenActions/TokenModal";

export const ACTIONTYPE = {
  ADD_TO_BLACKLIST: "BlackList",
  DELETE_BLACKLIST: "DeleteBlackList",
  EDIT_TOKEN: "EditToken",
  DELETE_TOKEN: "DeleteToken",
};

const ModalComponent = (props) => {
  const { open, setOpen, type,selected,setSelected } = props;

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.gpa__modal_wrapper}>
        {type === ACTIONTYPE.ADD_TO_BLACKLIST ? (
          <BlackListModal
            title="Add To Blacklist"
            description="Please select wallet address from the dropdown menu to mark it as a blacklisted wallet address."
            action="add"
            setOpen={setOpen}
            setSelected={setSelected}
            selected={selected}
          />
        ) : type === ACTIONTYPE.DELETE_BLACKLIST ? (
          <BlackListModal
            title="Delete Blacklisted Wallet"
            description="Are you sure you wish to delete this wallet address? This action can not be undone."
            action="delete"
            setOpen={setOpen}
            selected={selected}
          />
        ) : type === ACTIONTYPE.EDIT_TOKEN ? (
          <TokenModel
            title="Edit Token"
            description="Please use the form below accordingly in order to update the token values reflected in the table."
            action="add"
            setOpen={setOpen}
            selected={selected}
          />
        ) : type === ACTIONTYPE.DELETE_TOKEN ? (
          <TokenModel
            title="Delete Token"
            description="Are you sure you wish to delete this token? This action can not be undone."
            action="delete"
            setOpen={setOpen}
            selected={selected}
          />
        ) : (
          "Not sure What to do? "
        )}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
