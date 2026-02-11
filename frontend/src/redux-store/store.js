import { configureStore } from '@reduxjs/toolkit'
import users from "./user-reducers/userSlice"
// Create the Redux store
 const store = configureStore({
  reducer: {
    users: users,
  },
})
export default store