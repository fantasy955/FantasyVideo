interface Window {
    existLoading: boolean
    lazy: NodeJS.Timer
    unique: number
    tokenRefreshing: boolean
    requests: Function[]
    eventSource: EventSource
}

interface ApiResponse<T = any> {
    code: number
    data: T
    msg: string
    time: number
}

interface VideoShortPreview {
    id: number,
    title: string,
    poster: string,
    type: string,
    status: string | null, // 完结/更新
    releaseDate: string | null,
    updateDate: string | null, 
    lang: string | null,  // 语言
}

interface VideoPreview extends VideoShortPreview {

}

interface Video extends VideoPreview {
    region: string | null,
    actors: string[] | null,
    directors: string[] | null,
    description: string | null,
    related: Video[] | null,
}

interface ApiPromise<T = any> extends Promise<ApiResponse<T>> {}
