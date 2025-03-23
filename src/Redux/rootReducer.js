import { combineReducers } from "@reduxjs/toolkit";
import campusReducer from "./features/campus/campusSlice";
import authReducer from "./features/auth/authSlice";

const appReducer = combineReducers({
  campus: campusReducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
