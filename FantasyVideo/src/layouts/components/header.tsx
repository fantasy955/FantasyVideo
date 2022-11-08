import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd'
//import type 是用来协助进行类型检查和声明的，在运行时是完全不存在的。
import QuickUser from './header/QuickUser';
import styles from './header.module.css'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { selectVideoMenu } from '/@/redux/slices/videoMenuSlice'
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import SearchInput from '/@/components/video/SearchInput';

export default function Header() {
    const { Header } = Layout
    const { t } = useTranslation()
    const navigate = useNavigate()
    const handelMenuClick = (info) => {
        const { key } = info
        navigate(`${key}`)
    }
    const videoMenu = useSelector(selectVideoMenu)
    const [videoMenuItems, setVideoMenuItems] = useState<MenuProps['items']>([])

    useEffect(() => {
        const items: MenuProps['items'] = [
            { label: `${t('Home')}`, key: '/' },
        ]
        for (let top in videoMenu) {
            items.push(
                {
                    label: t(`video.topCategory.${top}`) as string, key: `${top}`,
                    popupClassName: 'headerSubMenu',
                    onTitleClick: (e) => { handelMenuClick(e) },
                    children: videoMenu[top].map((sub) => {
                        return {
                            label: t(`video.subCategory.${top}.${sub}`) as string,
                            key: `${top}/${sub}`,
                        } as ItemType
                    })
                }
            )
        }
        setVideoMenuItems(items)
    }, [videoMenu])

    return (
        <Header style={{ position: 'fixed', zIndex: 99, width: '100%'}}>
            <div className={styles.main}>   
                <div className={styles.part}>
                    <Menu mode="horizontal" items={videoMenuItems}
                        selectable={false}
                        style={{ backgroundColor: 'inherit', borderBottom: 0, minWidth: 'max-content', fontSize: 18 }}
                        triggerSubMenuAction='hover'
                        onClick={(e) => { handelMenuClick(e) }
                        }
                    />
                </div>
                <SearchInput />
                <div className={styles.part}>
                    <QuickUser />
                </div>
            </div>
        </Header>
    )
}