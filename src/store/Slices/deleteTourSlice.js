import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};
const deleteTourSlice = createSlice({
  name: "deleteTour",
  initialState,
  reducers: {
    deleteTourPending: (state) => {
      state.isLoading = true;
    },
    deleteTourSuccess: (state, {payload}) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
    deleteTourFail: (state, { payload }) => {
      state.status = payload.status;
      state.message = payload.message;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = deleteTourSlice;

export const { deleteTourPending, deleteTourSuccess, deleteTourFail } =
  actions;
export default reducer;
