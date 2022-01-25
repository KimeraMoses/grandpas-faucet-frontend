import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};

export const passwordSlice = createSlice({
  initialState,
  name: "passwordSlice",
  reducers: {
    UpdatePasswordPending(state) {
      state.isLoading = true;
    },
    UpdatePasswordSuccess(state, { payload }) {
      state.isLoading = false;
      state.message = payload.massage;
      state.status = payload.status;
    },
    UpdatePasswordFail(state) {
      state.isLoading = false;
    },
    forgotPasswordPending(state) {
      state.isLoading = true;
    },
    forgotPasswordSuccess(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message
      state.status = payload.status
    },
    forgotPasswordFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
    requestVerificationPending(state) {
      state.isLoading = true;
    },
    requestVerificationSuccess(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message
      state.status = payload.status
    },
    requestVerificationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
  },
});
const { reducer, actions } = passwordSlice;

export const {
  UpdatePasswordPending,
  UpdatePasswordSuccess,
  UpdatePasswordFail,
  forgotPasswordPending,
  forgotPasswordSuccess,
  forgotPasswordFail,
  requestVerificationPending,
  requestVerificationSuccess,
  requestVerificationFail,
} = actions;

export default reducer;
