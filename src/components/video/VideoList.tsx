import VedioItem from "./VideoItem"
import { Card } from 'antd'

interface VedioListProps {
    videos: Video[]
}

export default function VedioList(props: VedioListProps) {

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start', alignItems: 'center', columnGap: '16px', rowGap: '16px'}}>
            {
                props.videos.map((item) => {
                    return <VedioItem key={item.id} video={item} />
                })
            }
        </div>
    )
}