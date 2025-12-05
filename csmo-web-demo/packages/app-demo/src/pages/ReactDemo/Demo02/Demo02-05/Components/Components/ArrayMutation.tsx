import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';
import CodeView from '@/utils/CodeView';

const { Title } = Typography;

const ArrayMutationPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - 陣列 - 數值修改">
      <Typography>

        <Title level={2}>1. 直接修改陣列元素</Title>
        <CodeView code=
{`const numbers = [1, 2, 3, 4, 5]

// 透過索引直接修改
numbers[0] = 10
numbers[2] = 30

console.log(numbers) // [10, 2, 30, 4, 5]`}
        />

        <Divider />

        <Title level={2}>2. 修改物件陣列中的特定屬性</Title>

        <CodeView code=
{`const users = [
 { id: 1, name: 'Alice', age: 25 },
 { id: 2, name: 'Bob', age: 30 },
 { id: 3, name: 'Charlie', age: 35 }
]

// 方法 1: 直接修改(會改變原陣列)
users[0].age = 26
console.log(users[0]) // { id: 1, name: 'Alice', age: 26 }

// 方法 2: 使用 map 創建新陣列(不改變原陣列)
const updatedUsers = users.map(user => {
 if (user.id === 2) {
   return { ...user, age: 31 } // 只修改 id 為 2 的使用者
 }
 return user
})

console.log(updatedUsers[1]) // { id: 2, name: 'Bob', age: 31 }
console.log(users[1])       // { id: 2, name: 'Bob', age: 30 } (原陣列不變)`}
        />
      </Typography>
    </PageContainer>
  );
};

export default ArrayMutationPage;