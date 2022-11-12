import createAxios from '/@/utils/axios'

const controllerUrl = '/app/api/user/'
const accountUrl = '/app/api/account/'

export function signIn(method: 'get' | 'post', token: string='', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'signin',
        data: params,
        method: method,
    }, token) as ApiPromise
}

export function logOut(refresh_token: string=''){
    return createAxios({
        url: controllerUrl + 'signin',
        method: 'post',
        data: {
            refresh_token
        },
    })
}