import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'

const VDOM: React.FC = () => {
    // 範例: if
    const sex = '1'
    let data1 = ""
    if (sex === '1') {
        data1 = "男"
    } else {
        data1 = "女"
    }
    
    // 範例: 三元表達式
    const age = 18
    const data2 = (age>=18 ? '成年' : '未成年')

    // 範例: for 
    const data3 = []
    for (let i = 1 ; i < 5 ; i++) {
        data3.push(<li>{i}</li>)
    }

    // 範例: foreach
    const data4 = ['a','b','c','d']
    data4.forEach((data) => {
        data3.push(<li>{data}</li>)
    })
    const data5 = data4.map((data) => {
        return <li key={data}>{data}</li>
    })
    
    return (
        <PageContainer>
            <h3>年齡: {age}，是否成年: {data2}，性別: {data1}</h3>
            <ul>
                第一區塊: {data3}
                第二區塊: {data5}
            </ul>
        </PageContainer>
    )
}

export default VDOM

