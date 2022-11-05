import { Spin, Space, Image, Descriptions } from "antd";
import React, { useState, useEffect, useRef, forwardRef, ChangeEvent, FormEvent } from 'react'
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getDetail } from '/@/api/frontend/video'
import { selectScreenType, selectMinWidth } from '/@/redux/slices/screenSlice'
import { ScreenType } from '/@/redux/interface'
import PlayerSelector from '/@/components/player/PlayerSelector'


interface VideoDescriptionProps {
    video: Video,
}
export default function VideoDescription(props: VideoDescriptionProps) {
    const { video } = props
    const { t } = useTranslation()
    const [intro, setIntro] = useState('')
    const [showUnfoldIntro, setShowUnfoldIntro] = useState(true)
    const [introOverSize, setIntroOversize] = useState(false)
    const [shortIntro, setShortIntro] = useState('')
    const screenType = useSelector(selectScreenType)
    // const categoryInfo = video.subCategory ? video.subCategory.map((item) => {
    //     t(`video.topCate`)
    // }).join(',') : video.topCategory.map((item) => {

    // }).join(',')
    const [categoryInfo, setCategoryInfo] = useState('')
    useEffect(() => {
        const topCategories = Object.getOwnPropertyNames(video.category)
        const subCategories = topCategories.map((top) => {
            return video.category[top].map((sub) => {
                return t(`video.subCategory.${top}.${sub}`)
            })
        }).flat()
        const strTop = topCategories.map((item) => {
            return t(`video.topCategory.${item}`)
        }).join(',')
        const strSub = subCategories.join(',')
        setCategoryInfo(strSub ? strTop + '/' + strSub : strTop)
    }, [])
    const minWidth = useSelector(selectMinWidth)

    useEffect(() => {
        let limitSize = screenType >= ScreenType.xxl ? 320 : screenType >= ScreenType.xl ? 250 : screenType >= ScreenType.lg ? 180 : screenType >= ScreenType.md ? 80 : 50
        setShortIntro(video.description!.substring(0, limitSize))
        if (video.description!.length > limitSize) {
            setIntroOversize(true)
            setIntro(video.description!.substring(0, limitSize))
            setShowUnfoldIntro(true)
        } else {
            setIntroOversize(false)
            setIntro(video.description!)
        }
    }, [screenType])

    const changeIntro = () => {
        if (showUnfoldIntro) { //切换成完整介绍
            setIntro(video.description!)
        } else {  //切换到收起
            setIntro(shortIntro)
        }
        setShowUnfoldIntro(!showUnfoldIntro)
    }

    const poster = (
        <Descriptions.Item style={{ width: screenType >= ScreenType.lg ? 300 : 150 }}>
            <Image placeholder={true} style={
                screenType >= ScreenType.lg ? { width: 230, height: 300 } : { width: 115, height: 150 }
            } preview={false} src={video.poster}></Image>
        </Descriptions.Item>
    )

    const info = (
        <Descriptions.Item style={{ marginRight: 0 }}>
            <Descriptions contentStyle={{ fontSize: 18 }} labelStyle={{ fontSize: 18 }} title={video.title} column={2} >
                <Descriptions.Item style={{ paddingBottom: 1 }} span={2} label={t(`video.status`) as string}>Zhou Maomao</Descriptions.Item>
                <Descriptions.Item style={{ paddingBottom: 1 }} span={2} label={t(`video.actors`) as string}>
                    {
                        video.actors?.join(', ')
                    }
                </Descriptions.Item>
                <Descriptions.Item style={{ paddingBottom: 1 }} span={2} label={t(`video.related`) as string}>Zhou Maomao</Descriptions.Item>
                <Descriptions.Item style={{ paddingBottom: 1 }} label={t(`video.category`) as string}>
                    {categoryInfo}
                </Descriptions.Item>
                <Descriptions.Item style={{ paddingBottom: 1 }} label={t(`video.updateTime`) as string}>Zhou Maomao</Descriptions.Item>
                <Descriptions.Item style={{ paddingBottom: 1 }} label={t(`video.directors`) as string}>Zhou Maomao</Descriptions.Item>
                <Descriptions.Item style={{ paddingBottom: 1 }} label={t(`video.region`) as string}>Zhou Maomao</Descriptions.Item>
                <Descriptions.Item style={{ paddingBottom: 1 }} label={t(`video.releaseTime`) as string}>Zhou Maomao</Descriptions.Item>
                <Descriptions.Item style={{ paddingBottom: 1 }} label={t(`video.language`) as string}>Zhou Maomao</Descriptions.Item>
                <Descriptions.Item style={{ paddingBottom: 1 }} span={2} label={t(`video.introduction`) as string}>
                    <div>
                        {intro}
                        {introOverSize ?
                            <div style={{ display: 'inline-block' }}>
                                {
                                    showUnfoldIntro ? <span style={{ marginLeft: 8 }}>...</span> : ''
                                }
                                <a style={{ marginLeft: 8 }} onClick={() => { changeIntro() }}> {showUnfoldIntro ? t('video.unfold') as string : t('video.hide') as string}</a>
                            </div>
                            : ''}
                    </div>
                </Descriptions.Item>
            </Descriptions>
        </Descriptions.Item>
    )

    return (
        <div style={{ width: '100%', minWidth: minWidth }}>
            <Space align='start' wrap={true}>
                <Descriptions layout='vertical' style={{ height: 'auto', width: '100%' }} column={3}>
                    {poster}
                    {info}
                    <Descriptions.Item style={{width: '20%'}}>

                    </Descriptions.Item>
                </Descriptions>
            </Space>
            <PlayerSelector id={video.id} video={video} />
        </div>
    )
}