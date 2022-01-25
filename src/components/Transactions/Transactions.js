import React from "react";
import Transaction from "./Transaction/Transaction";
import TransactionList from "./TransactionList/TransactionList";
import "./Transactions.css";

const Transactions = (props) => {
  return (
    <div className="grandpa__transactions">
      <div className="grandpa__single_transaction">
        <Transaction/>
      </div>
      <div className="grandpa__transaction_list">
          <TransactionList/>
      </div>
    </div>
  );
};

export default Transactions;
