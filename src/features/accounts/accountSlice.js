import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  purposeOfLoan: "",
  isLoding: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  redures: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      if (state.balance - action.payload < 0) return;
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      if (state.loan > 0) return;

      state.loa += action.payload.ammount;
      state.loan = action.payload.ammount;
      state.purposeOfLoan = action.payload.purpose;
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
    },
  },
});
console.log(accountSlice);

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

/*
export default function accountReducer(state = initialState, action) {
  const def = state.balance - action.payload;
  console.log(action);
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoding: false,
      };

    case "account/withdraw":
      if (def < 0) return state;
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      ///LATER
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.ammount,
        purposeOfLoan: action.payload.purpose,
        balance: state.balance + action.payload.ammount,
      };

    case "account/payLoan":
      return { ...state, loan: 0, balance: state.balance - state.loan };

    case "account/convertingCurrency":
      return { ...state, isLoding: true };

    default:
      return state;
  }
}

export function deposit(ammount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: ammount };

  // API call
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${ammount}&from=${currency}&to=USD`
    );
    const data = await res.json();

    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(ammount) {
  return { type: "account/withdraw", payload: ammount };
}

export function requestLoan(ammount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { ammount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
*/
