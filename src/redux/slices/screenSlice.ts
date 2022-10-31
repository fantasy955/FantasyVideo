import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { ReduxState, ScreenInfo, ScreenType } from '../interface'

const initalScrrenState: () => ScreenInfo = () => {
    return {
        width: 1200,
    }
}

const screenSlice = createSlice({
    name: 'screenSclice',
    initialState: initalScrrenState(),
    reducers: {
        setWidth: (state, action) => {
            state.width = action.payload
        }
    }
})

export default screenSlice.reducer

export const screenInfo = (state: ReduxState) => state.screenInfo

export const selectScreenWidth = createSelector(
    screenInfo,
    (state) => state.width
)

export const selectScreenType: (state: ReduxState) => ScreenType = (state) => {
    const { width } = state.screenInfo
    if (width >= 1600){
        return 'xxl'
    }else if (width >= 1200){
        return 'xl'
    }else if (width >= 992){
        return 'lg'
    }else if (width >= 768){
        return 'md'
    }else if (width >= 576){
        return 'sm'
    }else{
        return 'xs'
    }
}

export const { setWidth } = screenSlice.actions
