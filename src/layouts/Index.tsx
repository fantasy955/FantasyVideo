import Layout from "./container/default"
import { useEffect } from "react"
import { signIn } from '/@/api/frontend/user'
import { useDispatch, useSelector } from 'react-redux'
import { sighInSucceed } from '/@/redux/slices/userSlice'
import { setWidth } from '/@/redux/slices/screenSlice'

export default function Index() {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.userinfo.token)
    useEffect(() => {
        window.onresize = () => {
            dispatch(setWidth(document.body.clientWidth))
        }
        dispatch(setWidth(document.body.clientWidth))

        signIn('post', token).then((res) => {
            dispatch(sighInSucceed(res.data))
        })
            .catch((err) => {
            })
    }, [])

    return (
        <div>
            <Layout />
        </div>
    )
}