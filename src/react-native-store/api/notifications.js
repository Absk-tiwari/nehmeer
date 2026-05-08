import * as SecureStore from "expo-secure-store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REFRESH_TOKEN_KEY } from "../../utils/storage";
import { clearSession, setToken } from "../authSlice";

const baseQuery = fetchBaseQuery({

    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || "/api",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth?.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
    
});

// 🔁 Wrapper for auto refresh
export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    // 🔴 If token expired
    if (result?.error?.status === 401) {

        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        if (!refreshToken) {
            api.dispatch(clearSession());
            return result;
        }

        // 🔁 Call refresh API
        const refreshResult = await baseQuery(
            {
                url: "/auth/refresh",
                method: "POST",
                body: { refreshToken },
            },
            api,
            extraOptions
        );

        if (refreshResult?.data?.accessToken) {
            const newToken = refreshResult.data.accessToken;

            // ✅ Save new token
            await SecureStore.setItemAsync("token", newToken);
            api.dispatch(setToken(newToken));

            result = await baseQuery(args, api, extraOptions);
        } else {
            // ❌ Refresh failed
            await SecureStore.deleteItemAsync("token");
            await SecureStore.deleteItemAsync("refreshToken");
            api.dispatch(clearSession());
        }
    }

    return result;
};

export const notificationApi = createApi({

    reducerPath: "notificationApi",
    baseQuery: baseQueryWithReauth,

    tagTypes: ["Notifications"],

    endpoints: (builder) => ({

        getNotifications: builder.query({
            query: ({ page = 1, limit = 20, unread_only = false } = {}) => ({
                url: "/notifications",
                params: { page, limit, unread_only },
            }),

            transformResponse: (response) => ({
                list: response.data,
                unreadCount: response.unread_count,
                total: response.pagination.total,
            }),

            providesTags: ["Notifications"],

        }),

        markAsRead: builder.mutation({
            query: (id) => ({
                url: `/notifications/${id}/read`,
                method: "POST",
            }),

            invalidatesTags: ["Notifications"],
        }),

        markAllAsRead: builder.mutation({
            query: () => ({
                url: `/notifications/read-all`,
                method: "POST",
            }),

            invalidatesTags: ["Notifications"],
        }),

    }),
});

export const {
    useGetNotificationsQuery,
    useMarkAsReadMutation,
    useMarkAllAsReadMutation,
} = notificationApi;