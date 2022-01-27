import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  wallet: {},
  token: null,
  apiToken: null,
  isLoggedIn: false,
  status: "",
  message: null,
  error: null,
  updateStatus: "",
  isLoading: false,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    autoAuthenticationSuccess(state, {payload}) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    authenticationPending(state) {
      state.isLoading = true;
    },
    authenticationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.apiToken = payload.apiToken;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    authenticationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
    },
    verificationPending(state) {
      state.isLoading = true;
    },
    verificationSuccess(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    verificationFail(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
      state.status=payload.status
    },
    createWalletPending(state) {
      state.isLoading = true;
    },
    createWalletSuccess(state, { payload }) {
      state.wallet = payload;
      state.isLoading = false;
    },
    createWalletFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status=payload.status
    },
    logout(state) {
      state.user = {};
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("AuthToken");
      localStorage.removeItem("CurrentUser");
    },
  },
});
const { reducer, actions } = authSlice;

export const {
  autoAuthenticationSuccess,
  authenticationPending,
  authenticationSuccess,
  authenticationFail,
  verificationPending,
  verificationSuccess,
  verificationFail,
  createWalletPending,
  createWalletSuccess,
  createWalletFail,
  logout,
} = actions;

export default reducer;
