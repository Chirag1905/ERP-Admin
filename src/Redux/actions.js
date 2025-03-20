import { createSlice } from "@reduxjs/toolkit";

const campusSlice = createSlice({
  name: "campus",
  initialState: {
    campusData: [], // Stores the list of all campuses
    campusPostData: [], // Stores the list of all campuses
    loginData: [], // Stores login response data
    loading: false, // Indicates API call status
    error: null, // Stores any errors
  },
  reducers: {
    /* 
    =====================
    LOGIN ACTIONS
    =====================
    */

    // Start login request
    requestLogin: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Store login response data
    receiveLogin: (state, action) => {
      state.loginData = action.payload;
      state.loading = false;
    },

    /* 
    =====================
    GET CAMPUS DATA (LISTING)
    =====================
    */

    // Start fetching campus data
    requestGetCampus: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Store the retrieved campus data
    receiveGetCampus: (state, action) => {
      state.campusData = action.payload.data || []; // Ensure only the relevant data is stored
      state.loading = false;
    },

    /* 
    =====================
    CREATE CAMPUS (POST)
    =====================
    */

    // Start creating a new campus
    requestPostCampus: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Store the newly created campus data
    receivePostCampus: (state, action) => {
      if (action.payload.data) {
        state.campusPostData = action.payload.data; // Store latest posted data
      }
      state.loading = false;
    },

    /* 
    =====================
    UPDATE CAMPUS
    =====================
    */

    // Start updating a campus
    requestUpdateCampus: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Update the specific campus in the list
    receiveUpdateCampus: (state, action) => {
      const updatedCampus = action.payload;
      state.campusData = state.campusData.map((campus) =>
        campus.id === updatedCampus.id ? updatedCampus : campus
      );
      state.loading = false;
    },

    /* 
    =====================
    DELETE CAMPUS
    =====================
    */

    // Start deleting a campus
    requestDeleteCampus: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Remove the deleted campus from the list
    receiveDeleteCampus: (state, action) => {
      const deletedId = action.payload;
      state.campusData = state.campusData.filter(
        (campus) => campus.id !== deletedId
      );
      state.loading = false;
    }
    
  },
});

// Export actions for use in components
export const {
  requestLogin,
  receiveLogin,
  requestGetCampus,
  receiveGetCampus,
  requestPostCampus,
  receivePostCampus,
  requestUpdateCampus,
  receiveUpdateCampus,
  requestDeleteCampus,
  receiveDeleteCampus,
  receiveError,
} = campusSlice.actions;

// Export reducer to be used in the store
export default campusSlice.reducer;
