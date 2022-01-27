import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  isLoading: false,
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
  },
});

const { reducer, actions } = transactionsSlice;

export const {
  fetchTransactionsPending,
  fetchTransactionsSuccess,
  fetchTransactionsFail,
} = actions;
export default reducer;
