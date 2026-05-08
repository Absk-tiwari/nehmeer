import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔥 GET LOCATIONS
export const getLocations = createAsyncThunk(
  "locations/getLocations",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/profile/locations");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch locations"
      );
    }
  }
);

// 🔥 ADD LOCATION
export const addLocation = createAsyncThunk(
  "locations/addLocation",
  async (locationData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/profile/add-location", locationData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add location"
      );
    }
  }
);

// 🔥 DELETE LOCATION
export const deleteLocation = createAsyncThunk(
  "locations/deleteLocation",
  async (locationId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/profile/remove-location/${locationId}`);
      return { ...data, deletedId: locationId };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete location"
      );
    }
  }
);

const locationSlice = createSlice({
  name: "locations",
  initialState: {
    locations: [],
    defaultLocationId: null,
    selectedAddress: null,
    loading: false,
    error: null,
  },
  reducers: {
    setDefaultLocation: (state, action) => {
      state.defaultLocationId = action.payload;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET LOCATIONS
      .addCase(getLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload?.data || [];
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD LOCATION
      .addCase(addLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLocation.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.data) {
          state.locations.unshift(action.payload.data);
        }
      })
      .addCase(addLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE LOCATION
      .addCase(deleteLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = state.locations.filter(
          (loc) => loc.id !== action.payload.deletedId
        );
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDefaultLocation, setSelectedAddress } = locationSlice.actions;
export default locationSlice.reducer;
