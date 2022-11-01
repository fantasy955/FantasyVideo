import { Spin, Space, Image, Descriptions } from "antd";
import React, { useState, useEffect, useRef, forwardRef, ChangeEvent, FormEvent } from 'react'
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getDetail } from '/@/api/frontend/video'
import { selectScreenType } from '/@/redux/slices/screenSlice'
import { ScreenType } from '/@/redux/interface'

interface VideoDescriptionProps {
    video: Video,
    pTop: string,
    pSub: string,
}
export default function VideoDescription(props: VideoDescriptionProps) {
    const { video, pTop, pSub } = props
    const { t } = useTranslation()
    const [intro, setIntro] = useState('')
    const [showUnfoldIntro, setShowUnfoldIntro] = useState(true)
    const [introOverSize, setIntroOversize] = useState(false)
    const [shortIntro, setShortIntro] = useState('')
    const screenType = useSelector(selectScreenType)
    const [topCategory, setTopCategory] = useState<string | null>(null)
    const [subCategory, setSubCategory] = useState<string | null>(null)
    useEffect(()=>{
        if (pTop){
            setTopCategory(pTop)
        }else{
            setTopCategory(video.topCategory[0])
        }
        if (pSub){
            setSubCategory(pSub)
        }else if (video.subCategory){
            setSubCategory(video.subCategory[0])
        }
    }, [])
    useEffect(() => {
        let limitSize = screenType >= ScreenType.xl ? 320 : screenType >= ScreenType.lg ? 200 : screenType >= ScreenType.md ? 100 : 50
        setShortIntro(video.description!.substring(0, limitSize))
        if (video.description!.length > limitSize) {
            setIntroOversize(true)
            setIntro(video.description!.substring(0, limitSize))
        } else {
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

    return (
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Space align='start' wrap={true}>
                <Descriptions layout='vertical' style={{ height: showUnfoldIntro ? 300 : 'auto', width: '100%' }} column={2}>
                    <Descriptions.Item style={{ width: 300 }}>
                        <Image placeholder={true} style={{ width: 230, height: 300 }} preview={false} src={video.poster}></Image>
                    </Descriptions.Item>
                    <Descriptions.Item style={{ marginRight: 0 }}>
                        <Descriptions title={video.title} column={2} >
                            <Descriptions.Item style={{ paddingBottom: 1 }} span={2} label={t(`video.status`) as string}>Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item style={{ paddingBottom: 1 }} span={2} label={t(`video.actors`) as string}>
                                {
                                    video.actors?.join(', ')
                                }
                            </Descriptions.Item>
                            <Descriptions.Item style={{ paddingBottom: 1 }} span={2} label={t(`video.related`) as string}>Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item style={{ paddingBottom: 1 }} label={t(`video.category`) as string}>
                                {
                                    subCategory ? t(`video.topCategory.${topCategory}`) + ', ' +  t(`video.subCategory.${topCategory}.${subCategory}`) as string :  t(`video.topCategory.${topCategory}`) as string
                                }
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
                                            <span style={{ marginLeft: 8 }}>...</span>
                                            <a style={{ marginLeft: 8 }} onClick={() => { changeIntro() }}> {showUnfoldIntro ? t('video.unfold') : t('video.hide')}</a>
                                        </div>
                                        : ''}
                                </div>
                            </Descriptions.Item>
                        </Descriptions>
                    </Descriptions.Item>
                </Descriptions>
            </Space>
        </div>
    )
}