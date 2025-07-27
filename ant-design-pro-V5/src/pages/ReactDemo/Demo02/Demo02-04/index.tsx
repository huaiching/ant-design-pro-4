import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'

const VDOM: React.FC = () => {
    /* 介面 interface */
    interface Person {
        readonly id: number
    }
    interface Person {
        name: string
        age: number
        sex?: string
    }
    // 案例
    const ray: Person = {
        id: 2,
        name: 'ray',
        age: 20,
        sex: '男',
    }
    console.log('ray', ray)
            
    return (
        <PageContainer> 
            <h1>詳見 F12</h1>
        </PageContainer>
)
}

export default VDOM

