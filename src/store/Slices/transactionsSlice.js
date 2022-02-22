import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  transactionsList: [],
  faucets: [],
  isLoading: false,
  fetching: false,
  message: "",
  status: "",
};
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    fetchTransactionsPending: (state) => {
      state.isLoading = true;
    },
    fetchTransactionsSuccess: (state, { payload }) => {
      state.transactions = payload;
      state.status = payload.status;
      state.isLoading = false;
    },
    fetchTransactionsFail: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
    fetchAllTransactionsPending: (state) => {
      state.isLoading = true;
    },
    fetchAllTransactionsSuccess: (state, { payload }) => {
      state.transactionsList = payload;
      state.status = payload.status;
      state.isLoading = false;
    },
    fetchAllTransactionsFail: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
    fetchFaucetPending: (state) => {
      state.fetching = true;
    },
    fetchFaucetsSuccess: (state, { payload }) => {
      state.faucets = payload;
      state.status = payload.status;
      state.fetching = false;
    },
    fetchFaucetsFail: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.fetching = false;
    },
  },
});

const { reducer, actions } = transactionsSlice;

export const {
  fetchTransactionsPending,
  fetchTransactionsSuccess,
  fetchTransactionsFail,
  fetchAllTransactionsPending,
  fetchAllTransactionsSuccess,
  fetchAllTransactionsFail,
  fetchFaucetPending,
  fetchFaucetsSuccess,
  fetchFaucetsFail
} = actions;
export default reducer;
