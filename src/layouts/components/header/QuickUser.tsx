import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover, Button, Divider } from 'antd';
import styles from './QuickUser.module.css'
import { useStore, useSelector } from 'react-redux'
import { createRef, useRef } from 'react';


function content() {
    const userInfo = useSelector((state) => state.userinfo)
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", width: "300px" }}>
                <div><h3>{userInfo.username}</h3></div>
                <div>
                    <span style={{ cursor: 'pointer' }}>退出</span>
                </div>
            </div>
            <Divider style={{ marginTop: "4px", marginBottom: "4px" }} />
        </div>
    )
}



export default function QuickUser() {

    return (
        <Popover content={content} trigger={["hover"]} placement='bottomLeft'>
            <Avatar style={{ cursor: "pointer" }} size="large" icon={<UserOutlined />} />
        </Popover>
    )
}