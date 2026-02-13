import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";

export const getUsers=createAsyncThunk("users/getUsers",async(_,{rejectWithValue})=>{
  
    try {
      const token=  localStorage.getItem("token")
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/users`,{
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
  isLoading:false,
  users:[]

}

const users =createSlice({
    name:"users",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUsers.pending,(state)=>{
            state.isLoading=true
        }).addCase(getUsers.fulfilled,(state,action)=>{
            state.isLoading=false
            state.users=action.payload.data.data
        }).addCase(getUsers.rejected,(state)=>{
            state.isLoading=false
        })
    }
})
export default users.reducer