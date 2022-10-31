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

export interface  ScreenInfo {
    width: number,
}

export type ScreenType =  'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface ReduxState {
    userinfo: UserInfo
    videoMenu: VideoMenu
    screenInfo: ScreenInfo
}


export type VideoMenu = Record<string, string[]>