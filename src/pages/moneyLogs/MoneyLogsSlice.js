import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/API";

const initialState = {
  moneyLogsStatus: "idle",
  moneyLogs: [],
  moneyLogsError: null,
};

export const moneyLogs = createAsyncThunk(
  "moneyLogs/getMoneyLogs",
  async (body) => {
    let { data } = await API.post(`moneyLog/getMoneyLogs`, body);
    return data;
  }
);

const moneyLogsSlice = createSlice({
  name: "moneyLogs",
  initialState,
  reducers: {},
  extraReducers: {
    [moneyLogs.pending]: (state, action) => {
      state.moneyLogsStatus = "loading";
    },
    [moneyLogs.fulfilled]: (state, action) => {
      const { success, data, errMessage } = action.payload;
      if (success === 1) {
        state.moneyLogsStatus = "succeeded";
        state.moneyLogs = state.moneyLogs.concat(data);
      } else {
        state.moneyLogsStatus = "failed";
        state.error = errMessage;
      }
    },
    [moneyLogs.rejected]: (state, action) => {
      state.moneyLogsStatus = "failed";
      state.moneyLogsError = action.payload.errMessage;
    },
  },
});

export default moneyLogsSlice.reducer;
