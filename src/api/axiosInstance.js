import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URI ?? "http://localhost:5064/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 🔐 Request interceptor - attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔐 Response interceptor - handle 401 errors with token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh for auth routes
    const authRoutes = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/request-otp", "/auth/verify-otp"];
    const isAuthRoute = authRoutes.some((route) => originalRequest.url?.includes(route));

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const storedRefreshToken = localStorage.getItem("refreshToken");
        if (!storedRefreshToken) {
          throw new Error("No refresh token available");
        }

        // Try to refresh the token
        const { data } = await axios.post(
          "http://localhost:5064/api/auth/refresh",
          { refreshToken: storedRefreshToken }
        );

        const newToken = data?.token || data?.data?.token || data?.accessToken;
        const newRefreshToken = data?.refreshToken || data?.data?.refreshToken;

        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        if (newToken) {
          localStorage.setItem("token", newToken);
          axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          processQueue(null, newToken);
          return axiosInstance(originalRequest);
        } else {
          throw new Error("No token in refresh response");
        }
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Refresh failed - clear auth and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userRole");

        const currentPath = window.location.hash.replace("#", "") || "/";
        const publicRoutes = [
          "/", "/login", "/register", "/forgot-password", "/otp",
          "/dashboard", "/search", "/terms", "/privacy-policy", "/license"
        ];
        const isPublicRoute = publicRoutes.some(route => currentPath === route || currentPath.startsWith("/services"));

        if (!isPublicRoute) {
          window.location.hash = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
