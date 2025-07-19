import { createSlice } from "@reduxjs/toolkit";

// Initlize state
const initialState = {
  snackbar: {},
  serviceloading: false,
  navDrawerStat: false,
};

// ====================================================
// ==================|| Slice Chunks || ===============
// ====================================================

const serviceloading_actn = (state, actionObj) => {
  state.serviceloading = actionObj.payload;
};

const toggleNavDrawer_actn = (state) => {
  state.navDrawerStat = !state.navDrawerStat;
};

function snackbar_actn(state, actionObj) {
  state.snackbar = actionObj.payload;
}

// =======================================================
// ==================|| Slice Controller || ===============
// ========================================================
export const userSlice = createSlice({
  initialState,
  name: "globalSlice",
  reducers: {
    serviceloading_slice: serviceloading_actn,
    snackbar_slice: snackbar_actn,
    toggleNavDrawer_slice: toggleNavDrawer_actn,
  },
});

// Exports
export default userSlice.reducer;

export const { serviceloading_slice, snackbar_slice, toggleNavDrawer_slice } =
  userSlice.actions;
