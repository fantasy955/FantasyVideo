import createAxios from "/@/utils/axios";

const controllerUrl = '/app/api/player/'

export function index(id: number) {
    return createAxios({
        url: `${controllerUrl}index`,
        params: { id },
        method: 'get',
    })
}