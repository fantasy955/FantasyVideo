import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover, Button, Divider } from 'antd';
import styles from './QuickUser.module.css'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { createRef, useEffect, useRef, useState } from 'react';
import { userinfo, sighInSucceed, selectRefreshToken, logOut as afterLogOut } from '/@/redux/slices/userSlice'
import { signIn, logOut } from '/@/api/frontend/user'


function content() {
    const dispatch = useDispatch()
    const userInfo = useSelector(userinfo)
    const [login, setLogin] = useState(false)
    const refreshToken = useSelector(selectRefreshToken)
    useEffect(() => {
        if (userInfo.token) {
            signIn('post', userInfo.token).then((res) => {
                setLogin(true)
                dispatch(sighInSucceed(res.data))
            }).catch((err) => {
                // token expired
                if (err.code && err.code === 409) {

                }
            })
        }
    }, [userInfo])

    const handleLogOut = () => {
        logOut(refreshToken).then((res) => {
            dispatch(afterLogOut())
            setLogin(false)
        }).catch((err) => {
            
        })
    }

    const handleLogIn = () => {
        signIn('post', userInfo.token, {
            keeptime: true
        }).then((res) => {
            setLogin(true)
            dispatch(sighInSucceed(res.data))
        }).catch((err) => {
            // token expired
            if (err.code && err.code === 409) {

            }
        })
    }

    const login_page = (
        <div style={{ display: "flex", justifyContent: "space-between", }}>
            <div><h3>{userInfo.username}</h3></div>
            <div>
                <span style={{ cursor: 'pointer' }} onClick={() => { handleLogOut() }}>退出</span>
            </div>
        </div>
    )

    const unLogin_page = (
        <div style={{ display: "flex", justifyContent: "end"}}>
            <span style={{ cursor: 'pointer' }} onClick={() => { handleLogIn() }}>请登录</span>
        </div>
    )

    return (
        <div>
            <div style={{ width: "300px" }}>
                {login ? login_page : unLogin_page}
            </div>
            <Divider style={{ marginTop: "4px", marginBottom: "4px" }} />
        </div>
    )
}



export default function QuickUser() {
    const userInfo = useSelector(userinfo)
    return (
        <Popover content={content} trigger={["hover"]} placement='bottomLeft'>
            <Avatar style={{ cursor: "pointer" }} size="large" icon={<UserOutlined />} src={userInfo.avatar} />
        </Popover>
    )
}