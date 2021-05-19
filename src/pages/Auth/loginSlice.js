import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/API";

const initialState = {
  signupStatus: "idle",
  loginStatus: "idle",
  error: null,
  userDetails: null,
};

export const signup = createAsyncThunk("auth/signup", async (userDetails) => {
  let { data } = await axios.post(`users`, userDetails);
  return data;
});

export const login = createAsyncThunk("auth/login", async (loginDetails) => {
  let { data } = await axios.post(`login`, loginDetails);
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cleanUpAfterError: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: {
    // signup
    [signup.pending]: (state, action) => {
      state.signupStatus = "loading";
    },
    [signup.fulfilled]: (state, action) => {
      const { success, data, errMessage } = action.payload;
      if (success === 1) {
        localStorage.setItem("token", data._id);
        state.signupStatus = "succeeded";
        state.userDetails = data;
      } else {
        state.signupStatus = "failed";
        state.error = errMessage;
      }
    },
    [signup.rejected]: (state, action) => {
      state.signupStatus = "failed";
      state.error = action.payload.errMessage;
    },
    //login
    [login.pending]: (state, action) => {
      state.loginStatus = "loading";
    },
    [login.fulfilled]: (state, action) => {
      const { success, data, errMessage } = action.payload;
      if (success === 1) {
        localStorage.setItem("token", data._id);
        state.loginStatus = "succeeded";
        state.userDetails = data;
      } else {
        state.loginStatus = "failed";
        state.error = errMessage;
      }
    },
    [login.rejected]: (state, action) => {
      state.loginStatus = "failed";
      state.error = action.payload.errMessage;
    },
  },
});
export const { cleanUpAfterError } = authSlice.actions;
export default authSlice.reducer;
