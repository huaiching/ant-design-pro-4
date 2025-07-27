import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'

const VDOM: React.FC = () => {
    /* 聯集 (或) */
    // 類型A: 書本 有 名稱、頁數
    type Book = {
        name: string
        pages: number
    }
    // 類型B: 電腦 有 RAM、CPU
    type PC  = {
        RAM: string
        CPU: string
    }
    // 產品 可以是 書 或 電腦
    type Product = Book | PC
    // 第一種產品，內容 = 書
    const f_data1: Product = {
        name: '輕鬆學習 TypeScript',
        pages: 150,
    }
    console.log('第一種產品', f_data1)
    // 第二種產品
    const f_data2: Product = {
        RAM: '64GB',
        CPU: 'i9',
    }
    console.log('第二種產品', f_data2)

    
    return (
        <PageContainer>
            <h1>詳見 F12</h1>
        </PageContainer>
    )
}

export default VDOM

