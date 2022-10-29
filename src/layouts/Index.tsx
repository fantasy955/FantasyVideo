import Layout from "./container/default"
import { useEffect } from "react"
import { signIn } from '/@/api/frontend/user'
import { useDispatch, useSelector } from 'react-redux'
import { sighInSucceed } from '/@/redux/slices/userSlice'

export default function Index() {
    const dispatch = useDispatch()
    const token = useSelector((state)=>state.userinfo.token)
    useEffect(() => {
        signIn('post', token).then((res) => {
            // console.log(res.data)
            dispatch(sighInSucceed(res.data))
        })
        .catch((err) => {
            // console.log(err)
        })
    }, [])

    return (
        <div>
            <Layout />
        </div>
    )
}