import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import { USER_LOGOUT } from "./actions";
const appReducer = combineReducers({
  admin: adminReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    localStorage.removeItem("persist:root");    
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
