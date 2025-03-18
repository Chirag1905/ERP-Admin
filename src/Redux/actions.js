// actions.js
import { createSlice } from "@reduxjs/toolkit";

const campusSlice = createSlice({
  name: "campus",
  initialState: {
    campusData: [],
    loginData: [],
    campusGroups: [],
    loading: false,
    error: null,
  },
  reducers: {
    requestLogin: (state) => {
      state.loading = true;
      state.error = null;
    },
    requestGetCampus: (state) => {
      state.loading = true;
      state.error = null;
    },
    requestPostCampus: (state) => {
      state.loading = true;
      state.error = null;
    },
    requestCampusGroups: (state) => {
      state.loading = true;
      state.error = null;
    },
    receiveLogin: (state, action) => {
      state.loginData = action.payload;
      state.loading = false;
    },
    receiveGetCampus: (state, action) => {
      state.campusData = action.payload;
      state.loading = false;
    },
    receivePostCampus: (state, action) => {
      state.campusData.push(action.payload); // Add new data instead of overwriting
      state.loading = false;
    },
    receiveCampusGroups: (state, action) => {
      state.campusGroups = action.payload;
      state.loading = false;
    },
    receiveError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  requestLogin,
  requestGetCampus,
  requestPostCampus,
  requestCampusGroups,
  receiveLogin,
  receiveGetCampus,
  receivePostCampus,
  receiveCampusGroups,
  receiveError,
} = campusSlice.actions;

export default campusSlice.reducer;
