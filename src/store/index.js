import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../store/Slices/userSlice";
import userRegistrationReducer from "../store/Slices/userRegistrationSlice";
import authReducer from "./Slices/authSlice";
import transactionReducer from "./Slices/transactionsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    transactions: transactionReducer,
    registration: userRegistrationReducer,
  },
});

export default store;
export const baseUrl = "https://upw-api-routes.herokuapp.com";
