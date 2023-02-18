import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Image, Spin, Divider } from 'antd'
import { getDetail } from '/@/api/frontend/video'
import LocationBar from '/@/components/LocationBar'
import VideoDescription from '/@/components/video/VideoDescription'

export async function loader({ params }: any) {
    return { id: params.id }
}

export default function VideoDetail() {
    const { id } = useLoaderData() as any
    const [loading, setLoading] = useState(true)
    const [video, setVideo] = useState<Video | null>(null)
    useEffect(() => {
        getDetail(id).then((res) => {
            // console.log(res)
            setVideo(res.data.video)
            setLoading(false)
        }).catch((err) => {

        })
    }, [])


    return (
        <div>
            <LocationBar title={video?.title}></LocationBar>
            <Divider style={{marginTop: 4, marginBottom: 4}}></Divider>
            <Spin spinning={loading}>
                {
                    video ? <VideoDescription video={video} /> : <></>
                }
            </Spin>
        </div>

    )
}