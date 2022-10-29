import { Breadcrumb } from 'antd';
import React, { useEffect } from 'react';
import { useMatch } from 'react-router-dom'

export default function LocationBar() {
    useEffect(() => {

    }, [])
    return (
        <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
                <a href="">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <a href="">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
    )

}