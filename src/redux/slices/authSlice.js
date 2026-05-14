import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";


// Helper to save session to localStorage
const saveSessionToStorage = (data) => {
  const responseData = data?.data || data;
  const userData = responseData?.user || responseData;
  const token = responseData?.token || data?.token;
  const refreshToken = responseData?.refreshToken || data?.refreshToken;
  const workerProfile = responseData?.workerProfile || userData?.workerProfile || null;
  const availability = responseData?.availability || userData?.availability || [];
  const role = responseData?.role || userData?.role;

  if (token) localStorage.setItem("token", token);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  if (role) localStorage.setItem("userRole", role);
  if (userData) localStorage.setItem("user", JSON.stringify(userData));
  if (workerProfile) localStorage.setItem("workerProfile", JSON.stringify(workerProfile));
  if (availability?.length) localStorage.setItem("availability", JSON.stringify(availability));
};

// Helper to load session from localStorage
const loadSessionFromStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const workerProfile = JSON.parse(localStorage.getItem("workerProfile") || "null");
    const availability = JSON.parse(localStorage.getItem("availability") || "[]");
    return { user, workerProfile, availability };
  } catch {
    return { user: null, workerProfile: null, availability: [] };
  }
};

// Helper to clear session from localStorage
const clearSessionFromStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("user");
  localStorage.removeItem("workerProfile");
  localStorage.removeItem("availability");
};

// 🔥 LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ mobile, password, role }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        mobile,
        password,
        role,
      });

      // Save to localStorage
      saveSessionToStorage({ ...data, role });

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
      const route = role === 'worker' ? "/auth/register-worker" : "/auth/register-employer";
      const { data } = await axiosInstance.post(route, {
        mobile, password
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

        // Save to localStorage
        saveSessionToStorage({ ...data, role });

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

// 🔥 REFRESH TOKEN
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) {
        throw new Error("No refresh token");
      }

      const { data } = await axiosInstance.post("/auth/refresh", {
        refreshToken: storedRefreshToken,
      });

      if (data?.token || data?.accessToken) {
        localStorage.setItem("token", data.token || data.accessToken);
      }
      if (data?.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      return data;
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
      return rejectWithValue("Session expired. Please login again.");
    }
  }
);


// ================= SLICE =================

// Load initial state from localStorage
const storedSession = loadSessionFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState: {
  user: storedSession.user,
  workerProfile: storedSession.workerProfile,
  availability: storedSession.availability,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("userRole") || null,
  loading: false,
  error: null,
  signupSuccess: false,
},

  reducers: {
    logout: (state) => {
      clearSessionFromStorage();
      state.user = null;
      state.workerProfile = null;
      state.availability = [];
      state.token = null;
      state.role = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setWorkerProfile: (state, action) => {
      state.workerProfile = action.payload;
      localStorage.setItem("workerProfile", JSON.stringify(action.payload));
    },
    setAvailability: (state, action) => {
      state.availability = action.payload;
      localStorage.setItem("availability", JSON.stringify(action.payload));
    },
    setSession: (state, action) => {
      const { user, token, workerProfile, availability } = action.payload;
      state.user = user;
      state.token = token;
      state.workerProfile = workerProfile || null;
      state.availability = availability || [];
      state.role = user?.role || null;
      saveSessionToStorage(action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const responseData = action.payload?.data || action.payload;
        const userData = responseData?.user || responseData;
        state.user = userData;
        state.workerProfile = responseData?.workerProfile || userData?.workerProfile || null;
        state.availability = responseData?.availability || userData?.availability || [];
        state.token = responseData?.token || action.payload?.token || localStorage.getItem("token");
        state.role = responseData?.role || userData?.role || localStorage.getItem("userRole");
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
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        const responseData = action.payload?.data || action.payload;
        if (responseData?.token || action.payload?.token) {
          state.token = responseData?.token || action.payload?.token;
        }
        if (responseData?.user) {
          state.user = responseData.user;
          state.workerProfile = responseData.workerProfile || responseData.user?.workerProfile || null;
          state.availability = responseData.availability || responseData.user?.availability || [];
        }
        state.role = localStorage.getItem("userRole");
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
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        const userData = action.payload?.data || action.payload?.user || action.payload;
        const workerProfile = action.payload?.workerProfile || userData?.workerProfile || null;
        const availability = action.payload?.availability || userData?.availability || [];

        state.user = userData;
        state.workerProfile = workerProfile;
        state.availability = availability;

        // Update localStorage
        if (userData) localStorage.setItem("user", JSON.stringify(userData));
        if (workerProfile) localStorage.setItem("workerProfile", JSON.stringify(workerProfile));
        if (availability?.length) localStorage.setItem("availability", JSON.stringify(availability));
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 REFRESH TOKEN
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload?.user || state.user;
        state.workerProfile = action.payload?.workerProfile || action.payload?.user?.workerProfile || state.workerProfile;
        state.availability = action.payload?.availability || action.payload?.user?.availability || state.availability;
        state.token = action.payload?.token || localStorage.getItem("token");
      })
      .addCase(refreshToken.rejected, (state) => {
        clearSessionFromStorage();
        state.user = null;
        state.workerProfile = null;
        state.availability = [];
        state.token = null;
        state.role = null;
      });
  },
});

export const { logout, setUser, setWorkerProfile, setAvailability, setSession, setToken } = authSlice.actions;
export default authSlice.reducer;