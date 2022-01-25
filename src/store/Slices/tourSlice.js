import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tourDetails: {},
  isLoading: false,
  isBooking: false,
  isReviewing: false,
  ReviewStatus: "",
  message: "",
  error: "",
};
const tourSlice = createSlice({
  name: "tourDetails",
  initialState,
  reducers: {
    fetchTourPending: (state) => {
      state.isLoading = true;
    },
    fetchTourSuccess: (state, action) => {
      state.tourDetails = action.payload;
      state.isLoading = false;
    },
    fetchTourFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    bookTourPending: (state, { payload }) => {
      state.isBooking = true;
    },
    bookTourSuccess: (state, { payload }) => {
      state.isBooking = false;
      state.message = payload;
    },
    bookTourFail: (state, { payload }) => {
      state.isBooking = false;
      state.message = payload;
    },
    reviewTourPending: (state, { payload }) => {
      state.isReviewing = true;
    },
    reviewTourSuccess: (state, { payload }) => {
      state.isReviewing = false;
      state.ReviewStatus = payload;
    },
    reviewTourFail: (state, { payload }) => {
      state.isReviewing = false;
      state.ReviewStatus = payload;
    },
  },
});

const { reducer, actions } = tourSlice;

export const {
  fetchTourPending,
  fetchTourSuccess,
  fetchTourFail,
  bookTourPending,
  bookTourSuccess,
  bookTourFail,
  reviewTourPending,
  reviewTourSuccess,
  reviewTourFail
} = actions;
export default reducer;
