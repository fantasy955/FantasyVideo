import VedioItem from "./VideoItem"
import { Card } from 'antd'
import { selectScreenType } from '/@/redux/slices/screenSlice'
import { ScreenType } from "/@/redux/interface"
import { useSelector } from 'react-redux'

interface VedioListProps {
    videos: Video[]
    topCategory?: string,
    subCategory?: string,
}

export default function VedioList(props: VedioListProps) {
    const { topCategory, subCategory } = props
    const screenType = useSelector(selectScreenType)

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'start',
            alignItems: 'center',
            columnGap: '16px',
            rowGap: '16px',
            width: screenType >= ScreenType.xl ? 1200 : screenType >= ScreenType.md ?  600 : 300,  // 每行6个
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