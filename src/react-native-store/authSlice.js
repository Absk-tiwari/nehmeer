import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({

    name: "auth",

    initialState: {
        user: null,
        token: null,
        profile: { progress: 90 },
        isLoggedIn: false,
        loading: true,
        notification: {
            title: "",
            description: "",
            type: "",
        },
    },

    reducers: {

        setToken: (state, action) => {
            state.token = action.payload
        },

        setSession: (state, action) => {

            state.token = action.payload.token;
            state.user = action.payload.user;
            state.profile = action.payload.profile;
            state.isLoggedIn = true;
            state.loading = false;
        },

        setProfile: (state, action) => {
            state.user.profile_photo = action.payload;
        },

        clearSession: (state) => {
            state.token = null;
            state.user = null;
            state.profile = null;
            state.isLoggedIn = false;
            state.loading = false;
        },

        finishLoading: (state) => {
            state.loading = false;
        },

        setNotification: (state, action) => {
            state.notification = action.payload;
        },

        setUser: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        },
        // ✅ NEW: reset notification
        clearNotification: (state) => {
            state.notification = {
                title: "",
                description: "",
                type: "",
            };
        }

    }

});

export const {
    setToken,
    setSession,
    setProfile,
    clearSession,
    finishLoading,
    setNotification,
    clearNotification,
    setUser,
} = authSlice.actions;

export default authSlice.reducer;