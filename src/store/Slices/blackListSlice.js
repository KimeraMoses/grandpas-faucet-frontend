import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blackList: [],
  blackListSettings: [],
  isLoading: false,
  fetching: false,
  message: "",
  status: "",
};
const blackListSlice = createSlice({
  name: "blacklist",
  initialState,
  reducers: {
    fetchBlackListPending: (state) => {
      state.fetching = true;
    },
    fetchBlackListSuccess: (state, { payload }) => {
      state.blackList = payload.data;
      state.status = payload;
      state.fetching = false;
    },
    fetchBlackListFail: (state, { payload }) => {
      state.message = payload;
      state.status = payload;
      state.fetching = false;
    },
    fetchBlackListSettingsPending: (state) => {
      state.fetching = true;
    },
    fetchBlackListSettingsSuccess: (state, { payload }) => {
      state.blackListSettings = payload.data;
      state.status = payload;
      state.fetching = false;
    },
    fetchBlackListSettingsFail: (state, { payload }) => {
      state.message = payload;
      state.status = payload;
      state.fetching = false;
    },
    createBlackListPending: (state) => {
      state.isLoading = true;
    },
    createBlackListSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    createBlackListFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    deleteBlackListPending: (state) => {
      state.isLoading = true;
    },
    deleteBlackListSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    deleteBlackListFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    editBlackListSettingPending: (state) => {
      state.isLoading = true;
    },
    editBlackListSettingSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    editBlackListSettingFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
  },
});

const { reducer, actions } = blackListSlice;

export const {
  fetchBlackListPending,
  fetchBlackListSuccess,
  fetchBlackListFail,
  createBlackListPending,
  createBlackListSuccess,
  createBlackListFail,
  deleteBlackListPending,
  deleteBlackListSuccess,
  deleteBlackListFail,
  fetchBlackListSettingsPending,
  fetchBlackListSettingsSuccess,
  fetchBlackListSettingsFail,
  editBlackListSettingPending,
  editBlackListSettingSuccess,
  editBlackListSettingFail,
} = actions;
export default reducer;
