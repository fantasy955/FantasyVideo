## 项目结构

- FantasyVideo

前端项目，基于React框架开发

- app/api

放置api路由文件

- config

放置数据库配置文件

- core

koa初始化，数据库初始化，token生成等工具函数

- middlewares

中间件函数，进行token验证等操作

## 项目重心

本项目主要是研究前端技术，为了对前端有更深入的了解，不再专注后端数据接口以及数据存储方面，只定义最基础的基础，返回假数据。



# 前端特性

## axios封装

- 自动添加token

登录后，将用户redux状态持久化到localStorage，通过`Axios.interceptors.request.use`拦截请求，为请求添加token。

## redux，redux-toolkit状态管理

- localStorage持久化

自动将用户信息、观看记录用localStorage保存；状态初始化时自动加载。

