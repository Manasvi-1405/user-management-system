import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// clock in
export const clockIn = createAsyncThunk(
  "attendance/clockIn",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/attendance/check-in`,
        payload,
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
        // status:error.status,
        // data:error.response
        err: error,
      });
    }
  }
);

// clock out
export const clockOut = createAsyncThunk(
  "attendance/clockOut",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/attendance/check-out`,
        {},
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
        // status:error.status,
        // data:error.response
        err: error,
      });
    }
  }
);

// my attendance history
export const myAttendanceHistory = createAsyncThunk(
  "attendance/myAttendanceHistory",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/attendance/my-history`,
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
        // status:error.status,
        // data:error.response
        err: error,
      });
    }
  }
);

//get work hour

export const getWorkHours = createAsyncThunk(
  "attendance/getWorkHours",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/attendance/getWorkHours`,
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
        // status:error.status,
        // data:error.response
        err: error,
      });
    }
  }
);

//monthly report

export const getMonthlyReport = createAsyncThunk(
  "attendance/getMonthlyReport",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/attendance/monthly-report`,
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
        // status:error.status,
        // data:error.response
        err: error,
      });
    }
  }
);

//status
export const attendanceStatusAdmin = createAsyncThunk(
  "attendance/attendanceStatusAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/attendance/status`,
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
        // status:error.status,
        // data:error.response
        err: error,
      });
    }
  }
);

//getemployeeAnalytics
export const  getEmployeeAnalytics = createAsyncThunk("attendance/ getEmployeeAnalytics",async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/attendance/analytics/:userId`,
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
        // status:error.status,
        // data:error.response
        err: error,
      });
    }
  }
);



export const getAdminReport = createAsyncThunk(
  "attendance/getAdminReport",
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
        status:error.status,
        data:error.response
      
      });
    }
  }
);




const initialState = {
  isLoading: false,
  myAttendanceHistoryy: [],
   workingHours:{},
   employeeAnalyticAdmin:[],
   adminReport:{}
  
  
};

const attendance = createSlice({
  name: "attendance",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clockIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clockIn.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(clockIn.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(clockOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clockOut.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(clockOut.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(myAttendanceHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myAttendanceHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myAttendanceHistoryy = action.payload.data.data;
      })
      .addCase(myAttendanceHistory.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getWorkHours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkHours.fulfilled, (state,action) => {
        state.isLoading = false;
         state.workingHours=action.payload.data.data

       ;
      })
      .addCase(getWorkHours.rejected, (state) => {
        state.isLoading = false;
         
      })

      .addCase(getMonthlyReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyReport.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getMonthlyReport.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(attendanceStatusAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(attendanceStatusAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(attendanceStatusAdmin.rejected, (state) => {
        state.isLoading = false;
      })
       .addCase( getEmployeeAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase( getEmployeeAnalytics.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase( getEmployeeAnalytics.rejected, (state) => {
        state.isLoading = false;
      })
       .addCase(getAdminReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase( getAdminReport.fulfilled, (state,action) => {
        state.isLoading = false;
         state.adminReport=action.payload.data;
      })
      .addCase(getAdminReport.rejected, (state) => {
        state.isLoading = false;
       
      });


      


      
  },
});

export default attendance.reducer;
