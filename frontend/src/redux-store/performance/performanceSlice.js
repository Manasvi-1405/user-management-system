import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* ===========================
   GET USER PERFORMANCE
=========================== */

export const getUserPerformanceDashboard = createAsyncThunk("performance/getUserPerformanceDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const user=JSON.parse(localStorage.getItem("currentUserData"))
      const token = localStorage.getItem("token");
      
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/performance/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        status:response.status,
        data:response.data
      };
    } catch (error) {
      return rejectWithValue({
        status:error.status,
        data:error.response.data
      })
       
      
     
    }
  }
);

export const getTeamPerformanceDashboard = createAsyncThunk("performance/getUPerformanceDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const user=JSON.parse(localStorage.getItem("currentUser"))
      const token = localStorage.getItem("token");
      
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/performance/team`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        status:response.status,
        data:response.data
      };
    } catch (error) {
      return rejectWithValue({
        status:error.status,
        data:error.response.data
      })
       
      
     
    }
  }
);

/* ===========================
   GET USER ANALYTICS
=========================== */

export const getUserAnalytics = createAsyncThunk(
  "performance/getUserAnalytics",
  async (userId, { rejectWithValue }) => {
    try {
      const user=JSON.parse(localStorage.getItem("currentUserData"))
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/performance/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return{
        status:response.status,
        data:response.data,
      };
    } catch (error) {
      return rejectWithValue({
        status:error.status,
        data:error.response.data
      }
       
      );
    }
  }
);

/* ===========================
   SLICE
=========================== */

const initialState = {
  isLoading: false,
  userPerformanceOverview:{},
  userAnalytic:{}
 
};

const performance = createSlice({
  name: "performance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* Dashboard */
      .addCase(getUserPerformanceDashboard.pending, (state) => {
        state.isLoading = true;
      
      })
      .addCase(getUserPerformanceDashboard.fulfilled, (state,action) => {
        state.isLoading = false;
        state.userPerformanceOverview=action.payload.data.data.overview
     
      })
      .addCase(getUserPerformanceDashboard.rejected, (state) => {
        state.isLoading = false;
     
      })

      /* Analytics */
      .addCase(getUserAnalytics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state. userAnalytic = action.payload.data.data;
      })
      .addCase(getUserAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
     .addCase( getTeamPerformanceDashboard .pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase( getTeamPerformanceDashboard .fulfilled, (state, action) => {
        state.isLoading = false;
        state.analytics = action.payload;
      })
      .addCase( getTeamPerformanceDashboard .rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default performance.reducer;
