import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  playerList: [],
  playerListStatus: "idle",
  error: null,
};

export const fetchPlayerList = createAsyncThunk("player/playerList", async ({ pageNo, limit }) => {
  let { data } = await axios.get(
    `https://603f26aed9528500176040ca.mockapi.io/person?p=${pageNo}&l=${limit}`
  );
  return data;
});

const playerSlice = createSlice({
  name: "playerList",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPlayerList.pending]: (state, action) => {
      state.playerListStatus = "loading";
    },
    [fetchPlayerList.fulfilled]: (state, action) => {
      state.playerList = action.payload;
      state.playerListStatus = "succeeded";
    },
    [fetchPlayerList.rejected]: (state, action) => {
      state.playerListStatus = "failed";
      state.error = action.payload;
    },
  },
});

export default playerSlice.reducer;
