import { Content } from "antd/lib/layout/layout";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { removeToken, sighInSucceed } from '/@/redux/slices/userSlice'
import { signIn } from "/@/api/frontend/user";
import store from "/@/redux/store";

export default function content() {
    // 当处在react组件环境下时，这两种方法可以使用
    // 但是处在hook函数时，
    // const userInfo = store.getState().userinfo
    const userInfo = useSelector((state) => state.userinfo)
    const dispatch = useDispatch()

    const location = useLocation()
    const [componentKeyState, setComponentKey] = useState({
        componentKey: location.pathname,
    })

    const handleClick = (e) => {
        console.log(userInfo)
    }

    return (
        <Content style={{ padding: '24px 50px', marginTop: 64}}>
            <Outlet></Outlet>
        </Content>
    )
}