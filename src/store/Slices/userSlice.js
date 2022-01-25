import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  userDetails: {},
  isLoading: false,
  message: "",
  status: ""
};
const userSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    fetchUsersLoading: (state) => {
      state.isLoading = true;
    },
    fetchUsersSuccess: (state, { payload }) => {
      state.userList = payload.users;
      state.status = payload.status;
      state.isLoading = false;

    },
    fetchUsersFail: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
    fetchUserpending: (state) => {
      state.isLoading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.userDetails = action.payload;
      state.isLoading = false;
      state.message = '';
    },
    fetchUserFail: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = userSlice;

export const {
  fetchUsersLoading,
  fetchUsersSuccess,
  fetchUsersFail,
  fetchUserpending,
  fetchUserSuccess,
  fetchUserFail,
} = actions;
export default reducer;
