import createAxios from '/@/utils/axios'

const controllerUrl = '/api/video/'

export type VideoQueryParams = {
    'topCategory': string,
    'subCategory': string | '' | null,
    'limit': number,
    'keywords': string,
    'order': 'hot' | 'time' | 'recommendation' | null | '',
    'id'?: number,
    'page'?: number,
}

export function getVideos(params: object = {}){
    return createAxios({
        url: controllerUrl + 'index',
        params: params,
        method: 'get',
    }) as ApiPromise
}

export function getCategories(){
    return createAxios({
        url: controllerUrl + 'category/index',
        params: null,
        method: 'get',
    }) as ApiPromise
}

export function getDetail(id: number){
    return createAxios({
        url: controllerUrl + 'detail',
        params: {id},
        method: 'get',
    })
}