import React from "react";
import "./TransactionList.css";
const TransactionCard = () => {
  return (
    <div className="grandpa__transaction__card_wrapper">
      <div className="grandpa__transaction_token">Mse28M9UQJAZGSSHSXzbFXZKPg1C</div>
      <div className="grandpa__transaction_amount">0.02 BNB</div>
    </div>
  );
};
const TransactionList = () => {
  return (
    <div className="grandpa__transaction_list_wrapper">
      <h4>Last 5 Transactions</h4>
      <TransactionCard/>
      <TransactionCard/>
      <TransactionCard/>
      <TransactionCard/>
      <TransactionCard/>
    </div>
  );
};

export default TransactionList;
