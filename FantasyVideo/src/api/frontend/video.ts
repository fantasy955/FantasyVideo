import createAxios from '/@/utils/axios'

// 以/开头，表示根路径
const controllerUrl = '/api/video/'

export function getVideos(params: {}){
    return createAxios({
        url: controllerUrl + 'index',
        params: params,
        method: 'get',
    }) as ApiPromise
}

export function getCategories(){
    return createAxios({
        url: controllerUrl + 'menu/index',
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