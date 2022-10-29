import { Card } from 'antd';
import { useState } from 'react';

interface VideoItemProps {
    video: Video,
}

export default function VideoItem(props: VideoItemProps) {
    const { video } = props
    const [loading, setLoding] = useState(false)
    return (
        <Card hoverable
            bordered={false}
            style={{ width: 180, height: 280, overflow: 'hidden' }}
            bodyStyle={{ padding: 4 }}
            cover={<img style={{ width: '180px', height: '230px' }} alt={video.title} src={video.poster} />}
            onMouseOver={() => { }}>
            <div style={{height: 280}}>
                {video.title}
            </div>
        </Card>
    )
}