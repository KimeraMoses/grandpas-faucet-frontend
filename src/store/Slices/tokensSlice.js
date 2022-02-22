import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokens: [],
  isLoading: false,
  fetching: false,
  message: "",
  status: "",
};
const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    fetchTokensPending: (state) => {
      state.fetching = true;
    },
    fetchTokensSuccess: (state, { payload }) => {
      state.tokens = payload.data;
      state.status = payload.status;
      state.fetching = false;
    },
    fetchTokensFail: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.fetching = false;
    },
    deleteTokenPending: (state) => {
      state.isLoading = true;
    },
    deleteTokenSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
    },
    deleteTokenFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
    },
    editTokenPending: (state) => {
      state.isLoading = true;
    },
    editTokenSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    editTokenFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
  },
});

const { reducer, actions } = tokensSlice;

export const {
  fetchTokensPending,
  fetchTokensSuccess,
  fetchTokensFail,
  deleteTokenPending,
  deleteTokenSuccess,
  deleteTokenFail,
  editTokenPending,
  editTokenSuccess,
  editTokenFail,
} = actions;
export default reducer;
