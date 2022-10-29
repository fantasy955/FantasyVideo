import { Layout } from 'antd';
import QuickUser from './header/QuickUser';
import styles from './header.module.css'

export default function Header() {
    const { Header } = Layout
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className={styles.main}>
                <div className={styles.part}>
                    Header
                </div>
                <div className={styles.part}>
                    <QuickUser />
                </div>
            </div>
        </Header>
    )
}