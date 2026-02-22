import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'

const VDOM: React.FC = () => {
    // 變數宣告 與 型態設定
    let f_boolean: boolean = true
    const f_number_1: number = 10
    const f_number_2: number = 3.14
    const f_string: string = 'ABC'
    // let 可以 直接改變數值
    f_boolean = false
    // 透過 console 顯示資訊
    console.log('boolean =>', f_boolean)
    console.log('number(整數) =>', f_number_1)
    console.log('number(小數) =>', f_number_2)
    console.log('string =>', f_string)
    return (
        <PageContainer> 
            <h1>詳見 F12</h1>
        </PageContainer>
    )
}

export default VDOM
