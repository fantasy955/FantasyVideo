import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Image, Descriptions, Space, Spin } from 'antd'
import { getDetail } from '/@/api/frontend/video'
import LocationBar from '/@/components/LocationBar'
import VideoDescription from '/@/components/video/VideoDescription'

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
                {
                    video ? <VideoDescription video={video} /> : <></>
                }
            </Spin>
        </div>

    )
}