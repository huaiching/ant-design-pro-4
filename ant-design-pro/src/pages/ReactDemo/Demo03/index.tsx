import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Button, Space } from "antd";
import { useState } from "react";

const VDOM: React.FC = () => {
    // 宣告
    const [isHot, setIsHot] = useState(true)
    // 天氣的顯示設定
    const isHotDesc = isHot ? '炎熱' : '涼爽'
    // 透過函式改變天氣值
    // 因為 天氣值 isHot 是狀態機，所以改變時會啟動畫面重新渲染
    // 因此 顯示的 天氣中文內容 就會同步改變
    function chgWeather () {
        setIsHot(!isHot)
    }
    return (
        <PageContainer>
            <Space>
                <Button type="primary" onClick={chgWeather}>改變天氣</Button>
                <h3>今天天氣很{isHotDesc}</h3>
            </Space>
        </PageContainer>
    )
}

export default VDOM


