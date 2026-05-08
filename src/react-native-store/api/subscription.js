import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./notifications";

export const subscriptionApi = createApi({

    reducerPath: "subcriptionApi",
    baseQuery: baseQueryWithReauth,

    tagTypes: ["Subcriptions"],

    endpoints: (builder) => ({

        // 🔹 Get all plans
        getPlans: builder.query({
            query: () => "/subscriptions/plans",
        }),

        // 🔹 Get current user subscription
        getMySubscription: builder.query({
            query: () => "/subscriptions/my-subscription",
        }),

        // 🔹 Create Razorpay subscription
        createSubscription: builder.mutation({
            query: (body) => ({
                url: "/subscriptions/create",
                method: "POST",
                body,
            }),
        }),

        // 🔹 Verify payment
        verifyPayment: builder.mutation({
            query: (body) => ({
                url: "/subscriptions/verify",
                method: "POST",
                body,
            }),
        }),

    }),
});

export const {
    useGetPlansQuery,
    useGetMySubscriptionQuery,
    useCreateSubscriptionMutation,
    useVerifyPaymentMutation,
} = subscriptionApi;