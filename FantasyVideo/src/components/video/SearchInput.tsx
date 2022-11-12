import React, { useEffect, useRef } from 'react'
import { Button, Input, InputRef } from 'antd'
import styles from './css/SearchInput.module.less'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'

export function action({ request, params }) {

}

export default function SearchInput() {
    const [searchParams] = useSearchParams()
    const keywords = searchParams.get('keywords')
    const navigate = useNavigate()
    const searchRef = useRef<HTMLInputElement | null>(null)

    const handleSearch = () => {
        const keywords = searchRef.current!.value
        if (keywords) {
            const to = `/search?keywords=${keywords}`
            navigate(to)
        }
    }

    const handleEnterSearch = (e: KeyboardEvent) => {
        if (e.code === 'Enter') { //主要区别就是这里，可以直接获取到keyCode的值
            handleSearch()
        }
    }

    useEffect(() => {
        searchRef.current!.addEventListener('keypress', handleEnterSearch)
        return () => {
            searchRef.current!.removeEventListener('keypress', handleEnterSearch)
        }
    }, [])

    useEffect(() => {
        searchRef.current!.value = keywords ? keywords : ''
    }, [keywords])

    return (
        <div className={styles.search} >
            <input ref={(c) => { searchRef.current = c }} placeholder={'请输入影片名或演员名'} name='keywords' />
            <Button icon={<SearchOutlined />} onClick={() => handleSearch()}></Button>
        </div >
        // <Search
        //     ref={(c) => { searchRef.current = c }}
        //     placeholder={'请输入影片名或演员名'}
        //     className={styles.search}
        //     maxLength={50}
        //     type='text'
        //     id='keywords'
        //     name='keywords'
        //     onSearch={(value, event) => { handleSearch(value) }}
        // >
        // </Search >
    )
}   