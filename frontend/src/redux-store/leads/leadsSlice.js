import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



//lead assign
// export const getLeads=createAsyncThunk("leads/getLeads",async(_,{rejectWithValue})=>{

//   try{
//     const token=localStorage.getItem("token")
//     const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/leads`,{
//       header:{
//         Authorization:`Bearer${token}`
//       }
//     })
//     return{status:response.status,
//       data:response.data
//   }

//   }catch(error){
//     return rejectWithValue({
//       err:error
//     })
//   }

// })

export const getAdminStates = createAsyncThunk(
  "leads/getAdminStates",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/leads/admin-stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ space important
          },
        }
      );

      return {
        status:response.status,
        data:response.data
      }
    } catch (error) {
       return rejectWithValue({
        status:error.status,
        error:error.response.data
      });
    }
  }
);

export const getMyLeadsStats = createAsyncThunk(
  "leads/getLeads",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/leads/my-leads`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ space important
          },
        }
      );

      return {
        status:response.status,
        data:response.data
      }
    } catch (error) {
      return rejectWithValue({
        status:error.status,
        error:error.response.data
      });
    }
  }
);

export const leadStats = createAsyncThunk(
  "/leads/leadStats",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/leads/my-leads/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ space important
          },
        }
      );

      return {
        status:response.status,
        data:response.data
      }
    } catch (error) {
      return rejectWithValue({
        status:error.status,
        error:error.response.data
      });
    }
  }
);



//create new lead
export const createNewLead=createAsyncThunk("leads/createNewLead",async(_,{rejectWithValue})=>{

  try{
    const token=localStorage.getItem("token")
    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/leads`,{
      header:{
        Authorization:`Bearer${token}`
      }
    })
    return{status:response.status,
      data:response.data
  }

  }catch(error){
    return rejectWithValue({
      err:error
    })
  }

})

//assign lead to current user
export const leadAssignUser=createAsyncThunk("leada/leadAssignUser",async(_,{rejectWithValue})=>{

  try{
    const token=localStorage.getItem("token")
    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/leads`,{
      header:{
        Authorization:`Bearer${token}`
      }
    })
    return{status:response.status,
      data:response.data
  }

  }catch(error){
    return rejectWithValue({
      err:error
    })
  }

})


//update lead
export const updateLead=createAsyncThunk("leads/updateLead",async(_,{rejectWithValue})=>{

  try{
    const token=localStorage.getItem("token")
    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/leads`,{
      header:{
        Authorization:`Bearer${token}`
      }
    })
    return{status:response.status,
      data:response.data
  }

  }catch(error){
    return rejectWithValue({
      err:error
    })
  }

})

//delete lead
export const deleteLead=createAsyncThunk("leads/deleteLead",async(_,{rejectWithValue})=>{

  try{
    const token=localStorage.getItem("token")
    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/leads`,{
      header:{
        Authorization:`Bearer${token}`
      }
    })
    return{status:response.status,
      data:response.data
  }

  }catch(error){
    return rejectWithValue({
      err:error
    })
  }

})






const initialState={
  isLoading:false,
  iscreateUserLoading:false,
  myLeads:{},
  adminStates:[],
  overAllLeads:{}

}

const leads =createSlice({
    name:"leads",
    initialState:initialState,
    reducers:{},
extraReducers: (builder) => {
  builder
    .addCase(getMyLeadsStats.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getMyLeadsStats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myLeads = action.payload.data.data;
    })
    .addCase(getMyLeadsStats.rejected, (state) => {
      state.isLoading = false;
    })

    .addCase(leadStats.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(leadStats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myLeads = action.payload.data.data;
    })
    .addCase(leadStats.rejected, (state) => {
      state.isLoading = false;
    })


     .addCase(getAdminStates.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAdminStates.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminStates = action.payload.data.data;
    })
    .addCase(getAdminStates.rejected, (state) => {
      state.isLoading = false;
    })

    .addCase(updateLead.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateLead.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data.data;
    })
    .addCase(updateLead.rejected, (state) => {
      state.isLoading = false;
    })

    .addCase(leadAssignUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(leadAssignUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data.data;
    })
    .addCase(leadAssignUser.rejected, (state) => {
      state.isLoading = false;
    })

    .addCase(deleteLead.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteLead.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data.data;
    })
    .addCase(deleteLead.rejected, (state) => {
      state.isLoading = false;
    })
  }
})
  

    export default leads.reducer