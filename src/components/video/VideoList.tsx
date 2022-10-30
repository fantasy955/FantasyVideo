import VedioItem from "./VideoItem"
import { Card } from 'antd'

interface VedioListProps {
    videos: Video[]
    topCategory?: string,
    subCategory?: string,
}

export default function VedioList(props: VedioListProps) {
    const { topCategory, subCategory } = props
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'start',
            alignItems: 'center',
            columnGap: '16px',
            rowGap: '16px',
            width: 1200,  // 每行6个
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            {
                props.videos.map((item) => {
                    return <VedioItem key={item.id} video={item} topCategory={topCategory} subCategory={subCategory} />
                })
            }
        </div>
    )
}