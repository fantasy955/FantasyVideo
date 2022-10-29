import axios, { AxiosPromise, Method } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { SpinProps, Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { setToken } from '/@/redux/slices/userSlice'
import { Console } from 'console'

window.requests = []
window.tokenRefreshing = false
const pendingMap = new Map()

export const getUrl = (): string => {
    const value: string = import.meta.env.VITE_AXIOS_BASE_URL as string
    return value == 'getCurrentDomain' ? window.location.protocol + '//' + window.location.host : value
}

export const getUrlPort = (): string => {
    let url = getUrl()
    return new URL(url).port
}

/*
 * 创建Axios
 * 默认开启`reductDataFormat(简洁响应)`,返回类型为`ApiPromise`
 * 关闭`reductDataFormat`,返回类型则为`AxiosPromise`
 */
function createAxios(axiosConfig: AxiosRequestConfig, token: string='', options: Options = {}): ApiPromise | AxiosPromise {
    const Axios = axios.create({
        baseURL: getUrl(),
        timeout: 1000 * 10,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    options = Object.assign(
        {
            CancelDuplicateRequest: true, // 是否开启取消重复请求, 默认为 true
            loading: false, // 是否开启loading层效果, 默认为false
            reductDataFormat: true, // 是否开启简洁的数据结构响应, 默认为true
            showErrorMessage: true, // 是否开启接口错误信息展示,默认为true
            showCodeMessage: true, // 是否开启code不为1时的信息提示, 默认为true
            showSuccessMessage: false, // 是否开启code为1时的信息提示, 默认为false
        },
        options
    )

    // 请求拦截
    Axios.interceptors.request.use(
        (config) => {
            removePending(config)
            options.CancelDuplicateRequest && addPending(config)
            // 自动携带token
            if (config.headers) {
                config.headers['fv-user-token'] = token
            }
            return config
        },
        (error) => {
            console.log(error)
            return Promise.reject(error)
        }
    )

    // 响应拦截
    // 这里使用的是返回数据中的code，而不是response header中的status code
    Axios.interceptors.response.use(
        (response) => {
            removePending(response.config)

            if (options.showCodeMessage && response.data && response.data.code !== 1) {
                if (response.data.code == 409) {  // token 过期
                    return Axios(response.config)
                }
                // 自动跳转到路由name或path，仅限server端返回302的情况
                if (response.data.code == 302) {
                    return Axios(response.config)
                }
                // code不等于1, 页面then内的具体逻辑就不执行了
                return Promise.reject(response.data)
            } else if (options.showSuccessMessage && response.data && response.data.code == 1) {
                return Promise.reject(response.data)
            }
            return options.reductDataFormat ? response.data : response
        },
        (error) => {
            error.config && removePending(error.config)
            return Promise.reject(error) // 错误继续返回给到具体页面
        }
    )

    return Axios(axiosConfig)
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 */
function addPending(config: AxiosRequestConfig) {
    const pendingKey = getPendingKey(config)
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel) => {
            if (!pendingMap.has(pendingKey)) {
                pendingMap.set(pendingKey, cancel)
            }
        })
}

/**
 * 删除重复的请求
 */
function removePending(config: AxiosRequestConfig) {
    const pendingKey = getPendingKey(config)
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey)
        cancelToken(pendingKey)
        pendingMap.delete(pendingKey)
    }
}

/**
 * 生成每个请求的唯一key
 */
function getPendingKey(config: AxiosRequestConfig) {
    let { url, method, params, data, headers } = config
    if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
    return [
        url,
        method,
        headers && headers.batoken ? headers.batoken : '',
        headers && headers['ba-user-token'] ? headers['ba-user-token'] : '',
        JSON.stringify(params),
        JSON.stringify(data),
    ].join('&')
}


interface LoadingInstance {
    target: any
    count: number
}

interface Options {
    // 是否开启取消重复请求, 默认为 true
    CancelDuplicateRequest?: boolean
    // 是否开启loading层效果, 默认为false
    loading?: boolean
    // 是否开启简洁的数据结构响应, 默认为true
    reductDataFormat?: boolean
    // 是否开启接口错误信息展示,默认为true
    showErrorMessage?: boolean
    // 是否开启code不为0时的信息提示, 默认为true
    showCodeMessage?: boolean
    // 是否开启code为0时的信息提示, 默认为false
    showSuccessMessage?: boolean
}

export default createAxios