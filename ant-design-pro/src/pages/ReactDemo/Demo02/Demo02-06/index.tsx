import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const VDOM: React.FC = () => {
    // 函式宣告: 使用 剩餘函數
    function sum(...numbers: number[]): number {
        let f_sum = 0;
        numbers.forEach((number) => {
            f_sum += number;
        });
        return f_sum;
    }
    const f_value_1 = sum(1,2,3,4,5);
    // 箭頭函式
    const diff = (x: number, y: number): number => {
        return x-y
    }
    const f_value_2 = diff(5,2)
    
    return (
        <PageContainer>
            <h2>1+2+3+4+5= {f_value_1}</h2>
            <h2>5-2= {f_value_2}</h2>
        </PageContainer>
    )
}

export default VDOM

