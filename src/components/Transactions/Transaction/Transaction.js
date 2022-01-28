import React, { useState } from "react";
import "./Transaction.css";
import Button from "../../Button/Button";
import { useSelector } from "react-redux";
const currencies = [
  { value: "MATIC" },
  { value: "FTM" },
  { value: "ETH" },
  { value: "AVAX" },
  { value: "ONE" },
  { value: "ETH" },
  { value: "NEAR" },
  { value: "CELO" },
  { value: "BNB" },
  { value: "FTM" },
];

const Transaction = (props) => {
  const Address = useSelector((state) => state.auth.address);
  const Address_Local = localStorage.getItem("Address");
  const [values, setValues] =useState({
    amount: "",
    hash: (Address || Address_Local)
  })

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: event.target.value });
  };
  const TransactionSubmitHandler=(event)=>{
    event.preventDefault();
    //Logic to create transaction goes here

  }

  return (
    <div className="grandpa__transaction_wrapper">
      <h4>Transaction</h4>
      <p>
        Please select the type of token and amount in order to cotinue with the
        transaction.
      </p>
      <div className="grandpa__transaction_form_wrapper">
        <form onSubmit={TransactionSubmitHandler}>
          <input
            type="text"
            value={values.hash}
            onChange={handleOnChange}
            name="address"
            className="grandpa__input_field"
          />
          <div className="grandpa__multi_column_fields_wrapper">
            <select className="grandpa__multi_column_field">
              {currencies.map((currency) => {
                return <option value={currency.value}>{currency.value}</option>;
              })}
            </select>
            <input
              type="number"
              name="amount"
              onChange={handleOnChange}
              value={values.amount}
              placeholder={0.02}
              className="grandpa__multi_column_field"
            />
          </div>
          <Button type="submit">Continue</Button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
