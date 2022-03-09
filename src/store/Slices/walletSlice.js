import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Wallet: [],
  isLoading: false,
  fetching: false,
  message: "",
  status: "",
};
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    fetchWalletPending: (state) => {
      state.isLoading = true;
    },
    fetchWalletSuccess: (state, { payload }) => {
      state.Wallet = payload.data;
      state.status = payload.status;
      state.isLoading = false;
    },
    fetchWalletFail: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = walletSlice;

export const { fetchWalletPending, fetchWalletSuccess, fetchWalletFail } =
  actions;
export default reducer;
