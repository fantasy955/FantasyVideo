import createAxios from '/@/utils/axios'

const controllerUrl = '/api/video/'

export function getHotVideo(params: object = {}){
    return createAxios({
        url: controllerUrl + 'hot',
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