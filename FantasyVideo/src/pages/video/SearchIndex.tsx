import { url } from "inspector"
import { Layout, Spin, Divider } from 'antd'
import { redirect, useLoaderData, useNavigate, useResolvedPath, useLocation, useSearchParams } from "react-router-dom"
import { useCallback, useState, useEffect } from 'react';
import LocationBar from "/@/components/LocationBar"
import FilterBar from "/@/components/video/FilterBar"
import { getVideos } from '/@/api/frontend/video'
import VideoList from '/@/components/video/VideoList'

export function loader({ request }: any) {
    const url = new URL(request.url)
    const keywords = url.searchParams.get('keywords')
    if (!keywords) {
        return redirect('/')
    }
    return { keywords }
}

export default function SearchIndex() {
    const { Header, Content, Footer } = Layout
    const { keywords } = useLoaderData() as any
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const order = searchParams.get('order') ? searchParams.get('order') : 'time'
    const region = searchParams.get('region') ? searchParams.get('region') : ''
    const year = searchParams.get('year') ? searchParams.get('year') : null
    const top = searchParams.get('top') ? searchParams.get('top') : null
    const sub = searchParams.get('sub') ? searchParams.get('sub') : null
    const [loadingVideos, setLoadingVideos] = useState(true)
    const [videos, setVideos] = useState<Video[]>([])

    const handleSearch = useCallback((params:
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
        let to = `${location.pathname}` +
            `?keywords=${keywords}${withSearch ? '&' +
                `${top ? 'top=' + top + '&' : ''}${sub ? 'sub=' + sub + '&' : ''}${order ? 'order=' + order + '&' : ''}${year ? 'year=' + year + '&' : ''}${region ? 'region=' + region + '&' : ''}` : ''}`
        if (to.endsWith('&')) {
            to = to.substring(0, to.length - 1)
        }
        // console.log(to);
        navigate(to)
    }, []);

    useEffect(() => {
        setLoadingVideos(true)
        getVideos({
            topCategory: !!top ? encodeURI(top) : '',
            subCategory: !!sub ? encodeURI(sub) : '',
            limit: 6 * 6,
        }).then((res) => {
            setVideos(res.data.list)
            setLoadingVideos(false)
        }).catch((err) => {
            setLoadingVideos(false)
        })
    }, [top, sub, order, region, year])

    return (
        <div>
            <LocationBar></LocationBar>
            <Divider style={{ marginTop: 4, marginBottom: 4 }}></Divider>
            <FilterBar title={
                <span>
                    <span>
                        {keywords}
                    </span>
                    <span>
                        搜索结果
                    </span>
                </span>
            }
                params={{ topCategory: top, subCategory: sub, order, year, region }}
                handleSearch={handleSearch}
            />
            <Layout>
                <Content>
                    <Spin spinning={loadingVideos}>
                        <VideoList videos={videos} topCategory={top} subCategory={sub} />
                    </Spin>
                </Content>
                <Footer></Footer>
            </Layout>
        </div>
    )
}