import DefaultLayout from "./container/default"
import { useEffect } from "react"
import { signIn } from '/@/api/frontend/user'
import { useDispatch, useSelector } from 'react-redux'
import { sighInSucceed } from '/@/redux/slices/userSlice'
import { setWidth, selectScreenType } from '/@/redux/slices/screenSlice'
import { setMenu } from '/@/redux/slices/videoMenuSlice'
import { getCategories } from '/@/api/frontend/video'

export default function Index() {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.userinfo.token)
    const screenType = useSelector(selectScreenType)

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null
        window.onresize = () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                dispatch(setWidth(document.body.clientWidth))
                // console.log(document.body.clientWidth)
            }, 100)
        }
        dispatch(setWidth(document.body.clientWidth))

        // signIn('post', token, {
        //     id: 1,
        //     keeptime: false
        // }).then((res) => {
        //     dispatch(sighInSucceed(res.data))
        // })
        //     .catch((err) => {
        //     })

        getCategories().then((res) => {
            dispatch(setMenu(res.data))
        }).catch((err) => { })
    }, [])

    return (
        <div>
            <DefaultLayout />
        </div>
    )
}