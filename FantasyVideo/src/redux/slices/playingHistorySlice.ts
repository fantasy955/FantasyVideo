import { createSelector, createSlice } from "@reduxjs/toolkit";
import { PLAYING_HOSTORY } from "../constant/cacheKey";
import { Local } from "/@/utils/storage";
import { PlayingHistory, PlayingRecord, ReduxState } from '../interface'

const timeFilter = (record: PlayingRecord) => {
    let { time } = record
    if (time.toString().length === 10) {
        time = +time * 1000
    }
    const current = Number(new Date())
    return (current - time) <= 1000 * 60 * 60 * 24 * 7
}

const initialPlayingHistoryState: () => PlayingHistory = () => {
    if (Local.get(PLAYING_HOSTORY)) {
        const data = (Local.get(PLAYING_HOSTORY) as PlayingRecord[]).filter((item) => timeFilter(item))
        Local.set(PLAYING_HOSTORY, data)
        return { records: data }
    } else {
        return { records: [] }
    }
}

const playingHistorySlice = createSlice({
    name: 'playingHistoty',
    initialState: initialPlayingHistoryState(),
    reducers: {
        deleteRecord: (state, action) => {
            const videoID = Number(action.payload)
            state.records = state.records.filter((record) => {
                return record.videoID !== videoID
            })
            Local.set(PLAYING_HOSTORY, state.records)
        },
        updateRecord: (state, action) => {
            const { videoID, episodeID, sourceID, time } = action.payload
            const hisory = state.records.find((record) => record.videoID === Number(videoID))
            if (hisory) {
                hisory.time = Number(time)
                hisory.episodeID = Number(episodeID)
                hisory.sourceID = Number(sourceID)
            } else {
                state.records.push({
                    videoID: Number(videoID),
                    sourceID: Number(sourceID),
                    episodeID: Number(episodeID),
                    time: Number(time),
                })
            }
            Local.set(PLAYING_HOSTORY, state.records)
        }
    }
})

export const playingHistory = (state: ReduxState) => state.playingHistory

export const selectHistoryRecords = createSelector(
    playingHistory,
    (state) => state.records
)

export const { deleteRecord, updateRecord } = playingHistorySlice.actions

export default playingHistorySlice.reducer