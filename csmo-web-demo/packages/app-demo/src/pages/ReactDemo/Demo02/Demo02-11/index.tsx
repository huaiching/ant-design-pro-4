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
        <pre>
{`const b = undefined
if (b === undefined) {
  console.log('b 是 undefined')
} else {
  console.log('b 不是 undefined')
}`}
        </pre>

        <Divider />

        <Title level={2}>判斷是否為 null</Title>
        <pre>
{`const a = null
if (a === null) {
  console.log('a 是 null')
} else {
  console.log('a 不是 null')
}`}
        </pre>

        <Divider />

        <Title level={2}>同時判斷 null 或 undefined（最常用！）</Title>
        <Paragraph>
          使用 <Text code>== null</Text> 可以同時檢查 <Text code>null</Text> 和 <Text code>undefined</Text>
        </Paragraph>
        <pre>
{`const a = null
// 或 const a = undefined 也會進到這裡
if (a == null) {
  console.log('a 是 null 或 undefined')
} else {
  console.log('a 不是空值')
}`}
        </pre>
      </Typography>
    </PageContainer>
  );
};

export default NullUndefinedCheckPage;