import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



//lead assign
export const getLeads=createAsyncThunk("leads/getLeads",async(_,{rejectWithValue})=>{

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
  users:[]

}

const leads =createSlice({
    name:"leads",
    initialState:initialState,
    reducers:{},
extraReducers: (builder) => {
  builder
    .addCase(getLeads.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getLeads.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data.data;
    })
    .addCase(getLeads.rejected, (state) => {
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