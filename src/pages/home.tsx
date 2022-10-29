import { ReduxState, UserInfo } from '/@/redux/interface/'
import { useSelector } from 'react-redux'
import { createUserSelector } from '/@/redux/slices/userSlice'
import { useEffect, useState } from 'react'
import { getHotVideo } from '../api/frontend/video'
import VideoList from '../components/video/VideoList'
import { Spin } from 'antd'

interface CategoryIndexState {
    videos: Video[],
    loading: boolean,
}

export default function Home() {
    const signInState = useSelector(createUserSelector('signIn'))
    const token = useSelector(createUserSelector('token')) as string
    const [homeVideos, setHomeVideos] = useState<Video[]>([])
    const [loadHomeVideos, setLoadHomeVideos] = useState(true)
    useEffect(() => {
        getHotVideo({
            // category: 'animation',
            limit: 15
        }).then((res) => {
            // console.log(res.data)
            setHomeVideos(res.data.list)
            setLoadHomeVideos(false)
        }).catch(err => {
        })
    }, [])

    return (
        <div>
            <Spin spinning={loadHomeVideos}>
                <VideoList videos={homeVideos} />
            </Spin>
        </div>
    )
}