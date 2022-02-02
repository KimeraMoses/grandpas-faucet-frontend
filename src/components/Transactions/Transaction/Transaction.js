import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./Transaction.css";
import Button from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { isConnected } from "../../../store/Slices/authSlice";
import { CreateTransaction } from "../../../store/Actions/TransactionsActions";
import { Alert } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../Dropdown/Dropdown";

const Transaction = (props) => {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.auth.wallet);
  const { apiToken, token } = useSelector((state) => state.auth);
  const Faucets = useSelector((state) => state.transactions.faucets);
  const isFetchingFaucets = useSelector((state) => state.transactions.fetching);
  const [userAddress, setUserAddress] = useState("");
  const [selected, setSelected] = useState("Select One");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    amount: "",
    faucet: "",
    hash: userAddress,
  });
  let invalidData = true;
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: event.target.value });
    setError("");
    setMessage("");
  };
  const wallet_uuid = wallet && wallet.uuid;

  const selectedFaucet =
    Faucets && Faucets.filter((faucet) => faucet.uuid === values.faucet)[0];

  if (values.amount.length >0) {
    invalidData =
      values.amount >
      ((selectedFaucet && selectedFaucet.maximum_amount) ||
        (selectedFaucet && selectedFaucet.total_value))
        ? true
        : false;
  }

  const TransactionSubmitHandler = async (event) => {
    event.preventDefault();
    if (values.faucet.length < 6) {
      return setError("Please select faucet to continue");
    }

    if (values.amount.length < 1) {
      return setError("Please enter the amount to continue");
    }
    try {
      setError("");
      setLoading(true);
      await dispatch(
        CreateTransaction(
          wallet_uuid,
          values.amount,
          values.faucet,
          apiToken,
          token
        )
      );
      setLoading(false);

      setValues({ ...values, amount: "" });
      setMessage("Transaction created successfuly");
      navigate("/transaction-success");
    } catch {
      setLoading(false);
      setError("Failed to create transaction!");
      navigate("/transaction-fail");
    }
  };

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
  const getAddress = async () => {
    loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    localStorage.setItem("Address", accounts[0]);
    dispatch(isConnected(accounts[0]));
    setUserAddress(accounts[0]);
  };

  useEffect(() => {
    getAddress();
  }, []);
  useEffect(() => {}, [wallet]);

  return (
    <div className="grandpa__transaction_wrapper">
      {error && (
        <div className="d-flex justify-content-center mb-3">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {message && (
        <div className="d-flex justify-content-center mb-3">
          <Alert severity="success">{message}</Alert>
        </div>
      )}
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
            disabled
          />
          <div className="grandpa__multi_column_fields_wrapper">
            <Dropdown selected={selected} setSelected={setSelected} values={values} setValues={setValues}/>
  
            <input
              type="number"
              name="amount"
              onChange={handleOnChange}
              value={values.amount}
              placeholder={0.02}
              className="grandpa__multi_column_field"
            />
          </div>
          <Button type="submit" disabled={invalidData || loading}>
            {loading ? `Transfering...` : `Continue`}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
