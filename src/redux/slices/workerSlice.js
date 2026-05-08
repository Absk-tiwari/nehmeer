import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Helper function to transform worker data
const transformWorkerData = (item) => {
  const answers = {};
  item.answers?.forEach((a) => {
    answers[a.question] = a.answer;
  });

  const profile = item.workerProfile || {};
  const {
    experience = "-",
    age = "-",
    city,
    title,
    name,
    profile_photo,
    role,
    rating,
    reviews,
    verified,
    type,
  } = profile;

  return {
    ...item,
    id: item.id?.toString(),
    _id: item.id?.toString(),
    title: title || "Job-Seeker",
    name: name || item.name || "Worker",
    image: profile_photo || item.profile_photo,
    location: city || item.city || answers["Location"] || "-",
    status: item.status,
    age: age || "-",
    experience: experience || answers["Experience"] || "-",
    role: role || item.role || title || "Worker",
    rating: rating || item.rating || 0,
    reviews: reviews || item.reviews || 0,
    verified: verified || item.verified || false,
    type: type || item.type || "worker",
  };
};

// 🔥 SEARCH WORKERS (Recommended Workers)
export const getSearchWorkers = createAsyncThunk(
  "workers/getSearchWorkers",
  async (
    { search = "", category = "", address = {}, page = 1, limit = 10 } = {},
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post("/profile", {
        search,
        category,
        page,
        address,
        limit,
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch workers"
      );
    }
  }
);

// 🔥 GET ALL WORKERS (Joined Workers)
export const getMyWorkers = createAsyncThunk(
  "workers/getMyWorkers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/profile/my-workers");
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
      const { data } = await axiosInstance.get("/profile/my-workers");
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

// 🔥 GET WORKER INFO (Search profile)
export const getWorkerInfo = createAsyncThunk(
  "workers/getWorkerInfo",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/profile/${id}`);
      return data?.data || data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch worker info"
      );
    }
  }
);

const workerSlice = createSlice({
  name: "workers",
  initialState: {
    list: [],
    recommendedWorkers: [],
    selectedWorker: null,
    loading: false,
    recommendedLoading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔄 SEARCH WORKERS (Recommended)
      .addCase(getSearchWorkers.pending, (state) => {
        state.recommendedLoading = true;
      })
      .addCase(getSearchWorkers.fulfilled, (state, action) => {
        state.recommendedLoading = false;
        const rawData = action.payload?.data || [];
        state.recommendedWorkers = rawData.map(transformWorkerData);
      })
      .addCase(getSearchWorkers.rejected, (state, action) => {
        state.recommendedLoading = false;
        state.error = action.payload;
      })

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
      })

      // 🔄 WORKER INFO (Search Profile)
      .addCase(getWorkerInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkerInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedWorker = action.payload;
      })
      .addCase(getWorkerInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default workerSlice.reducer;