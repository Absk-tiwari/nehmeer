import { createSlice } from "@reduxjs/toolkit";

const cmsSlice = createSlice({
    name: "cms",
    initialState: {
        privacyPolicy: "",
        terms: "",
    },
    reducers: {
        setPrivacyPolicy: (state, action) => {
            state.privacyPolicy = action.payload;
        },
        setTerms: (state, action) => {
            state.terms = action.payload;
        },
    },
});

export const { setPrivacyPolicy, setTerms } = cmsSlice.actions;
export default cmsSlice.reducer;