import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔥 MY JOB LISTINGS
export const getMyJobs = createAsyncThunk(
  "jobs/getMyJobs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/jobs/my/listings");
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch jobs");
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    list: [],
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyJobs.fulfilled, (state, action) => {
      state.list = action.payload?.data || [];
      state.total = action.payload?.pagination?.total || 0;
    });
  },
});

export default jobSlice.reducer;