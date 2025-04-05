import { combineReducers } from "@reduxjs/toolkit";
import campusReducer from "./features/campus/campusSlice";
import campusGroupReducer from "./features/campusGroup/campusGroupSlice";
import academicYearReducer from "./features/academicYear/academicYearSlice";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/utils/modalSlice";

const appReducer = combineReducers({
  campus: campusReducer,
  campusGroup: campusGroupReducer,
  academicYear: academicYearReducer,
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