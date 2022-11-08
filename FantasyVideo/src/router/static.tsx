import { redirect, RouteObject } from 'react-router-dom'
import IndexLayout from '/@/layouts/Index'
import HomePage from '/@/pages/home'
import ErrorPage from '/@/pages/ErrorPage'
import CategoryIndex, { loader as CategotyIndexLoader } from '../pages/video/CategoryIndex'
import VideoDetail, { loader as VideoDetailLoader } from '../pages/video/VideoDetail'
import path from 'path'
import SearchIndex, { loader as searchLoader } from '../pages/video/SearchIndex'
import PlayerIndex, { loader as PlayerLoader } from '/@/pages/player/Index'


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
                    }, {
                        path: '/detail/:top/:sub/:id',
                        loader: VideoDetailLoader,
                        element: <VideoDetail />,
                    }, {
                        path: '/detail/:top/:id',
                        loader: VideoDetailLoader,
                        element: <VideoDetail />,
                    }, {
                        path: '/search',
                        loader: searchLoader,
                        element: <SearchIndex></SearchIndex>
                    }, {
                        path: '/vod/:sourceID-:videoID-:episodeID',
                        loader: PlayerLoader,
                        element: <PlayerIndex />
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