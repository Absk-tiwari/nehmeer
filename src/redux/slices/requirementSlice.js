import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
  duties: [],
};

const requirementSlice = createSlice({
  name: "requirements",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setDuties: (state, action) => {
      state.duties = action.payload;
    },
    resetRequirement: (state) => {
      state.details = {};
      state.duties = [];
    },
  },
});

export const { setDetails, setDuties, resetRequirement } =
  requirementSlice.actions;

export default requirementSlice.reducer;