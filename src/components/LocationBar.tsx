import { Breadcrumb, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useMatch, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function LocationBar(props: {
    title?: string
}) {
    const { t, i18n } = useTranslation()
    const loction = useLocation()
    const breadcrumbItems = [(
        <Breadcrumb.Item key={'/'}>
            <Link to={'/'}>{t('Home')}</Link>
        </Breadcrumb.Item>
    )]
    const pathSnippets = location.pathname.split('/').filter(i => i);
    let topCategory = null
    let subCategory = null
    let title = null
    if (pathSnippets[0] === 'detail') {  // 影片详情页
        if (pathSnippets.length == 4) {
            topCategory = decodeURI(pathSnippets[1])
            subCategory = decodeURI(pathSnippets[2])
        } else if (pathSnippets.length == 3) {
            topCategory = decodeURI(pathSnippets[1])
        }
        if (props.title) title = decodeURI(props.title)
    }else if(pathSnippets[0] === 'search'){

    } else { // 类别首页
        if (pathSnippets.length === 1) { // 一级类别首页
            topCategory = decodeURI(pathSnippets[0])
        } else if (pathSnippets.length === 2) { // 二级类别  
            topCategory = decodeURI(pathSnippets[0])
            subCategory = decodeURI(pathSnippets[1])
        }
    }
    if (topCategory) {
        breadcrumbItems.push(
            (
                <Breadcrumb.Item key={`/${topCategory}`}>
                    <Link to={`/${topCategory}`}>{t(`video.topCategory.${topCategory}`) as string}</Link>
                </Breadcrumb.Item>
            )
        )
        if (subCategory) {
            breadcrumbItems.push(
                (
                    <Breadcrumb.Item key={`/${topCategory}/${subCategory}`}>
                        <Link to={`/${topCategory}/${subCategory}`}>{t(`video.subCategory.${topCategory}.${subCategory}`) as string}</Link>
                    </Breadcrumb.Item>
                )
            )
        }
    }
    if (title) {
        breadcrumbItems.push(
            (
                <Breadcrumb.Item key={`/${topCategory}/${subCategory}`}>
                    <a>{title}</a>
                </Breadcrumb.Item>
            )
        )
    }

    return (
        <div>
            <Breadcrumb style={{ fontSize: 16 }}>
                {breadcrumbItems}
            </Breadcrumb>
        </div>

    )

}