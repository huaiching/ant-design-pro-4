// src/pages/UnionTypes/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const UnionTypesPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - 聯集型別 (Union Types | )">
      <Typography>

        <Title level={2}>聯集型別 (或) - Union Types</Title>
        <Paragraph>
          只要符合 <Text code>型別A</Text> 或 <Text code>型別B</Text> 其中一種即可
        </Paragraph>

        <Title level={3}>語法</Title>
        <pre><code>{`let 變數名稱: (型別A | 型別B) = 數值`}</code></pre>

        <Divider />

        <Title level={2}>完整範例</Title>
        <pre>
          <code>
{`import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const VDOM: React.FC = () => {
    /* 聯集 (或) */
    // 類型A: 書本
    type Book = {
        name: string;
        pages: number;
    };
    // 類型B: 電腦
    type PC = {
        RAM: string;
        CPU: string;
    };
    // 產品 可以是 書 或 電腦
    type Product = Book | PC;

    // 第一種產品：書
    const f_data1: Product = {
        name: "輕鬆學習 TypeScript",
        pages: 150,
    }
    console.log("第一種產品", f_data1);

    // 第二種產品：電腦
    const f_data2: Product = {
        RAM: "64GB",
        CPU: "i9",
    }
    console.log("第二種產品", f_data2);

    return (
        <PageContainer>
            <h1>詳見 F12</h1>
        </PageContainer>
    )
}

export default VDOM`}
          </code>
        </pre>

        <Paragraph type="secondary" style={{ marginTop: 32 }}>
          <Text strong>使用場景：</Text><br />
          • props 可以是 string 或 number<br />
          • API 回傳可能是 success 或 error 兩種結構<br />
          • 表單輸入可以是文字或檔案
        </Paragraph>

      </Typography>
    </PageContainer>
  );
};

export default UnionTypesPage;