import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: {},
  isLoading: false,
  isUpdating: false,
  message: "",
  status: "",
};
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    fetchSettingsPending: (state) => {
      state.isLoading = true;
    },
    fetchSettingsSuccess: (state, { payload }) => {
      state.settings = payload.data;
      state.status = payload.status;
      state.isLoading = false;
    },
    fetchSettingsFail: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
    updateSettingsPending: (state) => {
      state.isUpdating = true;
    },
    updateSettingSuccess: (state, { payload }) => {
      state.isUpdating = false;
      state.message = payload.message;
    },
    updateSettingFail: (state, { payload }) => {
      state.isUpdating = false;
      state.message = payload.message;
    },
  },
});

const { reducer, actions } = settingsSlice;

export const {
  fetchSettingsPending,
  fetchSettingsSuccess,
  fetchSettingsFail,
  updateSettingsPending,
  updateSettingSuccess,
  updateSettingFail,
} = actions;
export default reducer;
