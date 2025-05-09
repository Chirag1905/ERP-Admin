import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/utils/modalSlice";
import academicYearReducer from "./features/academicYear/academicYearSlice";

const appReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  academicYear: academicYearReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;