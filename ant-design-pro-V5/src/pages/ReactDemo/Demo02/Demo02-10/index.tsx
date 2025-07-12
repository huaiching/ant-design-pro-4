import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const VDOM: React.FC = () => {
    const user = {
      name: '小明',
      age: 18,
      city: '台北'
    }
  
    const msg1 = "我是 " + user.name + "，今年 " + user.age + " 歲，住在 " + user.city + " 。"
    const msg2 = `我是 ${user.name}，今年 ${user.age} 歲，住在 ${user.city} 。`
  
    return (
      <PageContainer>
        <h1>傳統字串： {msg1}</h1>
        <h1>樣板字串： {msg2}</h1>
      </PageContainer>
    );
}

export default VDOM

