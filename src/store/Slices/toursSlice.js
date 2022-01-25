import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toursList: [],
  countryTours: [],
  isLoading: false,
  error: "",
};
const toursSlice = createSlice({
  name: "toursList",
  initialState,
  reducers: {
    fetchToursPending: (state) => {
      state.isLoading = true;
    },
    fetchToursSuccess: (state, action) => {
      state.toursList = action.payload;
      state.isLoading = false;
    },
    fetchToursFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    fetchCountryToursPending: (state) => {
      state.isLoading = true;
    },
    fetchCountryToursSuccess: (state, action) => {
      state.countryTours = action.payload;
      state.isLoading = false;
    },
    fetchCountryToursFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = toursSlice;

export const {
  fetchToursPending,
  fetchToursSuccess,
  fetchToursFail,
  fetchCountryToursPending,
  fetchCountryToursSuccess,
  fetchCountryToursFail,
} = actions;
export default reducer;
