import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import "./TransactionList.css";

const TransactionList = () => {
  const Transactions = useSelector((state) => state.transactions.transactions);
  const isLoading = useSelector(state=>state.transactions.isLoading);

  const TransactionCard = (props) => {
    const { hashValue, amount,name } = props;
    return (
      <div className="grandpa__transaction__card_wrapper">
        {isLoading ? (
          <Skeleton width="100%" />
        ) : (
          <>
            <div className="grandpa__transaction_token">{hashValue}</div>
            <div className="grandpa__transaction_amount">{amount} {name}</div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="grandpa__transaction_list_wrapper">
      <h4>Last 5 Transactions</h4>
      {isLoading
        ? [...Array(5).keys()].map((index) => {
            return <TransactionCard />;
          })
        : Transactions &&
          Transactions.map((transaction) => {
            return (
              <TransactionCard
                hashValue={transaction.hash}
                amount={transaction.amount}
                name={transaction.token.name}
              />
            );
          })}
    </div>
  );
};

export default TransactionList;
