import { useTranslation } from "react-i18next"
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from "react"
import { Divider } from "antd"
import styles from './css/FilterBar.module.less'
// import './FilterBar.module.less'
import { selectTopCategory, selectVideoMenu } from '/@/redux/slices/videoMenuSlice'
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from 'react-router-dom'
import latestLogo from '/@/assets/svg/latest.svg'
import hotestLogo from '/@/assets/svg/hotest.svg'
import recommendedLogo from '/@/assets/svg/recommended.svg'

interface FilterBarProps {
    params: {
        topCategory: string,
        subCategory: string,
        year: number | null | string,
        region: string | null,
        order: string | null,
    },
    title: string | React.ReactNode
    handleSearch: (params: any) => void
}

function GetAbsoluteLocation(element: HTMLElement | null) {
    if (arguments.length != 1 || element == null) {
        return null;
    }
    var offsetTop = element.offsetTop;
    var offsetLeft = element.offsetLeft;
    var offsetWidth = element.offsetWidth;
    var offsetHeight = element.offsetHeight;
    while (element = element.offsetParent as HTMLElement) {
        offsetTop += element.offsetTop;
        offsetLeft += element.offsetLeft;
    }
    return {
        absoluteTop: offsetTop, absoluteLeft: offsetLeft,
        offsetWidth: offsetWidth, offsetHeight: offsetHeight
    };
}

export default function FilterBar(props: FilterBarProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const videoTopCategories = useSelector(selectTopCategory)
    const videoMenu = useSelector(selectVideoMenu)
    const location = useLocation()
    const [showFilter, setShowFilter] = useState(false)
    const { topCategory, subCategory, order, year, region } = props.params
    const { handleSearch, title } = props
    const searchAreaRef = useRef<HTMLElement | null>(null)
    const searchMainAreaRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const clickListener = (e: MouseEvent) => {
            const titleRect = searchAreaRef.current?.getClientRects()
            const mainRect = searchMainAreaRef.current?.getClientRects()
            // console.log(GetAbsoluteLocation(searchMainAreaRef.current))
            if (mainRect?.length) {
                const [x, y] = [e.clientX, e.clientY]
                // console.log('点击', x, y)
                // console.log('主要区域', mainRect[0])
                if (y > mainRect[0].y || x < mainRect[0].x || x > mainRect[0].x + mainRect[0].width) {
                    // console.log('隐藏')
                    // setShowFilter(false)
                }
            }
        }
        document.addEventListener('click', clickListener)

        return () => {
            document.removeEventListener('click', clickListener)
        }
    }, [])

    const categoryArea = (
        <div className={styles.search__area}>
            <span className={styles.search__type}>
                按分类
            </span>
            <div>
                <div className={styles.search__area__detail}>
                    {
                        videoTopCategories.map((top) => {
                            return <span key={top}
                                className={top !== topCategory ? styles.search__item : [styles.search__item, styles.search__item__active].join(' ')}
                                onClick={() => {
                                    handleSearch({
                                        top: top,
                                        sub: '',
                                        order,
                                        year,
                                        region,
                                    })
                                }}
                            >{t(`video.topCategory.${top}`) as string}</span>
                        })
                    }
                </div>
                {topCategory && videoMenu[topCategory].length ?
                    <div className={styles.search__area__detail}>
                        {
                            videoMenu[topCategory!].map((sub) => {
                                return <span key={sub}
                                    className={[styles.search__item, sub === subCategory ? styles.search__item__active : null].join(' ')}
                                    onClick={() => {
                                        handleSearch({
                                            top: topCategory,
                                            sub: sub,
                                            order,
                                            year,
                                            region,
                                        })
                                    }}
                                >{t(`video.subCategory.${topCategory}.${sub}`) as string}</span>
                            })
                        }
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    )

    const yearArea = (
        <div className={styles.search__area}>
            <span className={styles.search__type}>
                按时间
            </span>
            <div>
                <div className={styles.search__area__detail}>
                    <span className={[styles.search__item, year === null ? styles.search__item__active : null].join(' ')}
                        onClick={() => {
                            handleSearch({
                                top: topCategory,
                                sub: subCategory,
                                order,
                                year: '',
                                region,
                            })
                        }}
                    >全部</span>
                    {
                        Array.from({ length: 20 }, (v, i) => (2023 - i)).map((t: number) => {
                            return <span key={t}
                                className={Number(year) !== t ? styles.search__item : [styles.search__item, styles.search__item__active].join(' ')}
                                onClick={() => {
                                    handleSearch({
                                        top: topCategory,
                                        sub: subCategory,
                                        order,
                                        year: t,
                                        region,
                                    })
                                }}
                            >{t}</span>
                        })
                    }
                </div>
            </div>
        </div>
    )

    const regionArea = (
        <div className={styles.search__area}>
            <span className={styles.search__type}>
                按地区
            </span>
            <div>
                <div className={styles.search__area__detail}>
                    <span className={[styles.search__item, region === '' ? styles.search__item__active : null].join(' ')}
                        onClick={() => {
                            handleSearch({
                                top: topCategory,
                                sub: subCategory,
                                order,
                                year,
                                region: '',
                            })
                        }}
                    >全部</span>
                    {
                        ['大陆', '香港', '台湾', '美国', '韩国', '日本', '泰国', '新加坡', '马来西亚', '印度', '英国', '法国', '加拿大',
                            '西班牙', '俄罗斯', '德国', '其它'].map((r: string) => {
                                return <span key={r}
                                    className={r !== region ? styles.search__item : [styles.search__item, styles.search__item__active].join(' ')}
                                    onClick={() => {
                                        handleSearch({
                                            top: topCategory,
                                            sub: subCategory,
                                            order,
                                            year,
                                            region: r,
                                        })
                                    }}
                                >{r}</span>
                            })
                    }
                </div>
            </div>
        </div>
    )

    return (
        <div
            ref={(c) => { searchAreaRef.current = c }}
            style={{ marginBottom: 4, position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', height: 40, width: '100%', border: '1px solid #e8e8e8' }}>
                <span style={{
                    margin: 4, padding: 4, backgroundColor: '#1a7edb', color: 'white', cursor: 'pointer'
                }}>
                    {title ? title :
                        topCategory ? `${t(`video.order.${order}`)}` + (subCategory ? `${t(`video.subCategory.${topCategory}.${subCategory}`)}` :
                            `${t(`video.topCategory.${topCategory}`)}`) : ''}
                </span>
                <span style={{
                    cursor: 'pointer', padding: 4, color: '#1a7edb', userSelect: 'none', marginBottom: showFilter ? -1 : 0,
                    backgroundColor: 'rgb(240, 242, 245)'
                }}
                    onClick={(e) => {
                        setShowFilter(!showFilter)
                    }}
                >
                    <Divider type="vertical" style={{ height: '100%' }} />
                    {t('video.filter') as string}
                    {
                        !showFilter ? <DownOutlined /> : <UpOutlined />
                    }
                </span>
            </div>
            <div
                ref={(c) => searchMainAreaRef.current = c}
                style={{
                    display: showFilter ? 'block' : 'none', width: '100%', zIndex: '1',
                    border: '1px solid #e8e8e8', backgroundColor: 'rgb(240, 242, 245)', borderTop: 0,
                    position: 'absolute', top: 40
                }}>
                {categoryArea}
                {yearArea}
                {regionArea}
            </div>
            <div className={styles.order}>
                <span className={styles.order__item}>
                    <a onClick={
                        () => {
                            handleSearch({
                                top: topCategory,
                                sub: subCategory,
                                order: 'time',
                                year,
                                region,
                            })
                        }
                    }><img src={latestLogo}></img>最新</a>
                </span>
                <span className={styles.order__item}>
                    <a onClick={
                        () => {
                            handleSearch({
                                top: topCategory,
                                sub: subCategory,
                                order: 'hot',
                                year,
                                region,
                            })
                        }
                    }><img src={hotestLogo}></img>最热</a>
                </span>
                <span className={styles.order__item}>
                    <a onClick={
                        () => {
                            handleSearch({
                                top: topCategory,
                                sub: subCategory,
                                order: 'recommendation',
                                year,
                                region,
                            })
                        }
                    }><img src={recommendedLogo}></img>推荐</a>
                </span>
            </div>
        </div >
    )
}

FilterBar.defaultProps = {
    params: {
        topCategory: '',
        subCategory: '',
        year: null,
        region: '',
        order: '',
    },
    title: '',
    handleSearch: () => { }
}