import React from "react";
import "./Transaction.css";
import Button from "../../Button/Button";

const Transaction = (props) => {
  return (
    <div className="grandpa__transaction_wrapper">
      <h4>Transaction</h4>
      <p>
        Please select the type of token and amount in order to cotinue with the
        transaction.
      </p>
      <div className="grandpa__transaction_form_wrapper">
        <form>
          <input
            type="text"
            placeholder="Mse28M9UQJAZGSSHSXzbFXZKPg1C"
            className="grandpa__input_field"
          />
          <div className="grandpa__multi_column_fields_wrapper">
            <select className="grandpa__multi_column_field">
                <option>BNB</option>
                <option>BNB</option>
                <option>BNB</option>
            </select>
            <input
              type="number"
              value={0.02}
              placeholder="Mse28M9UQJAZGSSHSXzbFXZKPg1C"
              className="grandpa__multi_column_field"
            />
          </div>
          <Button>Continue</Button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
