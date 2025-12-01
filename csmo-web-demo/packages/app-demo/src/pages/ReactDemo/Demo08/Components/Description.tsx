// src/pages/UseRefIntro/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const UseRefIntroPage: React.FC = () => {
  return (
    <PageContainer title="useRef 從輸入框獲取值">
      <Typography>

        <Paragraph>
          useRef 是 React 用來從 輸入框 中 獲取 輸入值 的 Hook。
        </Paragraph>

        <Divider />

        <Title level={2}>語法</Title>

        <Paragraph>
          <ol>
            <li>
              宣告<br />
              <ul>
                <li>
                  <Text code>元件的Ref型態</Text> 需要根據 使用的輸入框 來進行設定<br />
                  若使用 Antd 的 Input 則要使用 <Text code>InputRef</Text><br />
                </li>
                <li>
                  <Text code>初始值</Text> 可以進行預設值的設定，建議使用時 將 <Text code>初始值</Text> 設定為 null
                </li>
              </ul>
            </li>
          </ol>
        </Paragraph>
        <pre><code>{`const ref變數 = useRef<元件的Ref型態>(初始值)`}</code></pre>

        <Paragraph>
          <ol start={2}>
            <li>
              元素使用<br />
              <ul>
                <li>
                  透過 onChange 來觸發 狀態變數 的 <Text code>改變事件</Text>，已達成 綁定的目的。<br />
                  也就是 輸入框 內容改變時，會同時改變 後台的某個狀態變數
                </li>
              </ul>
            </li>
          </ol>
        </Paragraph>
        <pre><code>{`<Input type='text' ref={ref變數} onChange={改變事件} />`}</code></pre>

        <Paragraph>
          <ol start={3}>
            <li>取得數值</li>
          </ol>
        </Paragraph>
        <pre><code>{`const 變數 = inputRef.current?.input?.value`}</code></pre>

        <Divider />

        <Title level={2}>範例</Title>
        <pre>
          <code>
            {`import { PageContainer } from '@ant-design/pro-layout';
import { Input, Space } from 'antd';
import type { InputRef } from 'antd';
import React, { useRef, useState } from 'react';

const MyComponent: React.FC = () => {
  // useRef 的型態 根據 綁定元件 來使用，這裡因為是使用 Inupt，所以要用 InputRef 作為型態
  const inputRef = useRef<InputRef>(null);

  // 設定 姓名變數
  const [userName, setUserName] = useState<string>("")

  // 設定 姓名改變事件
  const chgUserName = () => {
    const refValue = inputRef.current?.input?.value
    const name = refValue !== undefined ? refValue : ""
    setUserName(name)
  }

  return (
    <PageContainer>
      {/* 使用 ref 指向 Input 的 Ref */}
      <Space>
          <Input type='text' ref={inputRef} onChange={chgUserName} />
          <h1>我是{userName}</h1>
      </Space>
    </PageContainer>
  );
};

export default MyComponent;`}
          </code>
        </pre>

      </Typography>
    </PageContainer>
  );
};

export default UseRefIntroPage;