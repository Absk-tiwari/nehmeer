import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./notifications";

export const workersApi = createApi({

    reducerPath: "workersApi",
    baseQuery: baseQueryWithReauth,

    tagTypes: ["Posts", "Jobs"],

    endpoints: (builder) => ({

        getLocations: builder.query({
            query: () => `/profile/locations`
        }),

        getMyWorkers: builder.query({
            query: ({ tab, page = 1 }) => ({
                url: '/profile/my-workers',
                params: { tab, page, limit: 10 }, // active / history
            }),
        }),

        getWorkerInfo: builder.query({
            query: ({ id }) => `/profile/${id}`
        }),

        getSearchWorkers: builder.query({
            query: ({ search="", category="", address={}, page = 1, limit = 10 }) => ({
                url: "/profile",
                method: "POST",
                body: {
                    search,
                    category,
                    page,
                    address,
                    limit,
                }
            }),
        }),

        uploadAvatar: builder.mutation({
            query: (formData) => ({
                url: "/profile/avatar",
                method: "POST",
                body: formData,
            }),
        })

    }),
});

export const {
    useGetMyWorkersQuery,
    useGetSearchWorkersQuery,
    useGetWorkerInfoQuery,
    useGetLocationsQuery,
    useUploadAvatarMutation
} = workersApi;