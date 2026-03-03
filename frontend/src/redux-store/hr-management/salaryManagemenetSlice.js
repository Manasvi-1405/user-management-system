import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMySalary = createAsyncThunk(
  " /getMySalary",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL} /salary/me`,
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



export const getAllSalaries = createAsyncThunk(
  " /getAllSalaries",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/salary/all`,
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

export const getSalaryHistory = createAsyncThunk(
  " /getSalaryHistory",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/salary/history/:userId`,
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

export const getLeavePolicies = createAsyncThunk(
  " /getLeavePolicies",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/salary/leave-policies`,
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


export const getLeaveBalance = createAsyncThunk(
  " /getLeaveBalance",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/salary/leave-balance/?month${payload.momth}$?year${payload.year}`,
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


export const getMyLeaveBalance = createAsyncThunk(
  " /getMyLeaveBalance",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/salary/my-leave-balance/?month${payload.momth}$?year${payload.year}`,
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

export const getHolidayPolicy = createAsyncThunk(
  " /getHolidayPolicy",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/salary/holiday-policy`,
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

export const generateSalarySlip = createAsyncThunk(
  " /generateSalarySlip",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/salary/slip/:userId`,
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

export const getMySalarySlip = createAsyncThunk(
  " /getMySalarySlip",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/salary/my-slip`,
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

export const setSalary = createAsyncThunk(
  " /setSalary",
  async ({payload,id}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/salary/set/${id}`,payload,
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

export const initializeLeavePolicies = createAsyncThunk(
  " /initializeLeavePolicies",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/salary/leave-policies/init`,payload,
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

export const initializeHolidayPolicy = createAsyncThunk(
  " /initializeHolidayPolicy",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/salary/holiday-policy/init`,
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


export const uploadDocuments = createAsyncThunk(
  "uploadDocuments",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/hr/documents/upload`,payload,
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

// get single user document
export const getDocument = createAsyncThunk(
  "getDocument",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/hr/documents/user/${id}`,
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

export const verifyDocument = createAsyncThunk(
  "verifyDocument",
  async ({documentId,status}, { rejectWithValue }) => {
    console.log("asynfkld" ,documentId)
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/hr/documents/verify/${documentId}`,{status:status},
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
  singleUserDoc:{},
  mySalary:{},
  holidayPolicy:{}

};

const salaryManagementSlice = createSlice({
  name: "salaryManagementSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMySalary.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase(getMySalary.fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase(getMySalary.rejected, (state) => {
        state.iscreateUserLoading = false;
      })

        .addCase(getAllSalaries .pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase(getAllSalaries .fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase(getAllSalaries .rejected, (state) => {
        state.iscreateUserLoading = false;
      })

        .addCase(getSalaryHistory .pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase(getSalaryHistory .fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase(getSalaryHistory .rejected, (state) => {
        state.iscreateUserLoading = false;
      })

        .addCase( getLeavePolicies.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase( getLeavePolicies.fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase( getLeavePolicies.rejected, (state) => {
        state.iscreateUserLoading = false;
      })

        .addCase(getLeaveBalance.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase(getLeaveBalance.fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase(getLeaveBalance.rejected, (state) => {
        state.iscreateUserLoading = false;
      })

        .addCase(getMyLeaveBalance.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase(getMyLeaveBalance.fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase(getMyLeaveBalance.rejected, (state) => {
        state.iscreateUserLoading = false;
      })

        .addCase(getHolidayPolicy.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase(getHolidayPolicy.fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase(getHolidayPolicy.rejected, (state) => {
        state.iscreateUserLoading = false;
      })

        .addCase(generateSalarySlip.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase(generateSalarySlip.fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase(generateSalarySlip.rejected, (state) => {
        state.iscreateUserLoading = false;
      })

        .addCase( getMySalarySlip .pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase( getMySalarySlip .fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase( getMySalarySlip .rejected, (state) => {
        state.iscreateUserLoading = false;
      })

         .addCase( setSalary .pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase( setSalary .fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase( setSalary .rejected, (state) => {
        state.iscreateUserLoading = false;
      })

         .addCase( initializeLeavePolicies .pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase( initializeLeavePolicies .fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase( initializeLeavePolicies .rejected, (state) => {
        state.iscreateUserLoading = false;
      })

         .addCase( initializeHolidayPolicy .pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase( initializeHolidayPolicy .fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase( initializeHolidayPolicy .rejected, (state) => {
        state.iscreateUserLoading = false;
      })
          .addCase( uploadDocuments.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase( uploadDocuments.fulfilled, (state) => {
        state.iscreateUserLoading = false;
      })
      .addCase( uploadDocuments.rejected, (state) => {
        state.iscreateUserLoading = false;
      })


                .addCase( getDocument.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase( getDocument.fulfilled, (state,action) => {
        state.iscreateUserLoading = false;
        state.singleUserDoc=action.payload.data.data
      })
      .addCase( getDocument.rejected, (state) => {
        state.iscreateUserLoading = false;
      })
                 .addCase( verifyDocument.pending, (state) => {
        state.iscreateUserLoading = true;
      })
      .addCase( verifyDocument.fulfilled, (state) => {
        state.iscreateUserLoading = false;
        // state.singleUserDoc=action.payload.data.data
      })
      .addCase( verifyDocument.rejected, (state) => {
        state.iscreateUserLoading = false;
      })

        },
});
export default salaryManagementSlice.reducer;