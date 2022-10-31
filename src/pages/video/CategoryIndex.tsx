import { Layout, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import LocationBar from '/@/components/LocationBar'
import { getVideos } from '/@/api/frontend/video'
import VideoList from '/@/components/video/VideoList'
import { selectScreenType } from '/@/redux/slices/screenSlice'
import { useSelector } from 'react-redux'

interface CategoryIndexLoaderParams {
    topCategory: string,
    subCategory: string,
}

export function loader({ params }: { params: CategoryIndexLoaderParams }): CategoryIndexLoaderParams {
    return params
}

export default function CategoryIndex() {
    const { Header, Content, Footer } = Layout
    const { topCategory, subCategory } = useLoaderData() as CategoryIndexLoaderParams
    const [videos, setVideos] = useState<Video[]>([])
    const [loadingVideos, setLoadingVideos] = useState(true)
    const sceenType = useSelector(selectScreenType)
    useEffect(() => {
        getVideos({
            topCategory: encodeURI(topCategory),
            subCategory: subCategory ? encodeURI(subCategory) : '',
            limit: 6 * 6,
        }).then((res) => {
            setVideos(res.data.list)
            setLoadingVideos(false)
        }).catch((err) => {

        })
    }, [topCategory, subCategory])

    useEffect(()=>{
        console.log(sceenType)
    }, [sceenType])

    return (
        <div>
            <LocationBar></LocationBar>
            <Layout>
                <Content>
                    <Spin spinning={loadingVideos}>
                        <VideoList videos={videos} topCategory={topCategory} subCategory={subCategory} />
                    </Spin>
                </Content>
                <Footer></Footer>
            </Layout>
        </div>
    )
}