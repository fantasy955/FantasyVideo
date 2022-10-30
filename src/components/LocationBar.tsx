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
    if (pathSnippets[0] === 'detail') {
        topCategory = decodeURI(pathSnippets[1])
        subCategory = decodeURI(pathSnippets[2])
    } else {
        if (pathSnippets.length === 1) { // 一级类别首页
            topCategory = pathSnippets[1]
        } else if (pathSnippets.length === 2) { // 二级类别  
            subCategory = pathSnippets[2]
        }
    }
    if (topCategory) {
        breadcrumbItems.push(
            (
                <Breadcrumb.Item key={`/${pathSnippets[1]}`}>
                    <Link to={`/${pathSnippets[1]}`}>{t(`video.topCategory.${topCategory}`)}</Link>
                </Breadcrumb.Item>
            )
        )
        if (subCategory) {
            breadcrumbItems.push(
                (
                    <Breadcrumb.Item key={`/${pathSnippets[1]}/${pathSnippets[2]}`}>
                        <Link to={`/${pathSnippets[1]}/${pathSnippets[2]}`}>{t(`video.subCategory.${topCategory}.${subCategory}`)}</Link>
                    </Breadcrumb.Item>
                )
            )
        }
    }

    return (
        <div>
            <Breadcrumb>
                {breadcrumbItems}
            </Breadcrumb>
            <Divider></Divider>
        </div>

    )

}