import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import costumerReducer from "./features/customers/customerSlice";

const store = configureStore({
  account: accountReducer,
  costumer: costumerReducer,
});

export default store;
