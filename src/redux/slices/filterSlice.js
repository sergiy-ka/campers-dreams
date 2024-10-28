import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  vehicleType: "",
  features: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
    },
    toggleFeature: (state, action) => {
      const feature = action.payload;
      const index = state.features.indexOf(feature);

      if (index === -1) {
        state.features.push(feature);
      } else {
        state.features.splice(index, 1);
      }
    },
    resetFilters: (state) => {
      state.location = "";
      state.vehicleType = "";
      state.features = [];
    },
  },
});

export const { setLocation, setVehicleType, toggleFeature, resetFilters } =
  filterSlice.actions;
export const filterReducer = filterSlice.reducer;
