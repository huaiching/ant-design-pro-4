// src/pages/TypeComplex/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const TypeComplexPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - type (複雜型別)">
      <Typography>

        <Paragraph>
          <ol>
            <li>type 用來定義 複雜的型別，也就是 裡面有多個屬性的型別。</li>
            <li>語法：</li>
          </ol>
        </Paragraph>

        <pre>
{`type 型別名稱 = {
      必填屬性A: 型別;
      選填屬性B?: 型別; // 選填屬性 用「?」表示
      readonly 屬性C?: 型別; // 唯讀屬性 只有初始創建時能夠賦值
}`}
        </pre>

        <Divider />

        <Title level={2}>範例</Title>

        <pre>
{`const VDOM: React.FC = () => {
    /* 抽象型別 */
    // 書本 有 名稱、頁數
    type Book = {
        name: string;
        pages: number;
        amt?: number;
        readonly id: number;
    };

    // 產品A: 無選填屬性 amt
    let f_data1: Book = {
        name: "輕鬆學習 TypeScript",
        pages: 150,
        id: 1
    }
    console.log("產品A", f_data1);

    // 產品B: 有選填屬性 amt
    let f_data2: Book = {
        name: "React 真簡單",
        pages: 280,
        amt: 1500,
        id: 2
    }
    console.log("產品B", f_data2);

    return (
        <></>
    )
}

export default VDOM`}
        </pre>

        <Paragraph type="secondary" style={{ marginTop: 24 }}>
          <Text strong>重點提示：</Text><br />
          → <Text code>?</Text> 表示選填屬性（optional）<br />
          → <Text code>readonly</Text> 表示該屬性只能在建立物件時賦值，之後不可修改
        </Paragraph>

      </Typography>
    </PageContainer>
  );
};

export default TypeComplexPage;