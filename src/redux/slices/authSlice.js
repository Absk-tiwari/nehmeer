import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔥 LOGIN API
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ mobile, password }, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post("/auth/login", {
                mobile,
                password,
            });

            // Save token
            if (data?.token) {
                localStorage.setItem("token", data.token);
            }

            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Login failed"
            );
        }
    }
);

// 🔥 REGISTER (STEP 1 → REQUEST OTP)
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ mobile, password }, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post("/auth/request-otp", {
                mobile,
            });

            // Save temp data (OTP verify ke baad use hoga)
            localStorage.setItem("signupMobile", mobile);
            localStorage.setItem("signupPassword", password);

            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Signup failed"
            );
        }
    }
);

// 🔥 FORGOT PASSWORD (SEND OTP)
export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async ({ mobile }, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post("/auth/request-otp", {
                mobile,
            });

            // Save mobile for reset flow
            localStorage.setItem("resetMobile", mobile);

            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to send OTP"
            );
        }
    }
);
// 🔥 VERIFY OTP
export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async ({ otp }, { rejectWithValue }) => {
        try {
            const mobile =
                localStorage.getItem("signupMobile") ||
                localStorage.getItem("resetMobile");

            const { data } = await axiosInstance.post("/auth/verify-otp", {
                mobile,
                otp,
            });

            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Invalid OTP"
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

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        signupSuccess: false, // 👈 NEW
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // 🔄 LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔄 REGISTER (OTP)
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
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;