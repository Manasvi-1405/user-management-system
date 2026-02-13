// import { createAsyncThunk } from "@reduxjs/toolkit";
// import 

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api",
// });

// // Response handler
// const handleResponse = (response) => {
//   return {
//     status:response.status,
//     success: true,
//     data: response.data,
//   };
// };

// // Error handler
// const handleError = (error) => {
//   return {
//     status:error.status,
//     success: false,
//     errorResponse:error.response,
//     message:
//       error.response?.data?.message || "Something went wrong",
//   };
// };

// export const authApi = {


//   //login signin
//   login: async (credentials) => {
//     try {
//       const response = await api.post("/auth/login", credentials);
//       return handleResponse(response);
//     } catch (error) {
//       return handleError(error);
//     }
//   },

//   //signup
//   register: async (userData) => {
//     try {
//       const response = await api.post("/auth/register", userData);
//       return handleResponse(response);
//     } catch (error) {
//       return handleError(error);
//     }
//   },

//   //reset-password
  
//   dangerReset: async (data) => {
//   try {
//     const response = await api.post("/auth/danger-reset", data);
//     return handleResponse(response);
//   } catch (error) {
//     return handleError(error);
//   }
// }

// };

// login
// const login =createAsyncThunk("auth/login",async(__,{rejectWithValue})=>{
//   const response=
// })
