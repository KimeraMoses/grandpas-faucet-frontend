import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import transactionReducer from "./Slices/transactionsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
  },
});

export default store;

