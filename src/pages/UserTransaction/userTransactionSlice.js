import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/API";

const initialState = {
  cashoutRequests: [],
  cashoutRequestsStatus: "idle",
  cashoutRequestsError: null,

  moneyLogs: [],
  moneyLogsStatus: "idle",
  moneyLogsError: null,

  bankAccounts: [],
  bankAccountsStatus: "idle",
  bankAccountsError: null,

  currentCashoutRequest: {},
  currentCashoutStatus: "idle",
  currentCashoutError: null,

  currentCashoutBankDetails: {},

  bankDetailToEdit: {},
  bankDetailsToEditIndex: null,

  bankVerificationRequest: {},
  bankVerificationStatus: "idle",
  bankVerificationError: null,

  markCashoutRequestCompleteStatus: "idle",
  markCashoutRequestCompleteError: null,

  updateBankDetailStatus: "idle",
  updatedBankDetails: [],
  updateBankDetailError: null,
};

export const fetchCashoutRequests = createAsyncThunk(
  "user/fetchCashoutRequests",
  async (userId) => {
    const { data } = await API.post(`cashout/getUserCashoutRequests`, {
      userId,
      pageNo: 0,
    });
    return data;
  }
);

export const fetchMoneyLogs = createAsyncThunk(
  "user/fetchMoneyLogs",
  async (userId, pageNumber = 0) => {
    const { data } = await API.post(`moneyLog/getMoneyLogs`, {
      searchText: userId,
      searchType: "USERID",
      pageNo: pageNumber,
    });
    return data;
  }
);

export const fetchBankAccounts = createAsyncThunk(
  "user/fetchBankAccounts",
  async (userId) => {
    const { data } = await API.get(`/bank/getUserBanks/${userId}`);
    return data;
  }
);

export const fetchCurrentCashoutRequest = createAsyncThunk(
  "user/fetchCurrentCashoutRequest",
  async (userId) => {
    const { data } = await API.post(`cashout/getUserCurrentRequest`, {
      userId,
    });
    return data;
  }
);

export const markCashoutRequestComplete = createAsyncThunk(
  "user/markCashoutRequestComplete",
  async (body) => {
    const { data } = await API.post(`cashout/markComplete`, body);
    return data;
  }
);

export const verifyBankDetails = createAsyncThunk(
  "user/verifyBankDetails",
  async (bankDetails) => {
    const { data } = await API.post(
      `paytm/bankAccountVerification`,
      bankDetails
    );
    return data;
  }
);

export const updateBankDetail = createAsyncThunk(
  "bank/editBankDetails",
  async (bankDetails) => {
    const { data } = await API.post(`bank/editBankDetails`, bankDetails);
    return data;
  }
);

const userTransactionsSlice = createSlice({
  name: "userTransactions",
  initialState,
  reducers: {
    setUserTransactionToInitialSlice: (state) => {
      state.markCashoutRequestCompleteStatus = "idle";
    },
    editModalCleanUp: (state) => {
      state.updateBankDetailStatus = "idle";
      state.updatedBankDetails = [];
      state.updateBankDetailError = null;
      state.bankDetailToEdit = {};
      state.bankDetailsToEditIndex = null;
    },
    addBankDetailToEdit: (state, action) => {
      //this dispatch help to set the
      const {
        editCurrentRequestBankDetails,
        index,
        bankDetails,
      } = action.payload;
      if (editCurrentRequestBankDetails === true) {
        state.bankDetailToEdit = state.currentCashoutBankDetails;
      }
      if (editCurrentRequestBankDetails === false) {
        state.bankDetailToEdit = bankDetails;
        state.bankDetailsToEditIndex = index;
      }
      //use index value to edit bank detail for the bank details list
    },
  },
  extraReducers: {
    // cashout request reducers
    [fetchCashoutRequests.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCashoutRequests.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.cashoutRequestsStatus = "succeeded";
        state.cashoutRequests = state.cashoutRequests.concat(data);
      } else {
        state.cashoutRequestsStatus = "failed";
        state.cashoutRequestsError = action.payload.errMessage;
      }
    },
    [fetchCashoutRequests.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },

    // ++++ money log reducers
    [fetchMoneyLogs.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchMoneyLogs.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.status = "succeeded";
        let resData = data;
        if (!Array.isArray(resData)) {
          resData = [resData];
        }
        state.moneyLogs = state.moneyLogs.concat(resData);
      } else {
        state.moneyLogsStatus = "failed";
        state.moneyLogsError = action.payload.errMessage;
      }
    },
    [fetchMoneyLogs.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },

    // BANK DETAILS
    [fetchBankAccounts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchBankAccounts.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.status = "succeeded";
        let resData = data;
        if (!Array.isArray(resData)) {
          resData = [resData];
        }
        state.bankAccounts = resData;
      } else {
        state.bankAccountsStatus = "failed";
        state.bankAccountsError = action.payload.errMessage;
      }
    },
    [fetchBankAccounts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },

    // Current CashOut request
    [fetchCurrentCashoutRequest.pending]: (state, action) => {
      state.currentCashoutStatus = "loading";
    },
    [fetchCurrentCashoutRequest.fulfilled]: (state, action) => {
      const { success, data, errMessage } = action.payload;
      console.log("user's current cashout request ", action.payload);
      if (success === 1) {
        state.currentCashoutStatus = "succeeded";
        state.currentCashoutRequest = { ...data };
        state.currentCashoutBankDetails = data.requestData;
      } else {
        state.currentCashoutStatus = "failed";
        state.currentCashoutError = errMessage;
      }
    },
    [fetchCurrentCashoutRequest.rejected]: (state, action) => {
      const { errMessage } = action.payload;
      state.currentCashoutStatus = "failed";
      state.currentCashoutError = errMessage;
    },

    //edit /Update bank Details
    [updateBankDetail.pending]: (state, action) => {
      state.updateBankDetailStatus = "loading";
    },
    [updateBankDetail.fulfilled]: (state, action) => {
      const { success, data, errMessage } = action.payload;
      if (success === 1) {
        const {
          accountHolderName,
          accountNumber,
          accountType,
          bankName,
          ifscCode,
          accountId,
        } = data[0];

        if (state.bankDetailsToEditIndex !== null) {
          state.bankAccounts = state.bankAccounts.map((item, index) => {
            if (index === parseInt(state.bankDetailsToEditIndex)) {
              return (state.bankAccounts[index] = {
                accountHolderName,
                accountNumber,
                accountType,
                bankName,
                ifscCode,
                accountId,
              });
            }
            return item;
          });
        } else {
          state.currentCashoutBankDetails = {
            accountHolderName,
            accountNumber,
            accountType,
            bankName,
            ifscCode,
            accountId,
          };
        }
        state.updateBankDetailStatus = "succeeded";
      } else {
        state.updateBankDetailStatus = "failed";
        state.updateBankDetailError = errMessage;
      }
    },
    [updateBankDetail.rejected]: (state, action) => {
      const { errMessage } = action.payload;
      state.updateBankDetail = "failed";
      state.currentCashoutError = errMessage;
    },

    //mark as complete
    [markCashoutRequestComplete.pending]: (state, action) => {
      state.status = "loading";
    },
    [markCashoutRequestComplete.fulfilled]: (state, action) => {
      const { success, data, errMessage } = action.payload;
      if (success === 1) {
        state.markCashoutRequestCompleteStatus = "succeeded";
      } else {
        state.markCashoutRequestCompleteStatus = "failed";
        state.markCashoutRequestCompleteError = errMessage;
      }
    },
    [markCashoutRequestComplete.rejected]: (state, action) => {
      state.markCashoutRequestCompleteStatus = "failed";
      state.markCashoutRequestCompleteError = action.payload.data;
    },

    //Bank verification
    [verifyBankDetails.pending]: (state, action) => {
      state.bankAccountsStatus = "loading";
    },
    [verifyBankDetails.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.bankAccountsStatus = "succeeded";
      } else {
        state.bankVerificationError = data;
      }
    },
    [verifyBankDetails.rejected]: (state, action) => {
      state.bankAccountsStatus = "failed";
      state.bankVerificationError = action.payload.data;
    },
  },
});

export const {
  setUserTransactionToInitialSlice,
  editModalCleanUp,
  addBankDetailToEdit,
} = userTransactionsSlice.actions;

export default userTransactionsSlice.reducer;
