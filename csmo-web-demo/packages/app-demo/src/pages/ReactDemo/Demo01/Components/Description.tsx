// src/pages/BasicStructure/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const BasicStructurePage: React.FC = () => {
  return (
    <PageContainer title="頁面檔的基本結構">
      <Card>
        <Typography>
          <Paragraph>
            一個 React 的頁面檔，可以分成
          </Paragraph>

          <ul>
            <li><Text strong>import</Text>：各種元件的載入設定</li>
            <li><Text strong>邏輯處理</Text>：進行 JavaScript 的撰寫 (包含 tsx)</li>
            <li><Text strong>頁面刻畫</Text>：設定 要呈現在畫面上的東西，也就是 傳統 html 的 body</li>
          </ul>

          <Divider />

          <pre>
{`
import React from 'react';
// 開頭 進行 元件的載入
// 頁面檔 其實就是一個函式，return 出去的就是要渲染的 html 元件
const myExample: React.FC = (輸入參數) => {
    // 這裡進行 邏輯處理
    return ( // 這裡進行 頁面刻畫，重點是要【包成一個】丟出去
        <div>
            練習首頁
        </div>
    )
}
export default myExample;
`}
          </pre>

          <Divider />

          <Title level={3}>範例</Title>

          <pre>
{`
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const myExample: React.FC = () => {
    return (
        <PageContainer>
            練習首頁
        </PageContainer>
    )
}
export default myExample;
`}
          </pre>

          <Paragraph style={{ marginTop: 32 }}>
            <Text type="secondary">
              在 Ant Design Pro 專案中，強烈建議每一頁都用 <Text code>PageContainer</Text> 包起來，會自動擁有標題、麵包屑、內容間距等專業佈局。
            </Text>
          </Paragraph>
        </Typography>
      </Card>
    </PageContainer>
  );
};

export default BasicStructurePage;