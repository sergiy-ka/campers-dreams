import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
    clearFilter: (state) => {
      state.name = "";
    },
  },
});

export const { changeFilter, clearFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
