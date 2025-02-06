import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores user data after login
  loading: false,
  error: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
        console.log(action.payload,"action.payload")
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
