import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./notifications";
import { jobIcons, roleIDs } from "../../screens/utils/objects";

export const postsApi = createApi({

    reducerPath: "postsApi",
    baseQuery: baseQueryWithReauth,

    tagTypes: ["Posts", "Jobs"],

    endpoints: (builder) => ({

        getJobPosts: builder.query({
            query: ({
                tab = "all",
                pagination = { page: 1, limit: 20 },
                filters = {},
                sortBy = "Newest First"
            } = {}) => ({
                url: "/jobs",
                method: "POST",
                body: {
                    tab,
                    pagination,
                    filters,
                    sortBy,
                },
            }),

            transformResponse: (response) => ({
                results: response.data.map(item => {
                    const answers = {};
                    item.answers.forEach(a => {
                        answers[a.question] = a.answer;
                    });

                    return {
                        ...item,
                        id: item.id.toString(),
                        title: `I am looking for a ${item.role}`, // you don't have title → derive or fetch role name
                        experience: answers["Experience Level"] || "",
                        location: answers["Location"] || "",
                        status: item.status,
                        statusText: item.status === 'active' ? "Open" : item.status,
                        statusColor: item.status === "active" ? '#738F2D' : "red",
                        icon: jobIcons[item.role_id]
                    }
                }),
                unreadCount: response.unread_count,
                total: response.pagination.total,
            }),

            providesTags: ["Jobs"],

        }),

        applyToJob: builder.mutation({
            query: ({ postId, answers }) => ({
                url: `/jobs/${postId}/apply`,
                method: "POST",
                body: { answers },
            }),
            invalidatesTags: ["Jobs"],
        }),

        getQuestionAnswers: builder.query({
            query: () => "/jobs/qa",
        }),

        getCustomQuestions: builder.query({
            query: (role) => `/jobs/custom-questions?role=${role}`,
        }),

        getApplicants: builder.query({
            query: ({ postId, page = 1 }) => ({
                url: `/jobs/${postId}/applicants`,
                params: { page, limit: 10 }
            }),
        }),

        submitCustomRequest: builder.mutation({
            query: (body) => ({
                url: '/jobs/custom-request',
                method: 'POST',
                body,
            }),
        }),

        getCustomRequests: builder.query({
            query: ({
                tab = "all",
                pagination = { page: 1, limit: 20 },
            } = {}) => ({
                url: "/jobs/custom-requests",
                params: {
                    tab,
                    ...pagination,
                },
            }),

            transformResponse: (response) => ({
                results: response.data.map(item => {
                    // {"age": "Adult (21–30)", "shift": "Night Shift: 9 PM - 12 AM", "title": "Babysitter", "gender": "Female", "language": "hindi", "religion": "hindu", "description": "Hmko ek worker ki talaas hai\n\n                Jo koi bhi gareeb ka bacha tayar ho\n\n  Wo iss location pr aakr join kar sakta hai\n", "availability": "Full-time", "experience of work": "Intermediate (2-5 years)", "baby_related_all_work": true, "preparing_baby_for_sleep": true}
                    
                    const {title, location="-" , ...rest} = item.data;
                    return {
                        ...item,
                        role_id: roleIDs[title],
                        id: item.id.toString(),
                        title: `I am looking for a ${title}`, // you don't have title → derive or fetch role name
                        experience: rest["experience of work"],
                        location,
                        statusText: item.status,
                        statusColor: ["rejected",'cancelled'].indexOf(item.status) !== -1 ? '#738F2D' : "red",
                    }
                }),
                total: response.pagination.total,
            }),

        })
    }),
});

export const {
    useGetJobPostsQuery,
    useGetQuestionAnswersQuery,
    useGetCustomQuestionsQuery,
    useSubmitCustomRequestMutation,
    useGetApplicantsQuery,
    useGetCustomRequestsQuery
} = postsApi;