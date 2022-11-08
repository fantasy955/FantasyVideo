import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { ReduxState, VideoFilter } from '../interface'
import { getVideos } from '/@/api/frontend/video'

const initalFilterState: () => VideoFilter = () => {
    return {
        params: {
            topCategory: null,
            subCategory: null,
            order: 'time',
            year: null,
            region: null,
            limit: 18,
            page: 1,
        },
        data: null,
        total: 0,
        total_page: 0,
    }
}

const VideoFilter = createSlice({
    name: 'videoFilter',
    initialState: initalFilterState(),
    reducers: {
        setParams: (state, action) => {
            Object.assign(state.params, action.payload)
            getVideos(
                state.params
            ).then((res) => {
                state.data = res.data.list
                state.total_page = res.data.totolPage
                state.total = res.data.total
            }).catch((err) => { })
        },
    }
})

export const videlFilter = (state: ReduxState) => state.videoFilter

export const selectFilterParms = createSelector(
    videlFilter,
    (state) => state.params
)

export const selectTotalPage = createSelector(
    videlFilter,
    (state) => state.total_page
)

export const selectTotalData = createSelector(
    videlFilter,
    (state) => state.total
)

export const selectVideos = createSelector(
    videlFilter,
    (state) => state.data
)

export default VideoFilter.reducer
