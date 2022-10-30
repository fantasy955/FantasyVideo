import { RouteObject } from 'react-router-dom'
import IndexLayout from '/@/layouts/Index'
import HomePage from '/@/pages/home'
import ErrorPage from '/@/pages/ErrorPage'
import CategoryIndex, { loader as CategotyIndexLoader } from '../pages/CategoryIndex'
import VideoDetail, { loader as VideoDetailLoader } from '../pages/VideoDetail'


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
                        path: '/:topCategory',
                        loader: CategotyIndexLoader,
                        element: <CategoryIndex></CategoryIndex>,
                    },
                    {
                        path: '/:topCategory/:subCategory',
                        loader: CategotyIndexLoader,
                        element: <CategoryIndex></CategoryIndex>,
                    },
                    {
                        path: '/detail/:top/:sub/:id',
                        loader: VideoDetailLoader,
                        element: <VideoDetail />,
                    }
        ]
    },
]
    }
]

export { staticRoutes }