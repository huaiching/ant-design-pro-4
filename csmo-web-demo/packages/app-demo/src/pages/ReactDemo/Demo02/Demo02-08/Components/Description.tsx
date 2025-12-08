import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';
import CodeTsx from '@/utils/CodePre/CodeTsx';

const { Title, Paragraph, Text } = Typography;

const IntersectionTypesPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - 交集型別 (Intersection Types & )">
      <Typography>

        <Title level={2}>交集型別 (且) - Intersection Types</Title>
        <Paragraph>
          必須同時符合 <Text code>型別A</Text> 和 <Text code>型別B</Text> 所有屬性
        </Paragraph>

        <Title level={3}>語法</Title>
        <CodeTsx code={`let 變數名稱: (型別A & 型別B) = 數值`} />

        <Divider />

        <Title level={2}>完整範例</Title>
        <CodeTsx code=
{`const VDOM: React.FC = () => {
    /* 交集 (且) */
    type Software = {
        system: string;
        version: string;
    };

    type Hardware = {
        RAM: string;
        CPU: string;
    };

    // 手機必須同時具備軟體 + 硬體
    type Phone = Software & Hardware;

    let f_data: Phone = {
        system: "iOS",
        version: "17.0",
        RAM: "16GB",
        CPU: "A16"
    }

    console.log("iPhone 15", f_data);

    return (<></>)
}

export default VDOM`}
        />
      </Typography>
    </PageContainer>
  );
};

export default IntersectionTypesPage;