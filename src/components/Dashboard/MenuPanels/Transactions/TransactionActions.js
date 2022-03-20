import React from "react";
import SortingDropdown from "../../../../containers/UI/SortingDropdown/SortingDropdown";
import Button from "../../../Button/Button";
import classes from "./TransactionActions.module.css";

const TransactionActions = (props) => {
  const {
    transactions,
    AddNewBlackListHandler,
    SortingArray,
    selected,
    setSelected,
    actions,
  } = props;
  return (
    <div className={classes.transactions_header_wrapper}>
      <div className={classes.transactions_sorting_input_wrappper}>
        <SortingDropdown
          selected={selected}
          ArrayData={SortingArray}
          setSelected={setSelected}
        />
      </div>
      <div className={classes.transactions_header_action_buttons}>
        <div className={classes.pdf_btn_wrapper}>
          <Button variant="secondary" onClick={actions}>
            Export Pdf
          </Button>
        </div>
        {!transactions && (
          <div className={classes.add_new_btn_wrapper}>
            <Button variant="primary" onClick={AddNewBlackListHandler}>
              Add new
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionActions;
