import React from "react";
import "../SignIn/SignIn.css";
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import FailIcon from '@material-ui/icons/CancelOutlined';
import "./TransactionStatus.css";
import Button from "../Button/Button";


const TransactionStatus = ({status}) => {
  return (
    <div className="grandpa__transaction_status">
       <div className={`grandpa__transaction ${status === "success"? "success": "fail"}`} >
        
        {status === "success"? <SuccessIcon/>: <FailIcon/>}
       </div>
      <Button>Continue</Button>
    </div>
  );
};

export default TransactionStatus;
