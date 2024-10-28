import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "../operations";

const initialState = {
  items: [],
  currentCamper: null,
  isLoading: false,
  error: null,
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  currentPage: 1, 
  hasMore: true,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      const index = state.favorites.indexOf(camperId);

      if (index === -1) {
        state.favorites.push(camperId);
      } else {
        state.favorites.splice(index, 1);
      }

      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    resetCampers: (state) => {
      state.items = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.page === 1) {
          state.items = action.payload.items;
        } else {
          state.items = [...state.items, ...action.payload.items];
        }
        state.hasMore = action.payload.items.length === 4;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFavorite, resetCampers } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
