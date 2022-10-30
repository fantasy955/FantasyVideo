import { Layout, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import LocationBar from '../components/LocationBar'
import { getVideos } from '/@/api/frontend/video'
import VideoList from '/@/components/video/VideoList'

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
    useEffect(() => {
        getVideos({
            topCategory: encodeURI(topCategory),
            subCategory: subCategory? encodeURI(subCategory) : '',
            limit: 6*6,
        }).then((res) => {
            setVideos(res.data.list)
            setLoadingVideos(false)
        }).catch((err) => {

        })
    }, [topCategory, subCategory])

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