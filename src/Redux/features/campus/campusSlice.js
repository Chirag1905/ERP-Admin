import { createSlice } from "@reduxjs/toolkit";

const campusSlice = createSlice({
  name: "campus",
  initialState: {
    campusData: [],
    campusPostData: [],
    loading: false,
    error: null,
    validationErrors: [],
  },
  reducers: {
    getCampusRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCampusSuccess: (state, action) => {
      state.campusData = action.payload;
      state.loading = false;
    },
    getCampusFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    postCampusRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.validationErrors = [];
    },
    postCampusSuccess: (state, action) => {
      state.campusPostData = action.payload;
      state.loading = false;
    },
    postCampusFailure: (state, action) => {
      state.error = action.payload;
      state.validationErrors = action.payload || [];
      state.loading = false;
    },
    // Add new actions for updating campus data
    putCampusRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.validationErrors = [];
    },
    putCampusSuccess: (state, action) => {
      state.campusData = state.campusData.map((campus) =>
        campus.id === action.payload.id ? action.payload : campus
      );
      state.loading = false;
    },
    putCampusFailure: (state, action) => {
      state.error = action.payload;
      state.validationErrors = action.payload || [];
      state.loading = false;
    },
  },
});

export const {
  getCampusRequest,
  getCampusSuccess,
  getCampusFailure,
  postCampusRequest,
  postCampusSuccess,
  postCampusFailure,
  putCampusRequest,
  putCampusSuccess,
  putCampusFailure,
} = campusSlice.actions;

export default campusSlice.reducer;
