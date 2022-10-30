import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Image, Descriptions, Space, Spin } from 'antd'
import { getDetail } from '/@/api/frontend/video'
import videoZhCn from '../lang/pages/zh-cn/video'
import LocationBar from '../components/LocationBar'

export async function loader({ params }) {
    return { id: params.id }
}

export default function VideoDetail() {
    const { id } = useLoaderData()
    const [loading, setLoading] = useState(true)
    const [video, setVideo] = useState<Video | null>(null)
    useEffect(() => {
        getDetail(id).then((res) => {
            setVideo(res.data)
            setLoading(false)
        }).catch((err) => {

        })
    }, [])


    return (
        <div>
            <LocationBar title={video?.title}></LocationBar>
            <Spin spinning={loading}>
                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                    <Space align='start' wrap={true}>
                        <Image placeholder={true} preview={false} style={{ width: 230, height: 300 }} src={video?.poster}></Image>
                        <Descriptions style={{}} bordered={true} size={'default'} title={video?.title}>
                        </Descriptions>
                    </Space>
                </div>
            </Spin>
        </div>

    )
}