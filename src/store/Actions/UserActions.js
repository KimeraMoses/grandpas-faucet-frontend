import {
  fetchUsersLoading,
  fetchUsersSuccess,
  fetchUsersFail,
  fetchUserpending,
  fetchUserSuccess,
  fetchUserFail,
} from "../Slices/userSlice";

import { baseUrl } from "..";

export const fetchUsers = (AuthToken) => {
  return async (dispatch) => {
    dispatch(fetchUsersLoading());
    try {
      const response = await fetch(`${baseUrl}/api/v1/users/`, {
        method: "GET",
        headers: new Headers({
          "Content-type": "application/json",
          Authorization: "Bearer " + AuthToken,
        }),
    });
    const data = await response.json();

      dispatch(fetchUsersSuccess(data));
    } catch(error) {
        dispatch(fetchUsersFail(error));
    }
  };
};

export const fetchUserDetails = (uni_id) => async (dispatch) => {
  dispatch(fetchUserpending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/users/${uni_id}`);
    const fetchedUser = await response.json();
      dispatch(fetchUserSuccess(fetchedUser));
  } catch (error) {
    dispatch(fetchUserFail(error.message));
  }
};
