import createAxios from '/@/utils/axios'

const controllerUrl = '/api/user/'
const accountUrl = '/api/account/'

export function signIn(method: 'get' | 'post', token: string='', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'signIn',
        data: params,
        method: method,
    }, token) as ApiPromise
}