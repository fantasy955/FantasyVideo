import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Image, Descriptions, Space } from 'antd'

export async function loader({ params }) {
    return { id: params.id }
}

export default function VideoDetail() {
    const { id } = useLoaderData()
    console.log(id)

    useEffect(() => {

    }, [])


    return (
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
            <Space align='start' wrap={true}>
                <Image placeholder={true} preview={false} style={{ width: 230, height: 300 }}></Image>
                <Descriptions style={{}} bordered={true} size={'default'} title={'DEMO'}></Descriptions>
            </Space>

        </div>
    )
}