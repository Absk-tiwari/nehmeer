import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: "location",
    initialState: {
        coords: null,
        address: "",
    },
    reducers: {
        setLocation: (state, action) => {
            state.coords = action.payload.coords;
            state.address = action.payload.address;
        },
    },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;