import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        list: [],
        loading: true,
        unreadCount: 0,
    },
    reducers: {
        setNotifications: (state, action) => {
            state.list = action.payload.list;
            state.unreadCount = action.payload.unreadCount;
            state.loading = false
        },
        markAsRead: (state, action) => {
            const notif = state.list.find(n => n.id === action.payload);
            if (notif) notif.read = true;
            state.unreadCount = state.list.filter(n => !n.read).length;
        },
    },
});

export const { setNotifications, markAsRead } = notificationSlice.actions;

export default notificationSlice.reducer;