import { ReduxState, UserInfo } from '/@/redux/interface/'
import { useSelector, useDispatch } from 'react-redux'
import { createUserSelector } from '/@/redux/slices/userSlice'
import { useEffect, useState } from 'react'
import { getVideos } from '../api/frontend/video'
import VideoList from '../components/video/VideoList'
import { Spin } from 'antd'
import { selectTopCategory } from '/@/redux/slices/videoMenuSlice'
import { useTranslation } from 'react-i18next'


interface CategoryIndexState {
    videos: Video[],
    loading: boolean,
}

export default function Home() {
    const { t } = useTranslation()
    const token = useSelector(createUserSelector('token')) as string
    const [homeVideos, setHomeVideos] = useState<Video[]>([])
    const [loadHomeVideos, setLoadHomeVideos] = useState(true)
    const topCategoryList = useSelector(selectTopCategory)
    const [hotVideosByCategory, setHotVideosByCategory] = useState<Record<string, { videos: Video[], loading: boolean }>>({})
    useEffect(() => {
        getVideos({
            limit: 18
        }).then((res) => {
            // console.log(res.data.list)
            setHomeVideos(res.data.list)
            setLoadHomeVideos(false)
        }).catch((err) => {
            // console.log(err) 
        })
    }, [])

    useEffect(() => {
        let videos: Record<string, { videos: Video[], loading: boolean }> = {}
        let timer: NodeJS.Timer | null = null
        for (let top of topCategoryList) {
            videos[top] = { videos: [], loading: true }
            getVideos(({
                limit: 18,
                topCategory: encodeURI(top),
            })).then((res) => {
                videos[top].videos = res.data.list
                videos[top].loading = false
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(() => {
                    setHotVideosByCategory(videos)
                }, 100)
            }).catch((err) => {
                // console.log(err)
            })
        }
    }, [topCategoryList])

    // useEffect(() => {
    //     console.log(hotVideosByCategory)
    // }, [hotVideosByCategory])

    return (
        <div>
            <Spin spinning={loadHomeVideos}>
                <VideoList videos={homeVideos} title={'最新热门影片推荐'} />
            </Spin>
            {
                topCategoryList.map((category) => {
                    return (
                        <Spin key={category} spinning={!hotVideosByCategory[category] || hotVideosByCategory[category].loading}>
                            {
                                !hotVideosByCategory[category] ? '' :
                                    <VideoList style={{ marginTop: 16 }}
                                        topCategory={category}
                                        videos={hotVideosByCategory[category].videos}
                                        title={'最新' + t(`video.topCategory.${category}`)} />
                            }
                        </Spin>
                    )
                })
            }
        </div>
    )
}