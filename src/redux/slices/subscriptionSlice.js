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

// 💎 GET ACTIVE SUBSCRIPTION
export const getMySubscription = createAsyncThunk(
  "subscription/getMySubscription",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/subscription/my-subscription");
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch subscription");
    }
  }
);

// 💳 VERIFY PAYMENT
export const verifyPayment = createAsyncThunk(
  "subscription/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/subscription/verify", paymentData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Payment verification failed"
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
      // MY SUBSCRIPTION
      // ======================
      .addCase(getMySubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMySubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.activePlan =
          action.payload?.data?.subscription ||
          action.payload?.subscription ||
          action.payload?.data ||
          null;
      })
      .addCase(getMySubscription.rejected, (state) => {
        state.loading = false;
      })

      // ======================
      // VERIFY PAYMENT
      // ======================
      .addCase(verifyPayment.pending, (state) => {
        state.buyLoading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.buyLoading = false;
        state.activePlan =
          action.payload?.data?.subscription ||
          action.payload?.subscription ||
          action.payload?.data ||
          null;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.buyLoading = false;
        state.error = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;