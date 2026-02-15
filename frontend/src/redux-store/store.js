import { configureStore } from '@reduxjs/toolkit'
import users from "./user-reducers/userSlice"
import auth from "./auth/auth"
import attendance from "./attendance-reducers/attendanceSlice"
// Create the Redux store
const store = configureStore({
  reducer: {
    users: users,
    attendance: attendance,
    auth: auth,
  
}})

export default store