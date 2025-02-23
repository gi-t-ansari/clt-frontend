import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

export const submitResignation = createAsyncThunk(
  "resignation/submitResignation",
  async ({ lwd }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${API_URL}/resign`,
        { lwd },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const resignationSlice = createSlice({
  name: "resignation",
  initialState: {
    resignations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitResignation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitResignation.fulfilled, (state, action) => {
        state.loading = false;
        state.resignations.push(action.payload);
      })
      .addCase(submitResignation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resignationSlice.reducer;
