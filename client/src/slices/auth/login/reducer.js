import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {},
  error: "",
  loading: false,
  isUserLogout: false,
  errorFlag: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload;
      state.loading = true;
      state.isUserLogout = false;
      state.errorFlag = true;

    },
    loginAdmin(state, action) {
      state.user = action.payload.user
      state.loading = false;
      state.isUserLogout = false;
      state.errorFlag = false;
    },
    loadAdminDetails(state, action) {
      state.user = action.payload.user
      state.loading = false;
      state.isUserLogout = false;
      state.errorFlag = false;
    },
    logoutAdmin(state, action) {
      state.isUserLogout = true
      state.user = null
      state.loading = false
      state.errorFlag = false;
    },
    reset_login_flag(state) {
      state.error = null
      state.loading = false;
      state.errorFlag = false;
    }
  },
});

export const {
  apiError,
  loginAdmin,
  loadAdminDetails,
  logoutAdmin,
  reset_login_flag
} = loginSlice.actions

export default loginSlice.reducer;