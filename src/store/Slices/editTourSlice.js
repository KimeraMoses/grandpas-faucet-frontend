import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    status: '',
    message: '',
  };
  const editTourSlice = createSlice({
    name: "editTour",
    initialState,
    reducers: {
      EditTourPending: (state) => {
        state.isLoading = true;
      },
      EditTourSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.message=payload.message;
      },
      EditTourFail: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.message =payload.message;
      },
      
    },
  });
  
  const { reducer, actions } = editTourSlice;
  
  export const { EditTourPending, EditTourSuccess, EditTourFail } = actions;
  export default reducer;