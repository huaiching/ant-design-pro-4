import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const VDOM: React.FC = () => {
    /* 抽象型別 */
    // 書本 有 名稱、頁數
    type Book = {
        name: string;
        pages: number;
        amt?: number;
        readonly id: number;
    };
    // 產品A: 無選填屬性 amt
    const f_data1: Book = {
        name: "輕鬆學習 TypeScript",
        pages: 150,
        id: 1
    }
    console.log("產品A", f_data1);
    // 產品B: 有選填屬性 amt
    const f_data2: Book = {
        name: "React 真簡單",
        pages: 280,
        amt: 1500,
        id: 2
    }
    console.log("產品B", f_data2);
    
    return (
        <PageContainer> 
            <h1>詳見 F12</h1>
        </PageContainer>
    )
}

export default VDOM
