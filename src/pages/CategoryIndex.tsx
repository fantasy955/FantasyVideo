import { Layout } from 'antd'
import { useLoaderData } from 'react-router-dom'

export async function loader({ params }) {
    return { category: params.category }
}

export default function CategoryIndex() {
    const { Header, Content, Footer } = Layout
    const { category } = useLoaderData()

    return (
        <Layout>
            <Header></Header>
            <Content>
                {category}
            </Content>
            <Footer></Footer>
        </Layout>
    )
}