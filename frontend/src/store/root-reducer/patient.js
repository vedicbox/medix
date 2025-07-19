import { createSlice } from "@reduxjs/toolkit";

// Initlize state
const initialState = {
};

// ====================================================
// ==================|| Slice Chunks || ===============
// ====================================================

function patientInit_actn(state, actionObj) {
  state.assignObj = actionObj.payload;
}

// =======================================================
// ==================|| Slice Controller || ===============
// ========================================================
export const patientSlice = createSlice({
  initialState,
  name: "patientSlice",
  reducers: {
    patientInit_slc: patientInit_actn,
  },
});

// Exports
export default patientSlice.reducer;

export const { patientInit_slc } = patientSlice.actions;
