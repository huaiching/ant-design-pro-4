import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Typography } from 'antd';

export default (): React.ReactNode => {
  
  return (
    <PageContainer>
      <ProCard>
        <Typography.Title level={3}>React 基本語法範例</Typography.Title>
        <Typography.Text>此區域內容為 React 的基本語法</Typography.Text>
      </ProCard>
      <ProCard>
        <Typography.Title level={3}>Ant Design 元件範例</Typography.Title>
        <Typography.Text>此區域內容為 Ant Design 和 Ant Design Pro 常用元件 的 使用範例</Typography.Text>
      </ProCard>
    </PageContainer>
  );
};
