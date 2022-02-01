import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: "",
  status: "",
};
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    createTransactionPending: (state) => {
      state.isLoading = true;
    },
    createTransactionSuccess: (state, { payload }) => {
      state.transactions = payload;
      state.status = payload.status;
      state.isLoading = false;
    },
    createTransactionFail: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = transactionSlice;

export const {
  createTransactionPending,
  createTransactionSuccess,
  createTransactionFail,
} = actions;
export default reducer;
