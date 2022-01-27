import React from "react";
import { useSelector } from "react-redux";
import "./TransactionList.css";
const TransactionCard = (props) => {
  const {hashValue, ammount } = props
  return (
    <div className="grandpa__transaction__card_wrapper">
      <div className="grandpa__transaction_token">
        {hashValue}
      </div>
      <div className="grandpa__transaction_amount">{ammount} BNB</div>
    </div>
  );
};
const TransactionList = () => {
  const Transactions = useSelector((state) => state.transactions.transactions);
  return (
    <div className="grandpa__transaction_list_wrapper">
      <h4>Last 5 Transactions</h4>
      {Transactions &&
        Transactions.map((transaction) => {
          return <TransactionCard hashValue={transaction.hash} ammount={transaction.amount} />;
        })}
    </div>
  );
};

export default TransactionList;
