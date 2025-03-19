import { createSlice } from "@reduxjs/toolkit";

const campusSlice = createSlice({
  name: "campus",
  initialState: {
    campusData: [],  // List of campuses
    loginData: [],   
    loading: false,  
    error: null,     
  },
  reducers: {
    // LOGIN ACTIONS
    requestLogin: (state) => {
      state.loading = true;
      state.error = null;
    },
    receiveLogin: (state, action) => {
      state.loginData = action.payload;
      state.loading = false;
    },

    // READ CAMPUS DATA
    requestGetCampus: (state) => {
      state.loading = true;
      state.error = null;
    },
    receiveGetCampus: (state, action) => {
      state.campusData = action.payload;
      state.loading = false;
    },

    // CREATE CAMPUS
    requestPostCampus: (state) => {
      state.loading = true;
      state.error = null;
    },
    receivePostCampus: (state, action) => {
      state.campusData.push(action.payload); // Add new campus
      state.loading = false;
    },

    // UPDATE CAMPUS
    requestUpdateCampus: (state) => {
      state.loading = true;
      state.error = null;
    },
    receiveUpdateCampus: (state, action) => {
      const updatedCampus = action.payload;
      state.campusData = state.campusData.map((campus) =>
        campus.id === updatedCampus.id ? updatedCampus : campus
      );
      state.loading = false;
    },

    // DELETE CAMPUS
    requestDeleteCampus: (state) => {
      state.loading = true;
      state.error = null;
    },
    receiveDeleteCampus: (state, action) => {
      const deletedId = action.payload;
      state.campusData = state.campusData.filter((campus) => campus.id !== deletedId);
      state.loading = false;
    },

    // ERROR HANDLER
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
  requestUpdateCampus,
  requestDeleteCampus,
  receiveLogin,
  receiveGetCampus,
  receivePostCampus,
  receiveUpdateCampus,
  receiveDeleteCampus,
  receiveError,
} = campusSlice.actions;

export default campusSlice.reducer;
