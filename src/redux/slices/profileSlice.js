import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔥 SAVE PROFILE (Employer)
export const saveEmployerProfile = createAsyncThunk(
  "profile/saveEmployerProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put("/profile/employer", formData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save profile"
      );
    }
  }
);

// 🔥 SAVE PROFILE (Worker)
export const saveWorkerProfile = createAsyncThunk(
  "profile/saveWorkerProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put("/profile/worker", formData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save profile"
      );
    }
  }
);

// 🔥 UPLOAD AVATAR
export const uploadAvatar = createAsyncThunk(
  "profile/uploadAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to upload avatar"
      );
    }
  }
);

// 🔥 RATE & REVIEW
export const rateAndReview = createAsyncThunk(
  "profile/rateAndReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/profile/rate-review", reviewData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to submit review"
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

      // 🔄 SAVE EMPLOYER PROFILE
      .addCase(saveEmployerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveEmployerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload?.data || action.payload;
      })
      .addCase(saveEmployerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 SAVE WORKER PROFILE
      .addCase(saveWorkerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveWorkerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload?.data || action.payload;
      })
      .addCase(saveWorkerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 UPLOAD AVATAR
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.avatar = action.payload?.data?.avatar;
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 RATE & REVIEW
      .addCase(rateAndReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(rateAndReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(rateAndReview.rejected, (state, action) => {
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