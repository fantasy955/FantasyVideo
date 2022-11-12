import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { ReduxState, UserInfo } from "/@/redux/interface";
import { Local } from '/@/utils/storage'
import { USER_INFO } from '../constant/cacheKey'

const initialUserInfo: () => UserInfo = () => {
  if (Local.get(USER_INFO)) {
    return Local.get(USER_INFO) as UserInfo
  }

  return {
    id: 1,
    username: 'tom',
    nickname: 'fantasy955',
    email: '',
    mobile: '',
    gender: 1,
    birthday: '',
    money: 0,
    score: 0,
    avatar: '',
    lastlogintime: '',
    lastloginip: '',
    jointime: '',
    motto: '',
    token: '',
    refreshToken: '',
  }
}

type UserInfoKey = keyof UserInfo

export const userSlice = createSlice({
  name: 'userinfo',
  initialState: initialUserInfo(),
  reducers: {
    sighInSucceed: (state, action) => {
      Object.assign(state, action.payload)
      Local.set(USER_INFO, action.payload)
    },
    logOut: (state) => {
      state.refreshToken = ''
      state.token = ''
      Local.set(USER_INFO, state)
    },
    removeToken: state => {
      state.token = "",
        state.refreshToken = ""
    },
    setToken: (state, action) => {
      state.token = action.payload
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { sighInSucceed, removeToken, setToken, logOut } = userSlice.actions

export const userinfo = (state: ReduxState) => state.userinfo

export const selectRefreshToken = createSelector(
  userinfo,
  (state) => state.refreshToken
)

export const selectUserToken = createSelector(
  userinfo,
  (state) => state.token
)

export const createUserSelector = (key: UserInfoKey) => {
  return createSelector(
    userinfo,
    (state) => state[key]
  )
}

export default userSlice.reducer