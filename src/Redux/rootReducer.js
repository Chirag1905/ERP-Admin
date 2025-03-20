// reducers.js
import { combineReducers } from '@reduxjs/toolkit';
import campusReducer from './campusSlice'; // Import the slice reducer

const appReducer = combineReducers({
  admin: campusReducer,
});

const rootReducer = (state, action) => {
  if (action.type) {
    localStorage.removeItem('persist:root');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;