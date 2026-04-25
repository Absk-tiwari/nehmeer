import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔥 GET POSTS
export const getMyPosts = createAsyncThunk(
  "posts/getMyPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/posts/my-posts");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);

// 🔥 CREATE POST
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/posts/create", postData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create post"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    loading: false,
    error: null,

    // 🔥 create post state (important)
    createLoading: false,
    createSuccess: false,
    createError: null,
  },

  reducers: {
    // 🔥 reset after create (very important)
    resetCreatePost: (state) => {
      state.createLoading = false;
      state.createSuccess = false;
      state.createError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= GET POSTS =================
      .addCase(getMyPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.data || [];
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= CREATE POST =================
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
        state.createSuccess = false;
        state.createError = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;

        // ✅ add new post at top
        if (action.payload?.data) {
          state.list.unshift(action.payload.data);
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      });
  },
});

export const { resetCreatePost } = postSlice.actions;

export default postSlice.reducer;