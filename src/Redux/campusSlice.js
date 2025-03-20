import { createSlice } from "@reduxjs/toolkit";

const campusSlice = createSlice({
  name: "campus",
  initialState: {
    campusData: [],
    campusPostData: null,
    loginData: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Actions to trigger sagas
    fetchCampusRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchCampusSuccess: (state, action) => {
      state.campusData = action.payload;
      state.loading = false;
    },
    fetchCampusFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    createCampusRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createCampusSuccess: (state, action) => {
      state.campusPostData = action.payload;
      state.loading = false;
    },
    createCampusFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    loginRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loginData = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchCampusRequest,
  fetchCampusSuccess,
  fetchCampusFailure,
  createCampusRequest,
  createCampusSuccess,
  createCampusFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} = campusSlice.actions;

export default campusSlice.reducer;