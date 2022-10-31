import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '/@/redux/slices/userSlice'
import videoMenuReducer from './slices/videoMenuSlice'
import screenReducer from '/@/redux/slices/screenSlice'

export default configureStore({
  reducer: {
    userinfo: userInfoReducer,
    videoMenu: videoMenuReducer,
    screenInfo: screenReducer,
  }
})