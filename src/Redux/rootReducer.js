import { combineReducers } from "@reduxjs/toolkit";
import campusGroupReducer from "./features/campusGroup/campusGroupSlice";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/utils/modalSlice";

const appReducer = combineReducers({
  campusGroup: campusGroupReducer,
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
