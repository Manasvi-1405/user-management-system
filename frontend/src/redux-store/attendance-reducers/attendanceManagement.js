import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getReport = createAsyncThunk(
  "adminAttendance/getMonthlyReport",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/attendance/admin/report`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue({
        status: error.status,
        data: error.response.data,
      });
    }
  }
);

// analtics

export const getAnalytics = createAsyncThunk(
  "adminAttendance/analytics",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/attendance/analytics/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue({
        status: error.status,
        data: error.response.data,
      });
    }
  }
);

export const report = createAsyncThunk(
  "adminAttendance/report",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/attendance/report`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue({
        status: error.status,
        data: error.response.data,
      });
    }
  }
);

const initialState = {
  isLoading: false,
  history: {},
  analyticsData: {},
};
const adminAttendance = createSlice({
  name: "attendance",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history = action.payload.data;
      })
      .addCase(getReport.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analyticsData = action.payload.data;
      })
      .addCase(getAnalytics.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(report.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(report.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analyticsData = action.payload.data;
      })
      .addCase(report.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default adminAttendance.reducer;
