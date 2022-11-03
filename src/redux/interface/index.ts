export interface UserInfo {
    id: number
    username: string
    nickname: string
    email: string
    mobile: string
    gender: number
    birthday: string
    money: number
    score: number
    avatar: string
    lastlogintime: string
    lastloginip: string
    jointime: string
    motto: string
    token: string
    refreshToken: string,
    signIn?: boolean,
}

export interface SiteConfig {
    site_name: string
    record_number?: string
    version: string
}

export interface ScreenInfo {
    width: number,
    minWidth: number
}

export enum ScreenType {
    xs = 480,
    sm = 576,
    md = 768,
    lg = 992,
    xl = 1200,
    xxl = 1600,
}

export interface VideoFilter {
    params: {
        topCategory: string | null,
        subCategory: string | null,
        order: string | null,
        year: number | null,
        region: string | null,
        limit: number | null,
        page: number | null,
    },
    data: Video[] | null,
    total: number | null,
    total_page: number | null,
}


export interface ReduxState {
    userinfo: UserInfo
    videoMenu: VideoMenu
    screenInfo: ScreenInfo
    videoFilter: VideoFilter
}

export type VideoMenu = Record<string, string[]>