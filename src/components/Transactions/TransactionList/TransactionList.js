import { Skeleton } from "@material-ui/lab";
import { Paper,Button } from "@material-ui/core";
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import "./TransactionList.css";
import { fetchTransactions } from "../../../store/Actions/TransactionsActions";

const TransactionList = () => {
  const Transactions = useSelector((state) => state.transactions.transactions);
  const isLoading = useSelector((state) => state.transactions.isLoading);
  const dispatch = useDispatch()
  const { token, apiToken } = useSelector((state) => state.auth);
  const TransactionCard = (props) => {
    const { hashValue, amount, name, key } = props;
    return (
      <div className="grandpa__transaction__card_wrapper" key={key}>
        {isLoading ? (
          <Skeleton width="100%" />
        ) : (
          <>
            <div className="grandpa__transaction_token">{hashValue}</div>
            <div className="grandpa__transaction_amount">
              {amount} {name}
            </div>
          </>
        )}
      </div>
    );
  };
  const RefetchTransactions=()=>{
    dispatch(fetchTransactions(token, apiToken));
  }

  return (
    <div className="grandpa__transaction_list_wrapper">
      <h4>Last 5 Transactions</h4>
      {isLoading
        ? [...Array(5).keys()].map((index) => {
            return <TransactionCard key={index} />;
          })
        : Transactions &&
          Transactions.map((transaction) => {
            return (
              <TransactionCard
                key={transaction.hash}
                hashValue={transaction.hash}
                amount={transaction.amount}
                name={transaction.token && transaction.token.name}
              />
            );
          })}
      {!isLoading && Transactions && Transactions.length < 1 && (
        <Paper className="failed_fetch_error" >
          Oooops! Failed to fetch transactions. <Button variant="outlined" onClick={RefetchTransactions}>Retry</Button>
        </Paper>
      )}
    </div>
  );
};

export default TransactionList;
