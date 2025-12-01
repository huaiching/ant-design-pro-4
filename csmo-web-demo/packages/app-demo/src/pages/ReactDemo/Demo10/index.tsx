// src/pages/ButtonOnClickAppendix/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const ButtonOnClickAppendixPage: React.FC = () => {
  return (
    <PageContainer title="附錄 - Button 的 onClick 呼叫函式的寫法">
      <Typography>

        <Paragraph>
          React 中，Button 的 onClick 只能放 無參數函式
        </Paragraph>
        <pre>{`<Button onClick={函式名稱}> 按鈕文字 </Button>`}</pre>

        <Paragraph>
          如果 想要在 onClick 呼叫 有參數函式，就必須再另外進行包裝
        </Paragraph>
        <pre>{`<Button type="primary" onClick={() => 函式名稱(參數)}> 按鈕文字 </Button>`}</pre>

      </Typography>
    </PageContainer>
  );
};

export default ButtonOnClickAppendixPage;