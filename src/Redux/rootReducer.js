import { combineReducers } from "@reduxjs/toolkit";
import campusReducer from "./features/campus/campusSlice";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/utils/modalSlice";

const appReducer = combineReducers({
  campus: campusReducer,
  auth: authReducer,
  modal: modalReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
