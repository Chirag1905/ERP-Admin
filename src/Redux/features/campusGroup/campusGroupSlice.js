import { createSlice } from "@reduxjs/toolkit";

const campusGroupSlice = createSlice({
  name: "campusGroup",
  initialState: {
    campusGroupData: [],
    campusGroupPostData: [],
    campusGroupPutData: [],
    loading: false,
    error: null,
  },
  reducers: {
    getCampusGroupRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCampusGroupSuccess: (state, action) => {
      state.campusGroupData = action.payload;
      state.loading = false;
    },
    getCampusGroupFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    postCampusGroupRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    postCampusGroupSuccess: (state, action) => {
      state.campusPostData = action.payload;
      state.loading = false;
    },
    postCampusGroupFailure: (state, action) => {
      state.error = action.payload || [];
      state.loading = false;
    },
    // Add new actions for updating campus data
    putCampusGroupRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.campusPutData = null; // Clear previous put data
    },
    putCampusGroupSuccess: (state, action) => {
      // Store the put response separately
      state.campusPutData = action.payload;
      state.loading = false;
    },
    putCampusGroupFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.campusPutData = null;
    },
  },
});

export const {
  getCampusGroupRequest,
  getCampusGroupSuccess,
  getCampusGroupFailure,
  postCampusGroupRequest,
  postCampusGroupSuccess,
  postCampusGroupFailure,
  putCampusGroupRequest,
  putCampusGroupSuccess,
  putCampusGroupFailure,
} = campusGroupSlice.actions;

export default campusGroupSlice.reducer;
