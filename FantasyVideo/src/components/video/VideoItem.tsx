import { Card } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './css/VideoItem.module.css'

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
        let itemTop = Object.getOwnPropertyNames(video.category)[0]
        let itemSub = video.category[itemTop].length ? video.category[itemTop][0] : ''

        if (topCategory) {
            itemTop = topCategory
            itemSub = ''
            if (subCategory) {
                itemSub = subCategory
            }
        } 
        if (itemSub) {
            navigate(`/detail/${itemTop}/${itemSub}/${video.id}`)
        } else {
            navigate(`/detail/${itemTop}/${video.id}`)
        }
    }

    return (
        <Card hoverable
            bordered={false}
            style={{ width: 180, height: 280, overflow: 'hidden' }}
            bodyStyle={{ padding: 4 }}
            className = {styles.video}
            cover={<img style={{ width: '180px', height: '230px' }} alt={video.title} src={video.poster} />}
            onMouseOver={() => { }}
            onClick={() => handleClick()}>
            <div style={{ height: 280 }}>
                {video.title}
            </div>
        </Card>
    )
}