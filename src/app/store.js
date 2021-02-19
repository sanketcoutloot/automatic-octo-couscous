import { configureStore } from "@reduxjs/toolkit";
import AllRequestReducer from "../pages/AllRequersts/allRequestSlice";
import userTransactions from "../pages/UserTransaction/userTransactionSlice";
import autoPayReducer from "../pages/AutoPay/autopaySlice";
export default configureStore({
  reducer: {
    allRequests: AllRequestReducer,
    userTransactions: userTransactions,
    autoPay: autoPayReducer,
  },
});
