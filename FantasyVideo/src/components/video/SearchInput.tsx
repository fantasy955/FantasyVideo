import React, { useEffect, useRef } from 'react'
import { Input, InputRef } from 'antd'
import styles from './css/SearchInput.module.less'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function action({ request, params }) {

}

export default function SearchInput() {
    const { Search } = Input
    const [searchParams] = useSearchParams()
    const keywords = searchParams.get('keywords')
    const navigate = useNavigate()
    const searchRef = useRef<InputRef | null>(null)

    const handleSearch = (keywords: string) => {
        const to = `/search?keywords=${keywords}`
        navigate(to)
    }

    return (
        <Search
            ref={(c) => { searchRef.current = c }}
            placeholder={'请输入影片名或演员名'}
            className={styles.search}
            maxLength={50}
            type='text'
            id='keywords'
            name='keywords'
            onSearch={(value, event) => { handleSearch(value) }}
        >
        </Search >
    )
}   