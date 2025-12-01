// src/pages/VariableTypes/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const VariableTypesPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - 變數的宣告與型別設定">
      <Typography>

        <Title level={2}>變數的宣告方式</Title>
        <Paragraph>
          <ol>
            <li>
              <Text strong>let</Text>　數值可修改 的 變數
              <pre><code>let 變數名稱 = 初始化值</code></pre>
            </li>
            <li>
              <Text strong>const</Text>　數值不可直接修改 的 變數
              <pre><code>const 變數名稱 = 初始化值</code></pre>
            </li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>變數的基本型別</Title>
        <Paragraph>
          <ol>
            <li><Text strong>boolean</Text>　只能是 true / false
              <pre>let f_boolean: boolean = true</pre>
            </li>
            <li><Text strong>number</Text>　只能是 整數 / 小數
              <pre>let f_number_1: number = 10{'\n'}const f_number_2: number = 3.14</pre>
            </li>
            <li><Text strong>string</Text>　字串
              <pre>const f_string: string = "ABC"</pre>
            </li>
            <li><Text strong>void</Text>　無回傳值，於 函式 使用</li>
            <li><Text strong>null</Text>　空值</li>
            <li><Text strong>undefined</Text>　沒有賦值</li>
            <li><Text strong>any</Text>　任意值</li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>沒有宣告型別的處理方式</Title>
        <Paragraph>
          <ol>
            <li>變數有給值 → 自動根據數值判定型別</li>
            <li>變數沒給值 → 預設型別為 any</li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>範例</Title>

        <Title level={4}>完整程式碼</Title>
        <pre>
{`import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'

const VDOM: React.FC = () => {
    // 變數宣告 與 型態設定
    let f_boolean: boolean = true
    const f_number_1: number = 10
    const f_number_2: number = 3.14
    const f_string: string = "ABC"

    // let 可以 直接改變數值
    f_boolean = false

    // 透過 console 顯示資訊
    console.log("boolean =>", f_boolean)
    console.log("number(整數) =>", f_number_1)
    console.log("number(小數) =>", f_number_2)
    console.log("string =>", f_string)

    return (
        <PageContainer>
            <h1>詳見 F12</h1>
        </PageContainer>
    )
}

export default VDOM`}
        </pre>

        <Paragraph>
          <Text type="secondary">
            Boolean 一開始為 true<br />
            但因為後來數值改變了，所以最後顯示為 false
          </Text>
        </Paragraph>

      </Typography>
    </PageContainer>
  );
};

export default VariableTypesPage;