import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFaucets,
  fetchTransactions,
} from "../../store/Actions/TransactionsActions";
import Transaction from "./Transaction/Transaction";
import TransactionList from "./TransactionList/TransactionList";
import "./Transactions.css";

const Transactions = (props) => {
  const { token, apiToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions(token, apiToken));
    dispatch(fetchFaucets(token, apiToken));
  }, [token, apiToken, dispatch]);
  return (
    <div className="grandpa__transactions">
      <div className="grandpa__single_transaction">
        <Transaction />
      </div>
      <div className="grandpa__transaction_list">
        <TransactionList />
      </div>
    </div>
  );
};

export default Transactions;
