import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";


// register
export const register=createAsyncThunk("auth/register",async(_,{rejectWithValue})=>{
  
    try {
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/register`)
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


// login

export const login=createAsyncThunk("auth/login",async(payload,{rejectWithValue})=>{
  
    try {
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`,payload)
     return{
            status:response.status,
            data:response.data,
        }
        
    } catch (error) {
        return rejectWithValue({
            status:error.status,
            data:error.response
            // err:error
        })
        
    }
})

const initialState={
  isLoading:false

}

const auth =createSlice({
    name:"users",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state)=>{
            state.isLoading=true
        }).addCase(register.fulfilled,(state)=>{
            state.isLoading=false
        }).addCase(register.rejected,(state)=>{
            state.isLoading=false
        }).addCase(login.pending,(state)=>{
            state.isLoading=true
        }).addCase(login.fulfilled,(state)=>{
            state.isLoading=false
        }).addCase(login.rejected,(state)=>{
            state.isLoading=false
        })
    
    
      }
})
export default auth.reducer
