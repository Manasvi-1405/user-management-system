import { configureStore } from '@reduxjs/toolkit'
import users from "./user-reducers/userSlice"
import auth from "./auth/auth"
import attendance from "./attendance-reducers/attendanceSlice"
import leads from './leads/leadsSlice'
import performance from "./performance/performanceSlice"
import leavesSlice from "./hr-management/leavesSlice"
// Create the Redux store
const store = configureStore({
  reducer: {
    users: users,
    attendance: attendance,
    auth: auth,
   leads: leads,
   performance:performance,
   leavesSlice:leavesSlice 

}})

export default store