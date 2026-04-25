import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔥 GET SUBSCRIPTION PLANS
export const getPlans = createAsyncThunk(
  "subscription/getPlans",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/subscription/plans");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch plans"
      );
    }
  }
);

// 💎 GET ACTIVE PLAN
export const getActivePlan = createAsyncThunk(
  "subscription/getActivePlan",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/subscription/my-plan");
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch active plan");
    }
  }
);

// 💳 BUY PLAN
export const buyPlan = createAsyncThunk(
  "subscription/buyPlan",
  async (planId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/subscription/buy/${planId}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to buy plan"
      );
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    plans: [],
    activePlan: null,
    loading: false,
    buyLoading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ======================
      // GET PLANS
      // ======================
      .addCase(getPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ SAFE API HANDLING (IMPORTANT FIX)
        state.plans =
          action.payload?.data?.plans ||
          action.payload?.plans ||
          action.payload?.data ||
          [];
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // ACTIVE PLAN
      // ======================
      .addCase(getActivePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActivePlan.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ SAFE HANDLING
        state.activePlan =
          action.payload?.data?.plan ||
          action.payload?.plan ||
          action.payload?.data ||
          null;
      })
      .addCase(getActivePlan.rejected, (state) => {
        state.loading = false;
      })

      // ======================
      // BUY PLAN
      // ======================
      .addCase(buyPlan.pending, (state) => {
        state.buyLoading = true;
        state.error = null;
      })
      .addCase(buyPlan.fulfilled, (state, action) => {
        state.buyLoading = false;

        state.activePlan =
          action.payload?.data?.plan ||
          action.payload?.plan ||
          action.payload?.data ||
          null;
      })
      .addCase(buyPlan.rejected, (state, action) => {
        state.buyLoading = false;
        state.error = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;