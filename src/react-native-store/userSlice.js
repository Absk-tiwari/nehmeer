import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: null,
        savedLocations: [],
        currentLocation: null,
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        updateProfile: (state, action) => {
            state.profile = { ...state.profile, ...action.payload };
        },
        setCurrentLocation: (state, action) => {
            state.currentLocation = action.payload;
        },
        addSavedLocation: (state, action) => {
            state.savedLocations.push(action.payload);
        },
        removeSavedLocation: (state, action) => {
            state.savedLocations = state.savedLocations.filter(
                loc => loc.id !== action.payload
            );
        },
    },
});

export const {
    setProfile,
    updateProfile,
    setCurrentLocation,
    addSavedLocation,
    removeSavedLocation,
} = userSlice.actions;

export default userSlice.reducer;