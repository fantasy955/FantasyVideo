import { Content } from "antd/lib/layout/layout";
import { useLoaderData, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react'
import VodSelector from "/@/components/player/VodSelector";
import { getDetail } from '/@/api/frontend/video'
import { Divider } from "antd";
import LocationBar from "/@/components/LocationBar";
import HLS from 'hls.js'

export function loader({ params }) {
    const { sourceID, videoID, episodeID } = params
    return { sourceID, videoID, episodeID }
}

export default function Index() {
    const location = useLocation()
    const { sourceID, videoID, episodeID } = useLoaderData()
    const playerRef = useRef<HTMLElement | null>(null)
    const routeState = location.state
    // 该媒体源下的所有资源
    const [resource, setResource] = useState<string | null>(routeState ? routeState.resource : null)
    // 媒体源名称
    const [source, setSource] = useState<string | null>(routeState ? routeState.source : null)
    const [video, setVideo] = useState<Video | null>(routeState ? routeState.video : null)
    useEffect(() => {
        playerRef.current!.focus()
        // var video = document.getElementById('video2') as HTMLMediaElement;
        // if (HLS.isSupported()) {
        //     var hls = new HLS();
        //     hls.loadSource('https://yunqivedio.alicdn.com/2017yq/v2/0x0/96d79d3f5400514a6883869399708e11/96d79d3f5400514a6883869399708e11.m3u8');
        //     hls.attachMedia(video);
        //     hls.on(HLS.Events.MANIFEST_PARSED, function () {
        //         video.play();
        //     });
        // }
    }, [])

    useEffect(() => {
        if (!resource) {
            console.log('请求resource资源')
        }
    }, [resource])

    useEffect(() => {

    }, [source])

    useEffect(() => {
        if (!video || video.id !== videoID) {
            getDetail(Number(videoID)).then((res) => {
                setVideo(res.data.video)
            }).catch((err) => { })
        }
    }, [videoID])

    useEffect(() => {
        console.log(`加载第${episodeID}集视频`)
    }, [episodeID])

    return (
        <Content>
            <LocationBar />
            <div ref={(c) => { playerRef.current = c }} style={{ width: '100%', height: '600px', backgroundColor: 'black' }}>
                <iframe src={`/app/api/player/vod/${videoID}`} style={{ width: '100%', height: '100%' }} scrolling='no'></iframe>
            </div>
            {/* <div style={{ width: '96%', margin: '30px auto' }}>
                <video id="video2" controls loop={false} width="100%"></video>
            </div> */}
            <Divider></Divider>
            {
                video ?
                    <VodSelector video={video} id={videoID} sourceID={sourceID} /> : ''
            }
        </Content>
    )
}