import { useSelector, useDispatch, useStore } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { removeToken } from '/@/redux/slices/userSlice'

export function useUserToken(type: 'auth' | 'refresh' = 'auth') {
    return type == 'auth' ? useSelector((state) => state.userinfo.token) : useSelector((state) => state.userinfo.refreshToken)
}
