import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: "Please check your email for the OTP",

};
const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    requestOtpPending: (state) => {
      state.isLoading = true;
    },
    requestOtpSuccess: (state, { payload }) => {
      state.message = payload;
      state.isLoading = false;
    },
    requestOtpFail: (state, { payload }) => {
      state.message = payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = otpSlice;

export const {
  requestOtpPending,
  requestOtpSuccess,
  requestOtpFail,
} = actions;
export default reducer;
