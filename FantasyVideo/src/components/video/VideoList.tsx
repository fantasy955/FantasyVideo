import VedioItem from "./VideoItem"
import { Card, Divider, PageHeader } from 'antd'
import { selectScreenType } from '/@/redux/slices/screenSlice'
import { ScreenType } from "/@/redux/interface"
import { useSelector } from 'react-redux'
import { CSSProperties } from "react"

interface VedioListProps {
    videos: Video[]
    topCategory?: string,
    subCategory?: string,
    title?: string,
    style?: CSSProperties
}

export default function VedioList(props: VedioListProps) {
    const { topCategory, subCategory } = props
    const screenType = useSelector(selectScreenType)

    return (
        <div style={props.style}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '16px',
                rowGap: '16px',
                maxWidth: screenType >= ScreenType.xl ? 1200 : screenType >= ScreenType.md ? 600 : 300,  // 每行6个
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                {props.title ? <div style={{width: '100%'}}><PageHeader style={{ padding: 0 }} title={props.title} /> <Divider style={{ margin: 6 }} /></div> : ''}
                {
                    props.videos.map((item) => {
                        return <VedioItem key={item.id} video={item} topCategory={topCategory} subCategory={subCategory} />
                    })
                }
            </div>
        </div>

    )
}