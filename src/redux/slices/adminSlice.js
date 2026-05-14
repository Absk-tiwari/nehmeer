import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const adminAxios = axios.create({
  baseURL: "https://nehmeer-api.onrender.com/api",
});

adminAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchAdminWorkers = createAsyncThunk(
  "admin/fetchWorkers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAxios.post("/profile", { params: {} });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch workers");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    workers: [],
    pagination: {
      total: 0,
      page: 1,
      pages: 1,
    },
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearAdminData: (state) => {
      state.workers = [];
      state.pagination = { total: 0, page: 1, pages: 1 };
      state.loading = false;
      state.error = null;
      state.lastFetched = null;
    },
    updateWorkerInList: (state, action) => {
      const index = state.workers.findIndex((w) => w.id === action.payload.id);
      if (index !== -1) {
        state.workers[index] = action.payload;
      }
    },
    addWorkerToList: (state, action) => {
      state.workers.unshift(action.payload);
      state.pagination.total += 1;
    },
    removeWorkerFromList: (state, action) => {
      state.workers = state.workers.filter((w) => w.id !== action.payload);
      state.pagination.total -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminWorkers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminWorkers.fulfilled, (state, action) => {
        state.loading = false;
        state.workers = action.payload.data || [];
        state.pagination = {
          total: action.payload.pagination?.total || action.payload.data?.length || 0,
          page: action.payload.pagination?.page || 1,
          pages: action.payload.pagination?.pages || 1,
        };
        state.lastFetched = Date.now();
      })
      .addCase(fetchAdminWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminData, updateWorkerInList, addWorkerToList, removeWorkerFromList } = adminSlice.actions;
export default adminSlice.reducer;
