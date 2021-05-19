import { configureStore } from "@reduxjs/toolkit";
import user from "../pages/User/userDetailsSlice";
import authReducer from "../pages/Auth/loginSlice";

import logger from "redux-logger";
export default configureStore({
  reducer: {
    users: user,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
