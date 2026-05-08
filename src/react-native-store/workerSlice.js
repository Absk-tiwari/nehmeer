import { createSlice } from "@reduxjs/toolkit";

const workerSlice = createSlice({
    name: "workers",
    initialState: {
        list: [],
        selectedWorker: null,
        loading: false,
        filters: {},
    },
    reducers: {
        setWorkers: (state, action) => {
            state.list = action.payload;
        },
        setSelectedWorker: (state, action) => {
            state.selectedWorker = action.payload;
        },
        setWorkerFilters: (state, action) => {
            state.filters = action.payload;
        },
    },
});

export const {
    setWorkers,
    setSelectedWorker,
    setWorkerFilters,
} = workerSlice.actions;

export default workerSlice.reducer;