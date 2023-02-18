import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'antd'
import styles from './css/SearchInput.module.less'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'

export function action({ request, params }: any) {

}

export default function SearchInput() {
    const { Search } = Input
    const [searchParams] = useSearchParams()
    const initKeywords = searchParams.get('keywords')
    const [keywords, setKeywords] = useState<string>(initKeywords ? initKeywords : '')
    const navigate = useNavigate()
    const searchRef = useRef<HTMLInputElement | null>(null)

    // const handleSearch = () => {
    //     const keywords = searchRef.current!.value
    //     if (keywords) {
    //         const to = `/search?keywords=${keywords}`
    //         navigate(to)
    //     }
    // }

    // const handleEnterSearch = (e: KeyboardEvent) => {
    //     if (e.code === 'Enter') { //主要区别就是这里，可以直接获取到keyCode的值
    //         handleSearch()
    //     }
    // }

    const handleSearch = (keywords: string) => {
        if (keywords) {
            const to = `/search?keywords=${keywords}`
            navigate(to)
        }
    }

    useEffect(() => {
        if (initKeywords) {
            setKeywords(initKeywords)
        }
    }, [initKeywords])

    useEffect(() => {
        // searchRef.current!.addEventListener('keypress', handleEnterSearch)
        // return () => {
        //     searchRef.current!.removeEventListener('keypress', handleEnterSearch)
        // }
    }, [])

    useEffect(() => {
        // searchRef.current!.value = keywords ? keywords : ''
    }, [keywords])

    return (
        // <div className={styles.search} >
        //     <input ref={(c) => { searchRef.current = c }} placeholder={'请输入影片名或演员名'} name='keywords' />
        //     <Button icon={<SearchOutlined />} onClick={() => handleSearch()}></Button>
        // </div >
        <Search
            placeholder={'请输入影片名或演员名'}
            className={styles.search}
            maxLength={50}
            value={keywords}
            onChange={(e) => { setKeywords(e.target.value) }}
            type='text'
            id='keywords'
            name='keywords'
            onSearch={(value, event) => { handleSearch(value) }}
        >
        </Search >
    )
}   