import { configureStore } from "@reduxjs/toolkit";
import AllRequestReducer from "../pages/AllRequersts/allRequestSlice";
import userTransactions from "../pages/UserTransaction/userTransactionSlice";
export default configureStore({
  reducer: {
    allRequests: AllRequestReducer,
    userTransactions: userTransactions,
  },
});
