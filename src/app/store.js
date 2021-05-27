import { configureStore } from "@reduxjs/toolkit";
import user from "../pages/User/userDetailsSlice";
import authReducer from "../pages/Auth/loginSlice";
import player from "../pages/User/playerListSlice";
import logger from "redux-logger";
export default configureStore({
  reducer: {
    users: user,
    auth: authReducer,
    player: player,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
