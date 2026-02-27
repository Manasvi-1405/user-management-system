import { configureStore } from '@reduxjs/toolkit'
import users from "./user-reducers/userSlice"
import auth from "./auth/auth"
import attendance from "./attendance-reducers/attendanceSlice"
import leads from './leads/leadsSlice'
import performance from "./performance/performanceSlice"
import leavesSlice from "./hr-management/leavesSlice"
import salaryManagementSlice from "./hr-management/salaryManagemenetSlice"
import adminAttendance from "./attendance-reducers/attendanceManagement"
// Create the Redux store
const store = configureStore({
  reducer: {
    users: users,
    attendance: attendance,
    auth: auth,
   leads: leads,
   performance:performance,
   leavesSlice:leavesSlice,
   salaryManagementSlice:salaryManagementSlice,
   adminAttendance:adminAttendance
  

}})

export default store