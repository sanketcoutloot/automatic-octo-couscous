import { configureStore } from "@reduxjs/toolkit";
import AllRequestReducer from "../pages/AllRequersts/allRequestSlice";
import userTransactions from "../pages/UserTransaction/userTransactionSlice";
import autoPayReducer from "../pages/AutoPay/autopaySlice";
import authReducer from "../pages/Login/loginSlice";
import moneyLogsReducer from "../pages/moneyLogs/MoneyLogsSlice";

import logger from "redux-logger";
export default configureStore({
  reducer: {
    allRequests: AllRequestReducer,
    userTransactions: userTransactions,
    autoPay: autoPayReducer,
    auth: authReducer,
    moneyLogs: moneyLogsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
