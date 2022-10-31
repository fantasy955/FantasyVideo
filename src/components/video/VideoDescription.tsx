import { Spin, Space, Image, Descriptions } from "antd";
import React, { useState, useEffect, useRef, forwardRef, ChangeEvent, FormEvent } from 'react'
import { useTranslation } from "react-i18next";
import { getDetail } from '/@/api/frontend/video'

interface VideoDescriptionProps {
    video: Video,
}
export default function VideoDescription(props: VideoDescriptionProps) {
    const { video } = props
    const { t } = useTranslation()
    const [intro, setIntro] = useState('')
    const [showUnfoldIntro, setShowUnfoldIntro] = useState(true)
    const [introOverSize, setIntroOversize] = useState(false)
    const shortIntro = video.description!.substring(0, 320)
    useEffect(() => {
        if (video.description!.length > 320) {
            setIntroOversize(true)
            setIntro(shortIntro)
        }
        setIntro(shortIntro)
    }, [])

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
                <Descriptions layout='vertical' style={{ height: showUnfoldIntro ? 300 : 'auto', width: 1200 }} column={2}>
                    <Descriptions.Item style={{ width: 300 }}>
                        <Image placeholder={true} style={{ width: 230, height: 300 }} preview={false} src={video.poster}></Image>
                    </Descriptions.Item>
                    <Descriptions.Item style={{ width: 900 }}>
                        <Descriptions title={video.title} column={2} >
                            <Descriptions.Item style={{ paddingBottom: 1 }} span={2} label={t(`video.status`) as string}>Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item style={{ paddingBottom: 1 }} span={2} label={t(`video.actors`) as string}>Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item style={{ paddingBottom: 1 }} span={2} label={t(`video.related`) as string}>Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item style={{ paddingBottom: 1 }} label={t(`video.category`) as string}>Zhou Maomao</Descriptions.Item>
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
                                            <a style={{ marginLeft: 8 }} onClick={() => { changeIntro() }}> {showUnfoldIntro ? '展开' : '隐藏'}</a>
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