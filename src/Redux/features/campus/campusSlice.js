import { createSlice } from "@reduxjs/toolkit";

const createAsyncReducers = (prefix, stateKey) => ({
  [`${prefix}Request`]: (state) => {
    state.loading = true;
    state.error = null;
    state[stateKey] = null;
  },
  [`${prefix}Success`]: (state, action) => {
    state[stateKey] = action.payload;
    state.loading = false;
  },
  [`${prefix}Failure`]: (state, action) => {
    state.error = action.payload;
    state.loading = false;
    state[stateKey] = null;
  },
});

const campusSlice = createSlice({
  name: "campus",
  initialState: {
    campusData: null,
    campusPostData: null,
    campusPutData: null,
    loading: false,
    error: null,
  },
  reducers: {
    ...createAsyncReducers("getCampus", "campusData"),
    ...createAsyncReducers("postCampus", "campusPostData"),
    ...createAsyncReducers("putCampus", "campusPutData"),
  },
});

// Now these exports will match your original names
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

// import { createSlice } from "@reduxjs/toolkit";

// const campusSlice = createSlice({
//   name: "campus",
//   initialState: {
//     campusData: null,
//     campusPostData: null,
//     campusPutData: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     getCampusRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.campusData = null;
//     },
//     getCampusSuccess: (state, action) => {
//       state.campusData = action.payload;
//       state.loading = false;
//     },
//     getCampusFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//       state.campusData = null;
//     },
//     postCampusRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.campusPostData = null;
//     },
//     postCampusSuccess: (state, action) => {
//       state.campusPostData = action.payload;
//       state.loading = false;
//     },
//     postCampusFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//       state.campusPostData = null;
//     },
//     putCampusRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.campusPutData = null;
//     },
//     putCampusSuccess: (state, action) => {
//       state.campusPutData = action.payload;
//       state.loading = false;
//     },
//     putCampusFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//       state.campusPutData = null;
//     },
//   },
// });

// export const {
//   getCampusRequest,
//   getCampusSuccess,
//   getCampusFailure,
//   postCampusRequest,
//   postCampusSuccess,
//   postCampusFailure,
//   putCampusRequest,
//   putCampusSuccess,
//   putCampusFailure,
// } = campusSlice.actions;

// export default campusSlice.reducer;
