import { Content } from "antd/lib/layout/layout";
import { Spin, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import styles from './VodSelector.module.less'
import { index } from '/@/api/frontend/player'
import { NavLink } from "react-router-dom";

interface VodSelecterProps {
    video: Video
    id: number
    sourceID?: number
}
export default function VodSelector(props: VodSelecterProps) {
    const { id, video, sourceID } = props
    const [resources, setResources] = useState<any[]>([])
    const [loadingResources, setLoadingResources] = useState(false)
    const [activeSourceID, setActiveSourceID] = useState<string | number | undefined>(sourceID)
    useEffect(() => {
        setLoadingResources(true)
        index(id).then((res) => {
            // console.log(res.data)
            setResources(res.data.resources)
            setLoadingResources(false)
        }).catch((err) => { })
    }, [id])

    return (
        <Content style={{ height: 800 }} id="vod-selector">
            <span className={styles.videoTile}><h1>{`${video.title}在线观看`}</h1></span>
            <Spin spinning={loadingResources}>
                <Tabs
                    activeKey={activeSourceID ? `${activeSourceID}` : undefined}
                    onTabClick={(key: string) => {
                        setActiveSourceID(key)
                    }}
                    items={resources.map((resource) => {
                        return {
                            label: resource.sourceName,
                            key: `${resource.sourceId}`,
                            disabled: !resource.episodes.length,
                            children: <ul>
                                {
                                    resource.episodes.map((episode: any) => {
                                        return <li className={styles.video__url__item} key={`${episode.id}`}>
                                            <NavLink
                                                className={({ isActive }) =>
                                                    isActive ? styles.active : styles.default
                                                }
                                                to={`/vod/${resource.sourceId}-${video.id}-${episode.id}`}
                                                state={{
                                                    resource,
                                                    video,
                                                }}
                                            >
                                                {episode.name}
                                            </NavLink>
                                        </li>
                                    })
                                }
                            </ul>
                        }
                    })}></Tabs>
            </Spin>
        </Content>
    )
}