import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '/@/redux/slices/userSlice'
import videoMenuReducer from './slices/videoMenuSlice'
import screenReducer from '/@/redux/slices/screenSlice'
import videoFilterReducer from '/@/redux/slices/videoFilterSlice'
import playingHistoryReducer from './slices/playingHistorySlice'

export default configureStore({
  reducer: {
    userinfo: userInfoReducer,
    videoMenu: videoMenuReducer,
    screenInfo: screenReducer,
    videoFilter: videoFilterReducer,
    playingHistory: playingHistoryReducer,
  }
})