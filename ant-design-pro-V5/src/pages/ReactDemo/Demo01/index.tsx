import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
// 開頭 進行 元件的載入

// 頁面檔 其實就是一個函式，return 出去的就是要渲染的 html 元件
const myExample: React.FC = () => {
    // 這裡進行 邏輯處理
    return (    // 這裡進行 頁面刻畫，重點是要【包成一個】丟出去
        <PageContainer>
            練習首頁
        </PageContainer>
    )
}

export default myExample;
