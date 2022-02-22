import {
  createTransactionFail,
  createTransactionPending,
  createTransactionSuccess,
} from "../Slices/transactionSlice";
import {
  fetchAllTransactionsFail,
  fetchAllTransactionsPending,
  fetchAllTransactionsSuccess,
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
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/transaction/list/5`,
      {
        method: "GET",
        headers: new Headers({
          "Content-type": "application/json",
          apiKey: process.env.REACT_APP_APIKEY,
          apiToken: apiToken,
          Authorization: "Bearer " + AuthToken,
        }),
      }
    );
    const fetchedTransactions = await response.json();
    dispatch(fetchTransactionsSuccess(fetchedTransactions.data));
  } catch (error) {
    dispatch(fetchTransactionsFail(error.message));
  }
};
export const fetchAllTransactions =
  (AuthToken, apiToken) => async (dispatch) => {
    dispatch(fetchAllTransactionsPending());
    if (AuthToken && apiToken) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/transaction`,
          {
            method: "GET",
            headers: new Headers({
              "Content-type": "application/json",
              apiKey: process.env.REACT_APP_APIKEY,
              apiToken: apiToken,
              token: AuthToken,
              Authorization: "Bearer " + AuthToken,
            }),
          }
        );
        const fetchedTransactions = await response.json();
        dispatch(fetchAllTransactionsSuccess(fetchedTransactions.data));
      } catch (error) {
        dispatch(fetchAllTransactionsFail(error));
      }
    }else{
      return
    }
  };

export const fetchFaucets = (AuthToken, apiToken) => async (dispatch) => {
  dispatch(fetchFaucetPending());
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/token/enabled`,
      {
        method: "GET",
        headers: new Headers({
          "Content-type": "application/json",
          apiKey: process.env.REACT_APP_APIKEY,
          apiToken: apiToken,
          Authorization: "Bearer " + AuthToken,
        }),
      }
    );
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
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/transaction/`,
      {
        method: "POST",
        body: JSON.stringify({
          wallet_uuid,
          amount,
          token_uuid,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          apiKey: process.env.REACT_APP_APIKEY,
          apiToken: apiToken,
          Authorization: "Bearer " + AuthToken,
        }),
      }
    );

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
