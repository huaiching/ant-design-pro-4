// src/pages/JSXAndCSS/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const JSXAndCSSPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - TypeScript 簡介 及 使用 CSS">
      <Typography>
        <Title level={2}>JavaScript 和 TypeScript 的差異</Title>
        <Paragraph>
          <ol>
            <li>TypeScript = JavaScript + 嚴格的型別設定規則</li>
            <li>
              JavaScript 可以在網頁中直接使用。<br />
              TypeScript 必須經過編譯，才能將其轉譯為 JavaScript 於網頁中使用。
            </li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>JS 表達式 與 使用 CSS</Title>
        <Paragraph>
          <ol>
            <li>使用 JS 表達式，要使用 <Text code>{'{ }'}</Text> 包起來</li>
            <li>
              CSS 相關撰寫規定
              <ul>
                <li>套用 CSS 樣式，要使用 <Text code>className</Text> 屬性</li>
                <li>標籤的行內樣式，要使用 <Text code>{'{key:"value"}'}</Text> 的形式撰寫</li>
              </ul>
            </li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>範例</Title>

        {/* index.tsx */}
        <Title level={4}>index.tsx</Title>
        <pre>
{`import './store/index.css' // 引入 css 樣式模組
import Demo from './components/demo1'

const VDOM: React.FC = () => {
    const idvName = "divId" // 設定變數
    const data = "Hello JSX"
    return (
        <div>
            {/* 子組件要使用 大寫開頭 */}
            <Demo/>
            {/* JS表達式 要用 {} 包住 */}
            <div id={idvName}>
                {/* 使用 css 樣式模組，要用 className 屬性 */}
                <h1 className="titleCss">
                    <span>此單元為 </span>
                    {/* css 行內樣式 使用範例 */}
                    <span style={{color:"orange", fontSize:"20px"}}>
                        {data}
                    </span>
                </h1>
            </div>
        </div>
    )
}

export default VDOM`}
        </pre>

        {/* index.css */}
        <Title level={4}>index.css</Title>
        <pre>
{`.titleCss {
    background-color: red;
    font-size: 30px;
}`}
        </pre>

        {/* demo1.tsx */}
        <Title level={4}>components/demo1.tsx</Title>
        <pre>
{`const demo1: React.FC = () => {
    return (
        <div>
            <h1>css使用範例</h1>
        </div>
    )
}

export default demo1`}
        </pre>
      </Typography>
    </PageContainer>
  );
};

export default JSXAndCSSPage;