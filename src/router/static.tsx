import { RouteObject } from 'react-router-dom'
import IndexLayout from '/@/layouts/Index'
import HomePage from '/@/pages/home'
import ErrorPage from '/@/pages/ErrorPage'
import CategoryIndex, { loader as CategotyIndexLoader } from '../pages/video/CategoryIndex'
import VideoDetail, { loader as VideoDetailLoader } from '../pages/video/VideoDetail'
import path from 'path'


const staticRoutes: Array<RouteObject> = [
    {
        path: '/',
        element: <IndexLayout />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                errorElement: <ErrorPage></ErrorPage>,
                children: [
                    {
                        index: true,
                        element: <HomePage />
                    },
                    {
                        path: '/detail/:top/:sub/:id',
                        loader: VideoDetailLoader,
                        element: <VideoDetail />,
                    },
                    {
                        path: '/detail/:top/:id',
                        loader: VideoDetailLoader,
                        element: <VideoDetail />,
                    }
                ]
            },
        ]
    }
]



staticRoutes[0].children!.push(
    ...['/:topCategory', '/:topCategory/:subCategory'].map((path) => {
        return {
            path: path,
            loader: CategotyIndexLoader,
            element: <CategoryIndex />,
        }
    })
)


export { staticRoutes }