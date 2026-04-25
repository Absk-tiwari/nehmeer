import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔥 SAVE PROFILE
export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/complete-profile",
        formData
      );

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save profile"
      );
    }
  }
);

// 🔥 GET PROFILE (optional but important)
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/auth/me");
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",

  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    clearProfileState: (state) => {
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 SAVE PROFILE
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // ✅ Save user data
        state.user = action.payload?.data || action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 GET PROFILE
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileState } = profileSlice.actions;
export default profileSlice.reducer;