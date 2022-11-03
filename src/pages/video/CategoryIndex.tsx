import { Layout, Spin, Divider } from 'antd'
import { useEffect, useState } from 'react'
import { useLoaderData, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import LocationBar from '/@/components/LocationBar'
import { getVideos } from '/@/api/frontend/video'
import VideoList from '/@/components/video/VideoList'
import { selectScreenType } from '/@/redux/slices/screenSlice'
import { useSelector } from 'react-redux'
import FilterBar from '/@/components/video/FilterBar'

// interface CategoryIndexLoaderParams {
//     topCategory: string,
//     subCategory: string,
// }

export function loader({ params }) {
    return {
        topCategory: params.topCategory,
        subCategory: params.subCategory ? params.subCategory : '',
    }
}

export default function CategoryIndex() {
    const { Header, Content, Footer } = Layout
    const { topCategory, subCategory } = useLoaderData()
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams();
    const order = searchParams.get('order') ? searchParams.get('order') : 'time'
    const region = searchParams.get('region') ? searchParams.get('region') : ''
    const year = searchParams.get('year') ? searchParams.get('year') : null
    const [videos, setVideos] = useState<Video[]>([])
    const [loadingVideos, setLoadingVideos] = useState(true)
    const sceenType = useSelector(selectScreenType)

    useEffect(() => {
        setLoadingVideos(true)
        getVideos({
            topCategory: encodeURI(topCategory),
            subCategory: subCategory ? encodeURI(subCategory) : '',
            limit: 6 * 6,
        }).then((res) => {
            setVideos(res.data.list)
            setLoadingVideos(false)
        }).catch((err) => {
            setLoadingVideos(false)
        })
    }, [topCategory, subCategory, order, region, year])


    const handleSearch = (params:
        {
            top: string
            sub: string
            order: string
            year: number
            region: string
        }
    ) => {
        const { top, sub, order, year, region } = params
        const withSearch = order ? true : year ? true : region ? true : false
        const to = `/${top}${sub ? `/${sub}` : ''}` +
            `${withSearch ? '?' + `${order ? 'order=' + order + '&' : ''}${year ? 'year=' + year + '&' : ''}${region ? 'region=' + region + '&' : ''}` : ''}`
        navigate(to)
    }

    return (
        <div>
            <LocationBar></LocationBar>
            <Divider style={{ marginTop: 4, marginBottom: 4 }}></Divider>
            <FilterBar params={{ topCategory, subCategory, order, year, region }} handleSearch={handleSearch} />
            {/* <FilterBar  /> */}
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