// src/pages/NullUndefinedCheck/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const NullUndefinedCheckPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - 空值判斷 (null 與 undefined)">
      <Typography>

        <Title level={2}>JavaScript 的兩種空值</Title>
        <Paragraph>
          <ul>
            <li><Text strong>null</Text>：空指標（主動設為無值）</li>
            <li><Text strong>undefined</Text>：未初始化、未定義（預設值）</li>
          </ul>
        </Paragraph>

        <Divider />

        <Title level={2}>判斷是否為 undefined</Title>
        <pre><code>{`const b = undefined
if (b === undefined) {
  console.log('b 是 undefined')
} else {
  console.log('b 不是 undefined')
}`}</code></pre>

        <Divider />

        <Title level={2}>判斷是否為 null</Title>
        <pre><code>{`const a = null
if (a === null) {
  console.log('a 是 null')
} else {
  console.log('a 不是 null')
}`}</code></pre>

        <Divider />

        <Title level={2}>同時判斷 null 或 undefined（最常用！）</Title>
        <Paragraph>
          使用 <Text code>== null</Text> 可以同時檢查 <Text code>null</Text> 和 <Text code>undefined</Text>
        </Paragraph>
        <pre><code>{`const a = null
// 或 const a = undefined 也會進到這裡
if (a == null) {
  console.log('a 是 null 或 undefined')
} else {
  console.log('a 不是空值')
}`}</code></pre>

        <Paragraph type="secondary" style={{ marginTop: 32 }}>
          <Text strong>React / TypeScript 實務中最推薦寫法：</Text><br />
          <Text code>{`if (value == null) { /* 安全處理 */ }`}</Text><br />
          <Text code>{`const name = user?.name ?? '匿名'`}</Text> （可選鏈 + 空值合併）<br />
          這是前端工程師每天都會用到的「防呆神技」！
        </Paragraph>

      </Typography>
    </PageContainer>
  );
};

export default NullUndefinedCheckPage;