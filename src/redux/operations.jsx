import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "https://6488fa450e2469c038fe8e0f.mockapi.io";

export const fetchAdverts = createAsyncThunk(
  "adverts/fetchAll",
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await axios.get(`/adverts?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchAllMakes = createAsyncThunk(
  "makes/fetchAllMakes",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/adverts");
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
