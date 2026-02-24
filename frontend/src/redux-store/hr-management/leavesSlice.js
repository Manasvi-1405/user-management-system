import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addHolidays = createAsyncThunk(
  "hr/addHolidays",
  async (addHolidays, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/hr/holidays`,
        addHolidays,
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
        // err:error
      });
    }
  }
);

export const getHolidays = createAsyncThunk(
  "hr/getHolidays",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/hr/holidays`,
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
        // err:error
      });
    }
  }
);

export const getPendingLeaves = createAsyncThunk(
  "hr/getPendingLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/hr/leaves/admin/pending`,
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
        // err:error
      });
    }
  }
);


export const applyLeaves = createAsyncThunk(
  "hr/applyLeaves",
  async (applyLeaves, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/hr/leaves/apply`,applyLeaves,
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
        // err:error
      });
    }
  }
);

export const updatedLeaves = createAsyncThunk(
  "hr/updatedLeaves",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/hr/leaves/status/${payload.currentPendingLeaveId}`,{status:payload.status},
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
        // err:error
      });
    }
  }
);


export const genrateSalarySlip = createAsyncThunk(
  "hr/genrateSalarySlip",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/hr/payroll/slip/${payload.userId}?month=${payload.month}&year=${payload.year}`,
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
        // err:error
      });
    }
  }
);


export const payrollSummary = createAsyncThunk(
  "hr/payrollSummary",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/hr/payroll/summary/?month=${payload.month}&year=${payload.year}`,
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
        // err:error
      });
    }
  }
);




const initialState = {
  isLoading: false,
  iscreateUserLoading: false,
  holidayList: [],
  pendingLeaves:[],
  applyLeaves:{},
  companyPayrollSummaryData:{}
};

const leavesSlice = createSlice({
  name: "leavesSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addHolidays.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase(addHolidays.fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase(addHolidays.rejected, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase(getHolidays.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase(getHolidays.fulfilled, (state, action) => {
        state.iscreateUserLoading = false;
        state.holidayList = action.payload.data.data;
      })
      .addCase(getHolidays.rejected, (state) => {
        state.iscreateUserLoading = false;
      })
   
 
      .addCase(getPendingLeaves.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase(getPendingLeaves.fulfilled, (state,action) => {
        state.iscreateUserLoading = false;
        state.pendingLeaves=action.payload.data.data
        
        
      })
      .addCase(getPendingLeaves.rejected, (state) => {
        state.iscreateUserLoading = false;
      })

      .addCase(applyLeaves.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase(applyLeaves.fulfilled, (state) => {
        state.iscreateUserLoading = false;
        
      })
      .addCase(applyLeaves.rejected, (state) => {
        state.iscreateUserLoading = false;
      })
        .addCase(updatedLeaves.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedLeaves.fulfilled, (state) => {
        state.isLoading = false;
        
      })
      .addCase(updatedLeaves.rejected, (state) => {
        state.isLoading = false;
      })

       .addCase(genrateSalarySlip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(genrateSalarySlip.fulfilled, (state) => {
        state.isLoading = false;
        
      })
      .addCase(genrateSalarySlip.rejected, (state) => {
        state.isLoading = false;
      })
      
             .addCase(payrollSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(payrollSummary.fulfilled, (state,action) => {
        state.isLoading = false;
        state.companyPayrollSummaryData=action.payload.data.data
        
      })
      .addCase(payrollSummary.rejected, (state) => {
        state.isLoading = false;
      });;

      
  },
});
export default leavesSlice.reducer;
