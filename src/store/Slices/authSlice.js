import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  wallet: {},
  hasWallet: false,
  token: null,
  apiToken: null,
  isLoggedIn: false,
  status: "",
  message: null,
  error: null,
  updateStatus: "",
  isLoading: false,
  isAuth : false,
  address: "",
  hasAddress: false,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    autoAuthenticationSuccess(state, {payload}) {
      state.user = payload.user;
      state.token = payload.token;
      state.apiToken = payload.apiToken;
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
      state.hasWallet = true;
    },
    createWalletFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status=payload.status
    },
    isAuthenticated(state){
      state.isAuth = true;
    },
    isConnected(state,{payload}){
      state.address = payload
      state.hasAddress = !!payload
    },
    logout(state) {
      state.user = {};
      state.token = null;
      state.apiToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem("Grand__isVerified")
      localStorage.removeItem("Grand__AuthToken");
      localStorage.removeItem("Grand__CurrentUser");
      localStorage.removeItem("Grand__Settings");
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
  isAuthenticated,
  isConnected,
  logout,
} = actions;

export default reducer;
