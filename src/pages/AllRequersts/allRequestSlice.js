import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/API";

const initialState = {
  allRequests: [],
  status: "idle",
  error: null,
};

export const fetchAllRequests = createAsyncThunk(
  "allRequests/fetchAllRequest",
  async (pageNumber) => {
    console.log("TEST API ", API);
    console.log("ALL reQUEST DISPATCHED ");
    let { data } = await API.get(`cashout/getCashoutRequests/${pageNumber}`);
    return data;
  }
);

const allRequestsSlice = createSlice({
  name: "allRequests",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllRequests.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAllRequests.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.allRequests = data;
        state.status = "succeeded";
      } else {
        state.error = data;
        state.status = "failed";
      }
    },
    [fetchAllRequests.rejected]: (state, action) => {
      state.status = "failed";

      state.error = action.payload.data;
    },
  },
});

export default allRequestsSlice.reducer;
