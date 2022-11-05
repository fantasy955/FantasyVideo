import { Content } from "antd/lib/layout/layout";
import { Spin, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import styles from './PlayerSelector.module.less'
import { index } from '/@/api/frontend/player'
import { NavLink } from "react-router-dom";

interface VideoPlayerSelecterProps {
    video: Video
    id: number
}
export default function PlayerSelector(props: VideoPlayerSelecterProps) {
    const { id, video } = props
    const [resources, setResources] = useState<any[]>([])
    const [loadingResources, setLoadingResources] = useState(false)
    useEffect(() => {
        setLoadingResources(true)
        index(id).then((res) => {
            // console.log(res.data)
            setResources(res.data.resources)
            setLoadingResources(false)
        }).catch((err) => { })
    }, [id])

    return (
        <Content style={{ height: 800 }}>
            <span className={styles.videoTile}><h1>{`${video.title}在线观看`}</h1></span>
            <Spin spinning={loadingResources}>
                <Tabs items={resources.map((resource) => {
                    return {
                        label: resource.source,
                        key: resource.source,
                        disabled: !resource.files.length,
                        children: <ul>
                            {
                                resource.files.map((file) => {
                                    return <li className={styles.video__url__item}><NavLink to={'#'}>{file.name}</NavLink></li>
                                })
                            }
                        </ul>
                    }
                })}></Tabs>
            </Spin>
        </Content>
    )
}