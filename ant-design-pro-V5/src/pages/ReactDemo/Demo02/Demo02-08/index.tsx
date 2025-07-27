import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'

const VDOM: React.FC = () => {
    /* 交集 (且) */
    // 類型A: 軟體 有 作業系統、版本
    type Software  = {
        system: string
        version: string
    }
    // 類型B: 硬體 有 RAM、CPU
    type Hardware   = {
        RAM: string
        CPU: string
    }
    // 手機 同時要有 硬體 和 軟體
    type Phone = Software & Hardware
    // 產品: iPhone 15
    const f_data: Phone = {
        system: 'ios',
        version: '17.0',
        RAM: '16GB',
        CPU:'A16'
    }
    console.log('iPhone 15', f_data)
    

    return (
        <PageContainer>
            <h1>詳見 F12</h1>
        </PageContainer>
    )
}

export default VDOM

