import { createSlice } from "@reduxjs/toolkit";
import { httpConfig } from "service/config/httpConfig";

// Initlize state
const initialState = {
  user: {},
};

// ====================================================
// ==================|| Slice Chunks || ===============
// ====================================================

function authInit_actn(state, actionObj) {
  const { access_token, user } = actionObj.payload || {};

  try {
    if (access_token) {
      localStorage.setItem("access_token", access_token);
      httpConfig(access_token);
    }

    if (user) {
      state.user = user;
      state.isAuthenticate = true;
    }
  } catch (err) {}
}

function profileInit_actn(state, actionObj) {
  state.user = actionObj.payload;
}

function logout_actn(state, actionObj) {
  state.isAuthenticate = false;
  localStorage.clear();
}

// =======================================================
// ==================|| Slice Controller || ===============
// ========================================================
export const userSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    logout_slc: logout_actn,
    authInit_slc: authInit_actn,
    profileInit_slc: profileInit_actn,
  },
});

// Exports
export default userSlice.reducer;

export const { logout_slc, authInit_slc, profileInit_slc } = userSlice.actions;
