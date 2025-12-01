// src/pages/UseStateIntro/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const UseStateIntroPage: React.FC = () => {
  return (
    <PageContainer title="useState 狀態機">
      <Typography>

        <Paragraph>
          如果當變數內容改變時，畫面要重新渲染，就需要將這個變數設定為state(狀態機)。
        </Paragraph>

        <Divider />

        <Title level={2}>語法</Title>
        <pre><code>{`import { useState } from "react"
const [isHot, setIsHot] = useState(true)`}</code></pre>

        <Divider />

        <Title level={2}>數值更新</Title>

        <Paragraph>
          1. 直接給值 (後蓋前)
        </Paragraph>
        <pre><code>{`setState(新狀態)`}</code></pre>

        <Paragraph>
          2. 函式更新
        </Paragraph>
        <pre><code>{`setState((變數) => {更新邏輯})`}</code></pre>

        <Paragraph>
          <ul>
            <li>
              setState 若 連續多次執行更新時，<br />
              結果會 後蓋前，只保留 最後一次的結果<br />
              如果 每次的結果都要保留到下一次使用，就必須使用 函式進行更新
            </li>
          </ul>
        </Paragraph>

        <Divider />

        <Title level={2}>範例</Title>
        <pre>
          <code>
            {`import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Button, Space } from "antd";
import { useState } from "react";

const VDOM: React.FC = () => {
    // 宣告
    const [isHot, setIsHot] = useState(true)
    // 天氣的顯示設定
    const isHotDesc = isHot ? '炎熱' : '涼爽'
    // 透過函式改變天氣值
    // 因為 天氣值 isHot 是狀態機，所以改變時會啟動畫面重新渲染
    // 因此 顯示的 天氣中文內容 就會同步改變
    function chgWeather () {
        setIsHot(!isHot)
    }
    return (
        <PageContainer>
            <Space>
                <Button type="primary" onClick={chgWeather}>改變天氣</Button>
                <h3>今天天氣很{isHotDesc}</h3>
            </Space>
        </PageContainer>
    )
}

export default VDOM`}
          </code>
        </pre>

      </Typography>
    </PageContainer>
  );
};

export default UseStateIntroPage;