import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider, Table } from 'antd';
import CodeTsx from '@/utils/CodePre/CodeTsx';

const { Title, Paragraph, Text } = Typography;

const columns = [
  { title: '特性', dataIndex: 'feature', key: 'feature' },
  { title: 'forEach', dataIndex: 'forEach', key: 'forEach' },
  { title: 'map', dataIndex: 'map', key: 'map' },
];

const dataSource = [
  { key: '1', feature: '返回值', forEach: 'undefined', map: '新陣列' },
  { key: '2', feature: '用途', forEach: '執行副作用', map: '轉換資料' },
  { key: '3', feature: 'React 渲染', forEach: '不適合', map: '適合' },
  { key: '4', feature: '可中斷', forEach: '不可', map: '不可' },
];

const ArrayMapForEachPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - 陣列 - map 與 forEach">
      <Typography>

        <Title level={2}>1. map</Title>
        <Paragraph>
          <Text code>map()</Text> 是陣列的方法，用於將陣列中的每個元素轉換成新的值，並返回一個新陣列
        </Paragraph>
        <ul>
          <li>不會改變原陣列</li>
          <li>返回一個新陣列，長度與原陣列相同</li>
          <li>常用於 React 渲染列表</li>
        </ul>

        <Title level={3}>基本用法</Title>
        <CodeTsx code=
          {`const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(num => num * 2)
console.log(doubled) // [2, 4, 6, 8, 10]
console.log(numbers) // [1, 2, 3, 4, 5] (原陣列不變)`}
        />

        <Title level={3}>轉換物件陣列</Title>
        <CodeTsx code=
          {`const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
]
const userNames = users.map(user => user.name)
console.log(userNames) // ['Alice', 'Bob', 'Charlie']`}
        />

        <Title level={3}>在 React 中使用 map 渲染列表</Title>
        <CodeTsx code=
          {`function UserList() {
  const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
  ]
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.age} 歲
        </li>
      ))}
    </ul>
  )
}`}
        />
        <Paragraph>
          <Text strong>重點</Text>: 在 React 中使用 <Text code>map()</Text> 時，每個元素都需要有唯一的 <Text code>key</Text> 屬性!
        </Paragraph>

        <Title level={3}>map 的完整參數</Title>
        <CodeTsx code=
          {`const numbers = [10, 20, 30]
// map 可以接收三個參數: (元素, 索引, 原陣列)
const result = numbers.map((num, index, array) => {
  console.log(\`元素: \${num}, 索引: \${index}, 原陣列: \${array}\`)
  return num * index
})
console.log(result) // [0, 20, 60]`}
        />

        <Title level={3}>常見錯誤</Title>
        <CodeTsx code=
          {`// 錯誤: 忘記 return
const wrong = [1, 2, 3].map(num => {
  num * 2 // 沒有 return, 結果會是 [undefined, undefined, undefined]
})

// 正確: 使用箭頭函數的隱式返回
const correct1 = [1, 2, 3].map(num => num * 2)
// 正確: 明確使用 return
const correct2 = [1, 2, 3].map(num => {
  return num * 2
})`}
        />

        <Divider />

        <Title level={2}>2. forEach</Title>
        <Paragraph>
          <Text code>forEach()</Text> 是陣列的方法，用於遍歷陣列中的每個元素並執行指定的操作
        </Paragraph>
        <ul>
          <li>不會返回新陣列</li>
          <li>無法中斷迴圈(不能使用 break 或 continue)</li>
          <li>主要用於執行副作用(side effects)</li>
        </ul>

        <Title level={3}>基本用法</Title>
        <CodeTsx code=
          {`const numbers = [1, 2, 3, 4, 5]
numbers.forEach(num => {
  console.log(num)
})
// 輸出: 1 2 3 4 5`}
        />

        <Title level={3}>forEach 的完整參數</Title>
        <CodeTsx code=
          {`const fruits = ['apple', 'banana', 'cherry']
// forEach 可以接收三個參數: (元素, 索引, 原陣列)
fruits.forEach((fruit, index, array) => {
  console.log(\`索引 \${index}: \${fruit}\`)
  console.log(\`原陣列長度: \${array.length}\`)
})`}
        />

        <Divider />

        <Title level={2}>3. map 跟 forEach 的比較</Title>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          size="middle"
        />

      </Typography>
    </PageContainer>
  );
};

export default ArrayMapForEachPage;