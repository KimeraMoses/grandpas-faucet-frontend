import { baseUrl } from "..";
import {
  fetchTransactionsFail,
  fetchTransactionsPending,
  fetchTransactionsSuccess,
} from "../Slices/transactionsSlice";

export const fetchTransactions =
  (AuthToken, apiToken) => async (dispatch) => {
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
      console.log("Trans", fetchedTransactions.data);
        dispatch(fetchTransactionsSuccess(fetchedTransactions.data));
    } catch (error) {
        dispatch(fetchTransactionsFail(error.message));
      console.log(error);
    }
  };
