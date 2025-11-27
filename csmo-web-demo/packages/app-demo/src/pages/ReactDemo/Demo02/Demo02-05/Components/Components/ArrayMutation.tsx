// src/pages/ArrayMutation/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const ArrayMutationPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - 陣列 - 數值修改">
      <Typography>

        <Title level={2}>1. 直接修改陣列元素</Title>
        <pre>
          <code>
{`const numbers = [1, 2, 3, 4, 5]

// 透過索引直接修改
numbers[0] = 10
numbers[2] = 30

console.log(numbers) // [10, 2, 30, 4, 5]`}
          </code>
        </pre>

        <Divider />

        <Title level={2}>2. 修改物件陣列中的特定屬性</Title>

        <pre>
          <code>
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
          </code>
        </pre>

        <Paragraph type="secondary" style={{ marginTop: 32 }}>
          <Text strong>核心重點總結：</Text><br />
          • 直接用 <Text code>array[index].prop = value</Text> → 會改變原始資料（變異）<br />
          • 用 <Text code>map + spread</Text> → 產生新陣列，原始資料不變（純函數式，React 推薦）<br />
          • 在 React 中，盡量避免直接修改狀態（state），建議使用 <Text code>map</Text> 或 <Text code>immer</Text> 等不可變方式
        </Paragraph>

      </Typography>
    </PageContainer>
  );
};

export default ArrayMutationPage;