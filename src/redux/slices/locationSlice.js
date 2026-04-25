import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
  defaultLocationId: null,
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.locations.unshift({
        id: Date.now(),
        ...action.payload,
      });
    },

    deleteLocation: (state, action) => {
      state.locations = state.locations.filter(
        (loc) => loc.id !== action.payload
      );
    },

    setDefaultLocation: (state, action) => {
      state.defaultLocationId = action.payload;
    },
  },
});

export const {
  addLocation,
  deleteLocation,
  setDefaultLocation,
} = locationSlice.actions;

export default locationSlice.reducer;