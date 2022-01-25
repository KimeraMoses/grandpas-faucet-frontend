import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countryList: [],
  isLoading: false,
  error: "",
};
const countrySlice = createSlice({
  name: "countryList",
  initialState,
  reducers: {
    fetchCountriesPending: (state) => {
      state.isLoading = true;
    },
    fetchCountriesSuccess: (state, action) => {
      state.countryList = action.payload;
      state.isLoading = false;
    },
    fetchCountriesFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = countrySlice;

export const {
  fetchCountriesPending,
  fetchCountriesSuccess,
  fetchCountriesFail
} = actions;
export default reducer;
