// src/pages/FunctionIntro/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const FunctionIntroPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - 函式">
      <Typography>

        <Title level={2}>函式</Title>

        <Paragraph>
          <ol>
            <li>
              <Text strong>箭頭函式 (arrow function)</Text>
              <pre><code>{`const 函式名稱 = (參數: 型別, ……): 回傳型別 => {
    處理邏輯
    return 回傳值
}`}</code></pre>
            </li>

            <li>
              <Text strong>函式宣告 (Function Declaration)</Text>
              <pre><code>{`function 函式名稱(參數: 型別, ……): 回傳型別 {
    處理邏輯
    return 回傳值
}`}</code></pre>
            </li>

            <li>
              <Text strong>函式表示式 (Function Expression)</Text>
              <pre><code>{`const 函式名稱 = function (參數: 型別, ……): 回傳型別 {
    處理邏輯
    return 回傳值
}`}</code></pre>
            </li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>參數</Title>

        <Paragraph>
          <ol>
            <li>
              <Text strong>必填參數</Text>
              <pre><code>參數: 型別</code></pre>
            </li>
            <li>
              <Text strong>選填參數</Text>
              <pre><code>參數?: 型別</code></pre>
            </li>
            <li>
              <Text strong>剩餘參數</Text>
              <pre><code>...參數: 型別[]</code></pre>
              <ul style={{ marginTop: 8, marginLeft: 20 }}>
                <li>必須是 函數的 最後一個 參數</li>
                <li>必須是一個 陣列</li>
                <li>用途為 接收函數中剩下的 Input</li>
              </ul>
            </li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>範例</Title>

        <pre>
          <code>
{`import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const VDOM: React.FC = () => {
    // 函式宣告: 使用 剩餘函數
    function sum(...numbers: number[]): number {
        let f_sum = 0;
        numbers.forEach((number) => {
            f_sum += number;
        });
        return f_sum;
    }

    const f_value_1 = sum(1,2,3,4,5);

    // 箭頭函式
    const diff = (x: number, y: number): number => {
        return x-y
    }

    const f_value_2 = diff(5,2)

    return (
        <PageContainer>
            <h2>1+2+3+4+5= {f_value_1}</h2>
            <h2>5-2= {f_value_2}</h2>
        </PageContainer>
    )
}

export default VDOM`}
          </code>
        </pre>

        <Paragraph type="secondary" style={{ marginTop: 32 }}>
          <Text strong>小提醒：</Text><br />
          React 組件和事件處理函式幾乎都建議使用 <Text code>箭頭函式</Text>，避免 <Text code>this</Text> 綁定問題<br />
          <Text code>...rest</Text> 是 TypeScript 中最實用的功能之一，學會它就等於掌握了「可變參數」
        </Paragraph>

      </Typography>
    </PageContainer>
  );
};

export default FunctionIntroPage;