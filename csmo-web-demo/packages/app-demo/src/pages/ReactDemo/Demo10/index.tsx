import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography } from 'antd';
import CodeView from '@/utils/CodeView';

const { Paragraph } = Typography;

const ButtonOnClickAppendixPage: React.FC = () => {
  return (
    <PageContainer title="附錄 - Button 的 onClick 呼叫函式的寫法">
      <Typography>

        <Paragraph>
          React 中，Button 的 onClick 只能放 無參數函式
        </Paragraph>
        <CodeView code={`<Button onClick={函式名稱}> 按鈕文字 </Button>`}/>

        <Paragraph>
          如果 想要在 onClick 呼叫 有參數函式，就必須再另外進行包裝
        </Paragraph>
        <CodeView code={`<Button type="primary" onClick={() => 函式名稱(參數)}> 按鈕文字 </Button>`}/>

      </Typography>
    </PageContainer>
  );
};

export default ButtonOnClickAppendixPage;