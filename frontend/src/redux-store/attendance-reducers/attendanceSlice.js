import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// clock in
export const clockIn=createAsyncThunk("attendance/clockIn",async(payload,{rejectWithValue})=>{
  
    try {
      const token=  localStorage.getItem("token")
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/attendance/check-in`,payload,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
     return{
            status:response.status,
            data:response.data,
        }
        
    } catch (error) {
        return rejectWithValue({
            // status:error.status,
            // data:error.response
            err:error
        })
        
    }
})


const initialState={
  isLoading:false

}



const attendance =createSlice({
    name:"attendance",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(clockIn.pending,(state)=>{
            state.isLoading=true
        }).addCase(clockIn.fulfilled,(state)=>{
            state.isLoading=false
        }).addCase(clockIn.rejected,(state)=>{
            state.isLoading=false
        })
        
        
        // .addCase(login.pending,(state)=>{
        //     state.isLoading=true
        // }).addCase(login.fulfilled,(state)=>{
        //     state.isLoading=false
        // }).addCase(login.rejected,(state)=>{
        //     state.isLoading=false
        // })
    
    
      }
})