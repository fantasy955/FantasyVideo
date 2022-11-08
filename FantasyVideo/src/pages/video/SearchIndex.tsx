import { url } from "inspector"
import { redirect, useLoaderData } from "react-router-dom"
import LocationBar from "/@/components/LocationBar"
import { Divider } from 'antd'
import FilterBar from "/@/components/video/FilterBar"

export function loader({ request }) {
    const url = new URL(request.url)
    const keywords = url.searchParams.get('keywords')
    if (!keywords) {
        return redirect('/')
    }
    return { keywords }
}

export default function SearchIndex() {
    const { keywords } = useLoaderData()
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

            } />
        </div>
    )
}