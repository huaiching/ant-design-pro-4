import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';
import CodeView from '@/utils/CodeView';

const { Title, Paragraph, Text } = Typography;

const VariableTypesPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - 變數的宣告與型別設定">
      <Typography>

        <Title level={2}>變數的宣告方式</Title>
        <Paragraph>
          <ol>
            <li>
              <code>let</code>：數值可修改 的 變數
             <CodeView code={`let 變數名稱 = 初始化值`} />
            </li>
            <li>
              <code>const</code>：數值不可直接修改 的 變數
             <CodeView code={`const 變數名稱 = 初始化值`} />
            </li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>變數的基本型別</Title>
        <Paragraph>
          <ol>
            <li><code>boolean</code>：只能是 true / false
              <CodeView code={`let f_boolean: boolean = true`} />
            </li>
            <li><code>number</code>：只能是 整數 / 小數
              <CodeView code={`let f_number_1: number = 10
const f_number_2: number = 3.14`} />
            </li>
            <li><code>string</code>：字串
              <CodeView code={`const f_string: string = "ABC"`} />
            </li>
            <li><code>void</code>：無回傳值，於 函式 使用</li>
            <li><code>null</code>：空值</li>
            <li><code>undefined</code>：沒有賦值</li>
            <li><code>any</code>：任意值</li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>沒有宣告型別的處理方式</Title>
        <Paragraph>
          <ol>
            <li>變數有給值 → 自動根據數值判定型別</li>
            <li>變數沒給值 → 預設型別為 any</li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>範例</Title>

        <Title level={4}>完整程式碼</Title>
        <CodeView code={`import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'

const VDOM: React.FC = () => {
    // 變數宣告 與 型態設定
    let f_boolean: boolean = true
    const f_number_1: number = 10
    const f_number_2: number = 3.14
    const f_string: string = "ABC"

    // let 可以 直接改變數值
    f_boolean = false

    // 透過 console 顯示資訊
    console.log("boolean =>", f_boolean)
    console.log("number(整數) =>", f_number_1)
    console.log("number(小數) =>", f_number_2)
    console.log("string =>", f_string)

    return (
        <PageContainer>
            <h1>詳見 F12</h1>
        </PageContainer>
    )
}

export default VDOM`}
        />

        <Paragraph>
          <Text type="secondary">
            Boolean 一開始為 true<br />
            但因為後來數值改變了，所以最後顯示為 false
          </Text>
        </Paragraph>

      </Typography>
    </PageContainer>
  );
};

export default VariableTypesPage;