import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "posts",
    initialState: {
        list: [],
        myPosts: [],
    },
    reducers: {
        setPosts: (state, action) => {
            state.list = action.payload;
        },
        addPost: (state, action) => {
            state.myPosts.push(action.payload);
        },
        updatePost: (state, action) => {
            const index = state.myPosts.findIndex(
                p => p.id === action.payload.id
            );
            if (index !== -1) state.myPosts[index] = action.payload;
        },
        deletePost: (state, action) => {
            state.myPosts = state.myPosts.filter(
                p => p.id !== action.payload
            );
        },
    },
});

export const {
    setPosts,
    addPost,
    updatePost,
    deletePost,
} = postSlice.actions;

export default postSlice.reducer;