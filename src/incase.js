//store.js
import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import costumerReducer from "./features/customers/customerSlice";
const rootReducer = combineReducers({
  account: accountReducer,
  customer: costumerReducer,
});

const store = createStore(rootReducer);

export default store;

//store-v1.js
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  purposeOfLoan: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
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

    case "account/payloan":
      return { ...state, loan: 0, balance: state.balance - state.loan };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateCustomer":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
store.dispatch(deposit(500));

store.dispatch(withdraw(300));

store.dispatch(requestLoan(1000, "to buy a car"));

// store.dispatch(payLoan());

function deposit(ammount) {
  return { type: "account/deposit", payload: ammount };
}

function withdraw(ammount) {
  return { type: "account/withdraw", payload: ammount };
}

function requestLoan(ammount, purpose) {
  return {
    type: "account/deposit",
    payload: { ammount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Slimane Latreche", "29401200359"));
console.log(store.getState());
