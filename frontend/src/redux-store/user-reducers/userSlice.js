import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";





// get users
export const getUsers=createAsyncThunk("users/getUsers",async(_,{rejectWithValue})=>{
  
    try {
      const token=  localStorage.getItem("token")
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/users`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
     return {
      status:response.status,
      data:response.data
     }
        
    } catch (error) {
        return rejectWithValue({
            // status:error.status,
            // data:error.response
            err:error
        })
        
    }
})



// create user
export const createUsers=createAsyncThunk("users/createUser",async(createUsers,{rejectWithValue})=>{
  
    try {
      const token=  localStorage.getItem("token")
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users`,createUsers,{
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
            status:error.status,
            data:error.response.data,
            // err:error
        })
        
    }
})



// get single user by id
export const getSingleuser=createAsyncThunk("users/getSingleuser",async(_,{rejectWithValue})=>{
  
    try {
      const token=  localStorage.getItem("token")
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${1}`,{
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
  iscreateUserLoading:false,
  users:[]

}

const users =createSlice({
    name:"users",
    initialState:initialState,
    reducers:{},
extraReducers: (builder) => {
  builder
    .addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data.data;
    })
    .addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
    })

    .addCase(createUsers.pending, (state) => {
      state.iscreateUserLoading = true;
    })
    .addCase(createUsers.fulfilled, (state, action) => {
      state.iscreateUserLoading = false;
      // state.users = action.payload.data.data;
    })
    .addCase(createUsers.rejected, (state) => {
      state.iscreateUserLoading = false;
    })

    .addCase(getSingleuser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getSingleuser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data.data;
    })
    .addCase(getSingleuser.rejected, (state) => {
      state.isLoading = false;
    });
}

})
export default users.reducer