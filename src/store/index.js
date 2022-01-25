import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../store/Slices/uiSlice";
import userReducer from "../store/Slices/userSlice";
import userRegistrationReducer from "../store/Slices/userRegistrationSlice";
import authReducer from "./Slices/authSlice";
import passwordReducer from "./Slices/passwordSlice";
import newTourReducer from "./Slices/newTourSlice";
import tourReducer from "./Slices/tourSlice";
import countrySlice from "./Slices/countrySlice";
import toursReducer from "./Slices/toursSlice";
import editTourReducer from "./Slices/editTourSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    password: passwordReducer,
    users: userReducer,
    registration: userRegistrationReducer,
    tours: toursReducer,
    tour: tourReducer,
    newTour: newTourReducer,
    editTour: editTourReducer,
    countries: countrySlice,
  },
});

export default store;
export const baseUrl = "https://upw-api-routes.herokuapp.com";
