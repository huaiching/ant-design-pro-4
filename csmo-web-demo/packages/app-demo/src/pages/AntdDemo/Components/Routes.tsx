import { Card, Divider, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph, Text, Link } = Typography;

const Routes: React.FC = () => {
  return (
    <Typography>
      <Title level={2}>Antd Pro 路由設定指南</Title>
      <Paragraph>
        在 Antd Pro 中，路由設定透過 <Text code>config/routes.ts</Text> 檔案完成，用於定義側邊選單和頁面路徑，並將其對應至具體的頁面組件。以下介紹基本設定與進階用法。
      </Paragraph>

      <Divider />

      <Title level={3}>基本路由設定</Title>
      <Paragraph>
        基本路由 用於定義單一頁面，包含選單名稱、路徑、圖示和對應組件。
      </Paragraph>
      <pre>{`
{
  path: '/antdDemo/components',
  name: 'antdDemoComponents',
  icon: 'AppstoreOutlined',
  component: './AntdDemo/Components/Navigate',
}
      `}</pre>
      <Paragraph>
        <ul>
          <li>
            <Text strong>path</Text>：定義網址路徑，例如 <Text code>/antdDemo/components</Text>。
          </li>
          <li>
            <Text strong>name</Text>：側邊選單的顯示名稱，需在 <Text code>locales/zh-TW/menu.ts</Text> 中設定翻譯，例如：
            <Text code>"menu.antdDemoComponents": "Ant Design 頁面導引"</Text>。
          </li>
          <li>
            <Text strong>icon</Text>：設定選單圖示，使用 Ant Design 的圖示名稱（如 <Text code>AppstoreOutlined</Text>）。
          </li>
          <li>
            <Text strong>component</Text>：指定頁面組件檔案，相對於 <Text code>src/pages</Text> 目錄。
          </li>
        </ul>
      </Paragraph>

      <Divider />

      <Title level={3}>子路由設定</Title>
      <Paragraph>
        子路由 用於建立嵌套選單結構，適用於需要分組的頁面。
      </Paragraph>
       <pre>{`
{
  path: '/antdDemo/demo',
  name: 'antdDemo',
  routes: [
    {
      path: '/antdDemo/demo/Form',
      name: 'Form',
      component: './AntdDemo/Components/Form'
    }
  ]
}
      `}</pre>
      <Paragraph>
        <ul>
          <li>
            <Text strong>path</Text>：定義網址路徑，例如 <Text code>/antdDemo/components</Text>。
          </li>
          <li>
            <Text strong>name</Text>：側邊選單的顯示名稱，需在 <Text code>locales/zh-TW/menu.ts</Text> 中設定翻譯，例如：
            <Text code>"menu.antdDemoComponents": "Ant Design 頁面導引"</Text>。
          </li>
          <li>
            <Text strong>component</Text>：指定頁面組件檔案，相對於 <Text code>src/pages</Text> 目錄。
          </li>
          <li>
            <Text strong>routes</Text>：定義子路由陣列，每個子路由包含獨立的 <Text code>path</Text>、<Text code>name</Text> 和 <Text code>component</Text>。
          </li>
          <li>
            父路由 不包含 <Text code>component</Text>，僅作為選單分組。
          </li>
          <li>
            子選單名稱同樣需在 <Text code>locales/zh-TW/menu.ts</Text> 中設定，例如：
            <Text code>"menu.antdDemo.Form": "表單輸入元件"</Text>。
          </li>
        </ul>
      </Paragraph>

      <Divider />

      <Title level={3}>進階用法</Title>
      <Paragraph>
        <ul>
          <li>
            不要設定 <Text code>name</Text>，僅設定 <Text code>path</Text> 和 <Text code>component</Text>，就可以設定不想要顯示於菜單中的路由。 <br />
            搭配 <Text code>navigate</Text> 即可達到，頁面跳轉的同時，進行 參數的傳遞。
          </li>
        </ul>
        <pre> {`
{
  {
    path: '/antdDemo/demo/PageTemplates/Query',
    component: './AntdDemo/Components/PageTemplates/Components/demo02_EditForm',
  },
  {
    path: '/antdDemo/demo/PageTemplates/Edit',
    component: './AntdDemo/Components/PageTemplates/Components/demo02_EditForm',
  },
  {
    path: '/antdDemo/demo/PageTemplates/Create',
    component: './AntdDemo/Components/PageTemplates/Components/demo02_EditForm',
  },
}
        `} </pre>
      </Paragraph>

      <Divider />

      <Title level={3}>注意事項</Title>
      <Paragraph>
        <ul>
          <li>確保 <Text code>path</Text> 唯一，避免路由衝突。</li>
          <li>檢查 <Text code>locales/zh-TW/menu.ts</Text> 中的翻譯是否與 <Text code>name</Text> 對應。</li>
          <li>若組件路徑錯誤，可能導致頁面無法載入，需確認 <Text code>src/pages</Text> 下的檔案是否存在。</li>
        </ul>
      </Paragraph>
    </Typography>
  );
};

export default Routes;
