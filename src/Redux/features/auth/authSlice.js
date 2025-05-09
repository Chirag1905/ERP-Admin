import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  token: null,
  isTempPass: Boolean,

  loginData: null,
  setPermPassData: null,
  forgotPassData: null,
  resetPassData: null,
  fetchData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // signIn
    signInRequest(state) {
      state.isAuthenticated = false;
      state.loginData = null;
      state.token = null;
      state.isTempPass = null;
      state.error = null;
      state.loading = true;
    },
    signInSuccess(state, action) {
      state.isAuthenticated = true;
      state.loginData = action.payload;
      state.token = action.payload.token;
      state.isTempPass = action.payload.requiresPasswordUpdate;
      // state.isTempPass = true;
      state.loading = false;
    },
    signInFailure(state, action) {
      state.isAuthenticated = false;
      state.loginData = null;
      state.token = null;
      state.error = action.payload;
      state.loading = false;
    },
    clearAuthState: (state) => {
      state.loginData = null;
      state.error = null;
      state.isAuthenticated = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },

    // signOut 
    signOutRequest(state) {
      state.loading = true;
    },
    signOutSuccess(state, action) {
      state.isAuthenticated = false;
      state.loginData = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
    signOutFailure(state, action) {
      state.isAuthenticated = true;
      state.error = action.payload;
      state.loading = true;
    },


    // Permanent Password
    setPermanentPassRequest(state) {
      state.setPermPassData = null;
      state.error = null;
      state.loading = true;
    },
    setPermanentPassSuccess(state, action) {
      state.setPermPassData = action.payload;
      state.loading = false;
    },
    setPermanentPassFailure(state, action) {
      state.setPermPassData = null;
      state.error = action.payload;
      state.loading = false;
    },

    // Forgot Password
    forgotPassRequest(state) {
      state.forgotPassData = null;
      state.loading = true;
      state.error = null;
    },
    forgotPassSuccess(state, action) {
      state.forgotPassData = action.payload;
      state.loading = false;
    },
    forgotPassFailure(state, action) {
      state.forgotPassData = null;
      state.error = action.payload;
      state.loading = false;
    },

    // Reset Password
    resetPassRequest(state) {
      state.resetPassData = null;
      state.loading = true;
      state.error = null;
    },
    resetPassSuccess(state, action) {
      state.resetPassData = action.payload;
      state.loading = false;
    },
    resetPassFailure(state, action) {
      state.resetPassData = null;
      state.error = action.payload;
      state.loading = false;
    },

    // Fetch Data Realm Client Id
    fetchDataRequest(state) {
      state.fetchData = null;
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.fetchData = action.payload.data;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.fetchData = null;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  clearAuthState,
  clearAuthError,

  signOutRequest,
  signOutSuccess,
  signOutFailure,

  setPermanentPassRequest,
  setPermanentPassSuccess,
  setPermanentPassFailure,

  forgotPassRequest,
  forgotPassSuccess,
  forgotPassFailure,

  resetPassRequest,
  resetPassSuccess,
  resetPassFailure,

  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure
} = authSlice.actions;
export default authSlice.reducer;