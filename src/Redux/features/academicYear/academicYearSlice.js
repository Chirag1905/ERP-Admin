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

const academicYearSlice = createSlice({
  name: "academicYear",
  initialState: {
    academicYearData: null,
    academicYearPostData: null,
    academicYearPutData: null,
    loading: false,
    error: null,
  },
  reducers: {
    ...createAsyncReducers("getAcademicYear", "academicYearData"),
    ...createAsyncReducers("postAcademicYear", "academicYearPostData"),
    ...createAsyncReducers("putgetAcademicYear", "academicYearPutData"),
  },
});

// Now these exports will match your original names
export const {
  getAcademicYearRequest,
  getAcademicYearSuccess,
  getAcademicYearFailure,
  postAcademicYearRequest,
  postAcademicYearSuccess,
  postAcademicYearFailure,
  putAcademicYearRequest,
  putAcademicYearSuccess,
  putAcademicYearFailure,
} = academicYearSlice.actions;

export default academicYearSlice.reducer;