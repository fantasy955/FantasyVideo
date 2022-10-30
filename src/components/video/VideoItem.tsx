import { Card } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

interface VideoItemProps {
    video: Video,
    topCategory?: string,
    subCategory?: string,
}

export default function VideoItem(props: VideoItemProps) {
    const { video, topCategory, subCategory } = props
    const navigate = useNavigate()
    const [loading, setLoding] = useState(false)
    const handleClick = () => {
        let itemTop = video.topCategory[0]
        let itemSub = video.subCategory ? video.subCategory[0] : null
        if (topCategory) {
            itemTop = topCategory
        }
        if (subCategory) {
            itemSub = subCategory
        }
        if (itemSub) {
            navigate(`/detail/${itemTop}/${itemSub}/${video.id}`)
        }else{
            navigate(`/detail/${itemTop}/${video.id}`)
        }
    }

    return (
        <Card hoverable
            bordered={false}
            style={{ width: 180, height: 280, overflow: 'hidden' }}
            bodyStyle={{ padding: 4 }}
            cover={<img style={{ width: '180px', height: '230px' }} alt={video.title} src={video.poster} />}
            onMouseOver={() => { }}
            onClick={() => handleClick()}>
            <div style={{ height: 280 }}>
                {video.title}
            </div>
        </Card>
    )
}