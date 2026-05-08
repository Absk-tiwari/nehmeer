import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        openings: [],
        myApplications: [],
        selectedJob: null,
        questionAnswers: []
    },
    reducers: {
        setOpenings: (state, action) => {
            state.openings = action.payload;
        },
        setApplications: (state, action) => {
            state.myApplications = action.payload;
        },
        applyToJob: (state, action) => {
            state.myApplications.push(action.payload);
        },
        setSelectedJob: (state, action) => {
            state.selectedJob = action.payload;
        },
        setQuestionAnswers: (state,action) => {
            state.questionAnswers = action.payload
        }
    },
});

export const {
    setOpenings,
    setApplications,
    applyToJob,
    setSelectedJob,
    setQuestionAnswers
} = jobSlice.actions;

export default jobSlice.reducer;