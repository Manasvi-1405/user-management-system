import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";

export const getUsers=createAsyncThunk("users/getUsers",async(_,{rejectWithValue})=>{
  
    try {
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/users?limit=1000`)
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

// export const createUsers=createAsyncThunk("deleteUser",async(id,{rejectWithValue})=>{

// try

// })












// export const updateUsers=createAsyncThunk("deleteUser",async(id,{rejectWithValue})=>{})
// export const deleteUsers=createAsyncThunk("deleteUser",async(id,{rejectWithValue})=>{})
// export const getUserById=createAsyncThunk("deleteUser",async(id,{rejectWithValue})=>{})
// export const getUserStatus=createAsyncThunk("deleteUser",async(id,{rejectWithValue})=>{})



const initialState={
  isLoading:false

}

const users =createSlice({
    name:"users",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUsers.pending,(state)=>{
            state.isLoading=true
        }).addCase(getUsers.fulfilled,(state)=>{
            state.isLoading=false
        }).addCase(getUsers.rejected,(state)=>{
            state.isLoading=false
        })
        // .addCase(getUsers.pending,(state)=>{
        //     state.isLoading=true
        // }).addCase(getUsers.fulfilled,(state)=>{
        //     state.isLoading=false
        // }).addCase(getUsers.rejected,(state)=>{
        //     state.isLoading=false
        // })
        // .addCase(getUsers.pending,(state)=>{
        //     state.isLoading=true
        // }).addCase(getUsers.fulfilled,(state)=>{
        //     state.isLoading=false
        // }).addCase(getUsers.rejected,(state)=>{
        //     state.isLoading=false
        // })
        // .addCase(getUsers.pending,(state)=>{
        //     state.isLoading=true
        // }).addCase(getUsers.fulfilled,(state)=>{
        //     state.isLoading=false
        // }).addCase(getUsers.rejected,(state)=>{
        //     state.isLoading=false
        // })
        // .addCase(getUsers.pending,(state)=>{
        //     state.isLoading=true
        // }).addCase(getUsers.fulfilled,(state)=>{
        //     state.isLoading=false
        // }).addCase(getUsers.rejected,(state)=>{
        //     state.isLoading=false
        // })
            


       
        
    }
})
export default users.reducer