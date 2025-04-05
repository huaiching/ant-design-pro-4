import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import SubDom from './components/subDom';

const VDOM: React.FC = () => {
    // 要傳遞的數據
    const userData = {
        name: '王大明',
        age: 25,
        sex: '男'
    }
    return (
        <PageContainer>
            {/* 這種寫法 是將每個要傳遞的屬性 單獨寫出來 */}
            <div>
                <h1>單獨傳遞</h1>
                <SubDom name={userData.name} age={userData.age} sex={userData.sex}/>
            </div>
            
            {/* 下面的寫法，代表傳遞 userData 中全部的屬性 */}
            <div>
                <h1>同時傳遞</h1>
                <SubDom {...userData}/>
            </div>
            
        </PageContainer>
    )
}

export default VDOM


