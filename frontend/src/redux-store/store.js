import { configureStore } from '@reduxjs/toolkit'
import users from "./user-reducers/userSlice"
import auth from "./auth/auth"
// Create the Redux store
 const store = configureStore({
  reducer: {
    users: users,
    auth:auth,
  },  
})
export default store