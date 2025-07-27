import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'

const VDOM: React.FC = () => {
    /* 一般陣列 */
    const f_numbers: number[] = [1,5,3,2,4]
    /* 泛型陣列 */
    console.log("宣告", f_numbers)
    const f_currency: string[] = []
    
    // 新增資料
    f_numbers.push(6)
    console.log("新增資料", f_numbers)
    // 陣列長度
    const f_length = f_numbers.length
    console.log("陣列長度", f_length)
    // 排序 (小到大)
    const f_sortA = f_numbers.sort()
    console.log("排序 (小到大)", f_sortA)
    // 排序 (大到小)
    const f_sortB = f_numbers.sort((x,y) => y-x)
    console.log("排序 (大到小)", f_sortB)

    // 泛型範例
    f_currency.push("TWD")
    f_currency.push("USD")
    console.log("泛型", f_currency)
    
    return (
        <PageContainer> 
            <h1>詳見 F12</h1>
        </PageContainer>
    )
}

export default VDOM


