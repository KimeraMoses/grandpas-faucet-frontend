import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./Transaction.css";
import Button from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { isConnected } from "../../../store/Slices/authSlice";
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
  const dispatch = useDispatch()
  const Address = useSelector((state) => state.auth.address);
  const Address_Local = localStorage.getItem("Address");
  const [userAddress, setUserAddress] = useState("")
  const [values, setValues] =useState({
    amount: "",
    hash: userAddress,
  })


  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: event.target.value });
  };
  const TransactionSubmitHandler=(event)=>{
    event.preventDefault();
    //Logic to create transaction goes here
  }
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const getAddress=async ()=>{
    loadWeb3()
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    localStorage.setItem("Address", accounts[0]);
    dispatch(isConnected(accounts[0]));
    setUserAddress(accounts[0])
  }

  useEffect(()=>{
    getAddress()
  },[])


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
            value={userAddress}
            onChange={handleOnChange}
            name="userAddress"
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
