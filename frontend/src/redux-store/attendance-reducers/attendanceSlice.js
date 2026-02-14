import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// clock in
export const clockIn = createAsyncThunk("attendance/clockIn", async (payload, { rejectWithValue }) => {

    try {
        const token = localStorage.getItem("token")
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/attendance/check-in`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return {
            status: response.status,
            data: response.data,
        }

    } catch (error) {
        return rejectWithValue({
            // status:error.status,
            // data:error.response
            err: error
        })

    }
})



// clock out
export const clockOut = createAsyncThunk("attendance/clockOut", async (_, { rejectWithValue }) => {

    try {
        const token = localStorage.getItem("token")
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/attendance/check-out`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return {
            status: response.status,
            data: response.data,
        }

    } catch (error) {
        return rejectWithValue({
            // status:error.status,
            // data:error.response
            err: error
        })

    }
})


// my attendance history
export const myAttendanceHistory = createAsyncThunk("attendance/myAttendanceHistory", async (_, { rejectWithValue }) => {

    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/attendance/my-history`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return {
            status: response.status,
            data: response.data,
        }

    } catch (error) {
        return rejectWithValue({
            // status:error.status,
            // data:error.response
            err: error
        })

    }
})


const initialState = {
    isLoading: false,
    myAttendanceHistoryy:[]

}



const attendance = createSlice({
    name: "attendance",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(clockIn.pending, (state) => {
            state.isLoading = true
        }).addCase(clockIn.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(clockIn.rejected, (state) => {
            state.isLoading = false
        })


            .addCase(clockOut.pending, (state) => {
                state.isLoading = true
            }).addCase(clockOut.fulfilled, (state) => {
                state.isLoading = false
            }).addCase(clockOut.rejected, (state) => {
                state.isLoading = false
            })


            .addCase(myAttendanceHistory.pending, (state) => {
                state.isLoading = true
            }).addCase(myAttendanceHistory.fulfilled, (state,action) => {
                state.isLoading = false
                state.myAttendanceHistoryy=action.payload.data.data
            }).addCase(myAttendanceHistory.rejected, (state) => {
                state.isLoading = false
            })

           


    }
})


export default attendance.reducer