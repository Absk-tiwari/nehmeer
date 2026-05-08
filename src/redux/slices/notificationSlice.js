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

// 🔔 MARK SINGLE AS READ
export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/notifications/${notificationId}/read`);
      return { ...data, notificationId };
    } catch (err) {
      return rejectWithValue("Failed to mark notification as read");
    }
  }
);

// 🔔 MARK ALL AS READ
export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch("/notifications/read-all");
      return data;
    } catch (err) {
      return rejectWithValue("Failed to mark all notifications as read");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET NOTIFICATIONS
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.data || [];
        state.unreadCount = state.list.filter((n) => !n.read).length;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // MARK SINGLE AS READ
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.list.find(
          (n) => n.id === action.payload.notificationId
        );
        if (notification) {
          notification.read = true;
          state.unreadCount = state.list.filter((n) => !n.read).length;
        }
      })

      // MARK ALL AS READ
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.list.forEach((n) => {
          n.read = true;
        });
        state.unreadCount = 0;
      });
  },
});

export default notificationSlice.reducer;
