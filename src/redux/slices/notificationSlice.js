import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔔 GET NOTIFICATIONS
export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/notifications");
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch notifications");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    unreadCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.list = action.payload?.data || [];

      // unread count calculate
      state.unreadCount = state.list.filter(n => !n.read).length;
      
    });
  },
});

export default notificationSlice.reducer;