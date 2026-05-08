import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        theme: "light",
        language: "en",
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
    },
});

export const { setTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;