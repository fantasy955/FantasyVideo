import { Layout } from 'antd'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import LocationBar from '../components/LocationBar'

export async function loader({ params }) {
    return { topCategory: params.topCategory, subCategory: params.subCategory }
}

export default function CategoryIndex() {
    const { Header, Content, Footer } = Layout
    const { topCategory, subCategory } = useLoaderData()
    useEffect(() => {
        console.log(subCategory)
    }, [])

    return (
        <div>
            <LocationBar></LocationBar>
            <Layout>
                <Header></Header>
                <Content>
                    {topCategory}
                </Content>
                <Footer></Footer>
            </Layout>
        </div>
    )
}