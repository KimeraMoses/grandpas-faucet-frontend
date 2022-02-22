import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import transactionReducer from "./Slices/transactionsSlice";
import settingReducer from "./Slices/settingsSlice";
import tokenReducer from "./Slices/tokensSlice";
import blackListReducer from "./Slices/blackListSlice";
import walletReducer from "./Slices/walletSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    settings: settingReducer,
    tokens: tokenReducer,
    blackList: blackListReducer,
    wallet: walletReducer,

  },
});

export default store;

