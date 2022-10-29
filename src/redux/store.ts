import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '/@/redux/slices/userSlice'

export default configureStore({
  reducer: {
    userinfo: userInfoReducer
  }
})