import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { ReduxState, UserInfo } from "/@/redux/interface";

const initialUserInfo: () => UserInfo = () => {
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
    signIn: false,
  }
}

type UserInfoKey = keyof UserInfo

export const userSlice = createSlice({
  name: 'userinfo',
  initialState: initialUserInfo(),
  reducers: {
    sighInSucceed: (state, action) => {
      Object.assign(state, action.payload)
      state.signIn = true
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
export const { sighInSucceed, removeToken, setToken } = userSlice.actions

const userinfo = (state: ReduxState) => state.userinfo

export const selectSignInState = createSelector(
  userinfo,
  (state) => state.signIn
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