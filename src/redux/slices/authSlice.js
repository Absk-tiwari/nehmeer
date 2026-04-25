import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";


// 🔥 LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ mobile, password, role }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        mobile,
        password,
        role, // ✅ VERY IMPORTANT
      });

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", role); // ✅ save role
      }

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);


// 🔥 REGISTER (STEP 1 → SEND OTP)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ mobile, password, role }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/request-otp", {
        mobile,
      });

      // ✅ Save temp data
      localStorage.setItem("signupMobile", mobile);
      localStorage.setItem("signupPassword", password);
      localStorage.setItem("signupRole", role);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP failed"
      );
    }
  }
);


// 🔥 FORGOT PASSWORD (OTP)
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ mobile }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/request-otp", {
        mobile,
      });

      localStorage.setItem("resetMobile", mobile);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);


// 🔥 VERIFY OTP + REGISTER (MAIN LOGIC)
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const mobile =
        localStorage.getItem("signupMobile") ||
        localStorage.getItem("resetMobile");

      const password = localStorage.getItem("signupPassword");
      const role = localStorage.getItem("signupRole");

      // ✅ STEP 1: VERIFY OTP
      await axiosInstance.post("/auth/verify-otp", {
        mobile,
        otp,
      });

      // ✅ STEP 2: IF SIGNUP → REGISTER
      if (mobile && password && role) {
        const endpoint =
          role === "worker"
            ? "/auth/register-worker"
            : "/auth/register-employer";

        const { data } = await axiosInstance.post(endpoint, {
          mobile,
          password,
        });

        // 🧹 cleanup
        localStorage.removeItem("signupMobile");
        localStorage.removeItem("signupPassword");
        localStorage.removeItem("signupRole");

        return data;
      }

      // ✅ IF FORGOT PASSWORD FLOW
      return { success: true };

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);


// 🔥 RESEND OTP
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (_, { rejectWithValue }) => {
    try {
      const mobile =
        localStorage.getItem("signupMobile") ||
        localStorage.getItem("resetMobile");

      const { data } = await axiosInstance.post("/auth/request-otp", {
        mobile,
      });

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to resend OTP"
      );
    }
  }
);


// 🔥 GET PROFILE
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/auth/me");
      return data;
    } catch (err) {
      console.log("PROFILE ERROR:", err.response);
      return rejectWithValue("Session expired");
    }
  }
);


// ================= SLICE =================

const authSlice = createSlice({
  name: "auth",
  initialState: {
  user: null,
  role: localStorage.getItem("userRole") || null, // ✅ NEW
  loading: false,
  error: null,
  signupSuccess: false,
},

  reducers: {
   logout: (state) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole"); // ✅ ADD THIS
  state.user = null;
  state.role = null;
}
  },

  extraReducers: (builder) => {
    builder

      // 🔄 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
       .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data || action.payload?.user;
        })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // 🔄 REGISTER (OTP SEND)
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.signupSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.signupSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.signupSuccess = false;
      })


      // 🔄 FORGOT PASSWORD
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // 🔄 VERIFY OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // 🔄 RESEND OTP
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // 🔄 PROFILE
      .addCase(getProfile.fulfilled, (state, action) => {
        console.log("PROFILE SUCCESS:", action.payload);
        state.user = action.payload?.data;
      })
      .addCase(getProfile.rejected, (state) => {
        localStorage.removeItem("token");
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;