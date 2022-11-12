import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover, Button, Divider } from 'antd';
import styles from './css/QuickUser.module.less'
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
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", }}>
                <div><h3>{userInfo.username}</h3></div>
                <div>
                    <span style={{ cursor: 'pointer' }} onClick={() => { handleLogOut() }}>退出</span>
                </div>
            </div>
            <Divider style={{ marginTop: "4px", marginBottom: "4px", width: '100%' }} />
        </div>
    )

    const unLogin_page = (
        <div style={{ width: '100%' }} className='unSelectContent'>
            <div>
                <span className='unSelectContent block'>登录之后可以</span>
            </div>
            <Divider style={{ marginTop: "4px", marginBottom: "4px", width: '100%' }} />
            <div style={{ display: 'flex', userSelect: 'none', justifyContent: 'space-around', marginTop: 16 }}>
                <a className={styles.feature__item}>
                    <img className={styles.icon_feature} src="https://vfiles.gtimg.cn/wupload/vqqcom.quick_features_test/20220722_rx7xg90c9779gn05qesxfhhn0o39lknc.png" />
                    <span className={styles.icon_text}>个人主页</span>
                </a>
                <a className={styles.feature__item}>
                    <img className={styles.icon_feature} src="https://vfiles.gtimg.cn/vupload/20200619/92045c1592554803837.png" />
                    <span className={styles.icon_text}>云同步播放历史</span>
                </a>
            </div>
            <Divider style={{ marginTop: "4px", marginBottom: "4px", width: '100%' }} />
            <span style={{ cursor: 'pointer' }} onClick={() => { handleLogIn() }}>请登录</span>
        </div>
    )

    return (
        <div style={{ width: "300px" }}>
            {login ? login_page : unLogin_page}
        </div>
    )
}



export default function QuickUser() {
    const userInfo = useSelector(userinfo)
    return (
        // 由于头像被放置边缘
        // 当placement 为bottom时
        // Popover的箭头在中间，而剩余空间并不足以让窗口显示在正下方，因此箭头会错位
        <Popover content={content} trigger={["hover"]} placement='bottomLeft' >
            <Avatar style={{ cursor: "pointer" }} size="large" icon={<UserOutlined />} src={userInfo.avatar} />
        </Popover>
    )
}