import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  days: [],
  isLoading: false,
  status: "",
  message: "",
};
const newTourSlice = createSlice({
  name: "newTour",
  initialState,
  reducers: {
    NewTourPending: (state) => {
      state.isLoading = true;
    },
    NewTourSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    NewTourFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    AddDays:(state, {payload})=>{
      state.days.push(payload)
    },
    DeleteDay:(state, {payload})=>{
      state.days.filter((item, index)=>payload !== index)
    }
  },
});

const { reducer, actions } = newTourSlice;

export const { NewTourPending, NewTourSuccess, NewTourFail,AddDays,DeleteDay } = actions;
export default reducer;
