import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  expiryTime: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInRequest(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.expiryTime = action.payload.expiryTime;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    signOutSuccess(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.expiryTime = null;
    },
  },
});

export const { signInRequest, signInSuccess, signInFailure, signOutSuccess } = authSlice.actions;
export default authSlice.reducer;