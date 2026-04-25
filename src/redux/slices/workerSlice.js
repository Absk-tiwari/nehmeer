import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔥 GET ALL WORKERS (Joined Workers)
export const getMyWorkers = createAsyncThunk(
  "workers/getMyWorkers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/my-workers");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch workers"
      );
    }
  }
);

// 🔥 GET SINGLE WORKER (Profile page)
export const getWorkerById = createAsyncThunk(
  "workers/getWorkerById",
  async (id, { rejectWithValue }) => {
    try {
      // ⚠️ Agar backend me direct API nahi hai,
      // toh list me se find karenge
      const { data } = await axiosInstance.get("/my-workers");

      const worker = data?.data?.find((w) => w.id === Number(id));

      if (!worker) throw new Error("Worker not found");

      return worker;
    } catch (err) {
      return rejectWithValue(
        err.message || "Failed to fetch worker"
      );
    }
  }
);

const workerSlice = createSlice({
  name: "workers",
  initialState: {
    list: [],
    selectedWorker: null, // ✅ important
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔄 ALL WORKERS
      .addCase(getMyWorkers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyWorkers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.data || [];
      })
      .addCase(getMyWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 SINGLE WORKER
      .addCase(getWorkerById.pending, (state) => {
        state.loading = true;
        state.selectedWorker = null;
      })
      .addCase(getWorkerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedWorker = action.payload;
      })
      .addCase(getWorkerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default workerSlice.reducer;