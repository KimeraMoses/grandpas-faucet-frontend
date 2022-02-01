import { apiKey, baseUrl } from "..";
import {
  createTransactionFail,
  createTransactionPending,
  createTransactionSuccess,
} from "../Slices/transactionSlice";
import {
  fetchFaucetPending,
  fetchFaucetsFail,
  fetchFaucetsSuccess,
  fetchTransactionsFail,
  fetchTransactionsPending,
  fetchTransactionsSuccess,
} from "../Slices/transactionsSlice";

export const fetchTransactions = (AuthToken, apiToken) => async (dispatch) => {
  dispatch(fetchTransactionsPending());
  try {
    const response = await fetch(`${baseUrl}/transaction/list/5`, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        apiKey: "asdfasdfasdfasdfasfasfasdf",
        apiToken: apiToken,
        Authorization: "Bearer " + AuthToken,
      }),
    });
    const fetchedTransactions = await response.json();
    dispatch(fetchTransactionsSuccess(fetchedTransactions.data));
  } catch (error) {
    dispatch(fetchTransactionsFail(error.message));
  }
};

export const fetchFaucets = (AuthToken, apiToken) => async (dispatch) => {
  dispatch(fetchFaucetPending());
  try {
    const response = await fetch(`${baseUrl}/token/enabled`, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        apiKey: apiKey,
        apiToken: apiToken,
        Authorization: "Bearer " + AuthToken,
      }),
    });
    const faucets = await response.json();
    dispatch(fetchFaucetsSuccess(faucets.data));
  } catch (error) {
    dispatch(fetchFaucetsFail(error.message));
  }
};

export const CreateTransaction = (
  wallet_uuid,
  amount,
  token_uuid,
  apiToken,
  AuthToken
) => {
  return async (dispatch) => {
    dispatch(createTransactionPending());
    console.log("From create transaction",wallet_uuid,
    amount,
    token_uuid,)
    const response = await fetch(`${baseUrl}/transaction/`, {
      method: "POST",
      body: JSON.stringify({
        wallet_uuid,
        amount,
        token_uuid,
      }),
      headers: new Headers({
        "Content-type": "application/json",
        apiKey: apiKey,
        apiToken: apiToken,
        Authorization: "Bearer " + AuthToken,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(createTransactionFail(error));
      // console.log(error);
    }
    const res = await response.json();
    // console.log(res);
    dispatch(createTransactionSuccess(res.data));
  };
};
