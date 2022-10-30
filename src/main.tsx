import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '/@/lang'
// antd
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.less';
// router
import { router } from './router'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
// react-redux
import store from '/@/redux/store'
import { Provider } from 'react-redux'
import './index.less'
// fake api
import '/@/api/server'
// i18n

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
)
