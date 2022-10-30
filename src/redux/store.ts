import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '/@/redux/slices/userSlice'
import videoMenuReducer from './slices/videoMenuSlice'

export default configureStore({
  reducer: {
    userinfo: userInfoReducer,
    videoMenu: videoMenuReducer,
  }
})