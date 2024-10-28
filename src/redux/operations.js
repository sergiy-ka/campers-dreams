import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../services/api";

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ page, limit, filter }, thunkAPI) => {
    try {
      const data = await api.getCampers({ page, limit, filter });
      return {
        ...data,
        page, 
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchById",
  async (camperId, thunkAPI) => {
    try {
      const data = await api.getCamperById(camperId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
