import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/API";

const initialState = {
  userDetails: [],
  userDetailsStatus: "idle",
  error: null,
};

export const fetchUserDetails = createAsyncThunk("user/userDetails", async (id) => {
  let { data } = await API.get(`users/${id}`);
  return data;
});

const allRequestsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserDetails.pending]: (state, action) => {
      state.userDetailsStatus = "loading";
    },
    [fetchUserDetails.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.userDetails = data;
        state.userDetailsStatus = "succeeded";
      } else {
        state.error = data;
        state.userDetailsStatus = "failed";
      }
    },
    [fetchUserDetails.rejected]: (state, action) => {
      state.userDetailsStatus = "failed";
      state.error = action.payload;
    },
  },
});

export default allRequestsSlice.reducer;
