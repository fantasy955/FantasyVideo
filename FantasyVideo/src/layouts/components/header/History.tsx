import { HistoryOutlined } from '@ant-design/icons'
import styles from './css/History.module.less'
import { useSelector, useDispatch } from 'react-redux'
import { selectHistoryRecords } from '/@/redux/slices/playingHistorySlice'
import { Popover, Divider } from 'antd'
import { PlayingRecord } from '/@/redux/interface'
import { NavLink } from 'react-router-dom'

const HistoryContent = () => {
    const historyRecords = useSelector(selectHistoryRecords)
    console.log(historyRecords)

    return (
        <div style={{ width: 300, maxHeight: 590, overflow: 'auto' }}>
            <div>
                <span className='unSelectContent block'>历史播放记录</span>
            </div>
            <Divider style={{ marginTop: "4px", marginBottom: "4px", width: '100%' }} />
            <div>
                <ul>
                    {
                        historyRecords.map((record: PlayingRecord) => {
                            return (
                                <li>
                                    <NavLink to={`/vod/${record.sourceID}-${record.videoID}-${record.episodeID}`}>{record.videoID + ',' + record.episodeID + ',' + record.sourceID}</NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default function History() {

    return (
        <div className={styles.history}>
            <Popover content={HistoryContent} trigger={["hover"]} placement='bottomLeft'>
                <HistoryOutlined />
                {/* <span>历史播放记录</span> */}
            </Popover>

        </div>
    )
}