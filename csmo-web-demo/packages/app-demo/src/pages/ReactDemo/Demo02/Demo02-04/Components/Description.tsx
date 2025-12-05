import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';
import CodeView from '@/utils/CodeView';

const { Title, Paragraph, Text } = Typography;

const InterfaceIntroPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - interface(介面)">
      <Typography>

        <Paragraph>
          <ol>
            <li>基本上 跟 type 相同，但多了 <Text strong>聲明合併</Text> 的特性</li>
            <li>語法：</li>
          </ol>
        </Paragraph>

        <CodeView code=
{`interface 型別名稱A = {
      必填屬性A: 型別;
}

interface 型別名稱A = {
      必填屬性B: 型別;
      選填屬性C?: 型別; // 選填屬性 用「?」表示
      readonly 屬性D?: 型別; // 唯讀屬性 只有初始創建時能夠賦值
}`}
        />

        <Paragraph>
          此時 <Text code>型別名稱A</Text> 的屬性會自動合併為：
        </Paragraph>

        <CodeView code=
{`{
      必填屬性A: 型別;
      必填屬性B: 型別;
      選填屬性C?: 型別;
      readonly 屬性D?: 型別;
}`}
        />

        <Divider />

        <Title level={2}>範例</Title>

        <CodeView code=
{`const VDOM: React.FC = () => {
        /* 介面 interface */
        interface Person {
            readonly id: number;
        }
        interface Person {
            name: string;
            age: number;
            sex?: string;
        }

        // 案例
        let ray: Person = {
            id: 2,
            name: "ray",
            age: 20,
            sex: "男",
        }
        console.log("ray", ray);

        return (
            <></>
        )
}

export default VDOM`}
        />

        <Paragraph type="secondary" style={{ marginTop: 24 }}>
          <Text strong>interface 最大特色：</Text><br />
          同一個名稱的 interface 會自動合併（Declaration Merging）<br />
          這是 <Text code>type</Text> 做不到的！
        </Paragraph>

      </Typography>
    </PageContainer>
  );
};

export default InterfaceIntroPage;