import { Layout } from 'antd'
import Header from '../components/header'
import Content from '/@/layouts/router-view/content'

export default function layout() {
    const { Footer} = Layout

    return (
        <Layout>
            <Header></Header>
            <Content></Content>
            <Footer></Footer>
        </Layout>
    )
}