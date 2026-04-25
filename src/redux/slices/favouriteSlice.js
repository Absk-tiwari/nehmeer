import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔥 GET FAVOURITES
export const getFavourites = createAsyncThunk(
  "favourites/getFavourites",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/favourites");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch favourites"
      );
    }
  }
);

// ❤️ ADD TO FAVOURITE
export const addFavourite = createAsyncThunk(
  "favourites/addFavourite",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/favourites/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add favourite"
      );
    }
  }
);

// ❌ REMOVE FROM FAVOURITE
export const removeFavourite = createAsyncThunk(
  "favourites/removeFavourite",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/favourites/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove favourite"
      );
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getFavourites.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.data || [];
      })
      .addCase(getFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addFavourite.fulfilled, (state, action) => {
        state.list.push(action.payload.data);
      })

      // REMOVE
      .addCase(removeFavourite.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item) => item.id !== action.meta.arg
        );
      });
  },
});

export default favouriteSlice.reducer;