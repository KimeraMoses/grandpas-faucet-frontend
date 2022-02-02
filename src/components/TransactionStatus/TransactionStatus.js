import React from "react";
import "../SignIn/SignIn.css";
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import FailIcon from '@material-ui/icons/CancelOutlined';
import BlackList from '@material-ui/icons/ErrorOutline';
import "./TransactionStatus.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";


const TransactionStatus = ({status}) => {
  const navigate = useNavigate()
  const buttonClickHandler = ()=>{
navigate('/transactions')
  }
  return (
    <div className="grandpa__transaction_status">
       <div className={`grandpa__transaction ${status === "success"? "success": "fail"}`} >
        
        {status === "success"? <SuccessIcon/>: <FailIcon/>}
       </div>
      <Button onClick={buttonClickHandler}>Continue</Button>
    </div>
  );
};

export default TransactionStatus;
