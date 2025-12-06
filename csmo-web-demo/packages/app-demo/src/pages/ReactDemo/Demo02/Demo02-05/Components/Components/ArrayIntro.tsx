import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';
import CodeTsx from '@/utils/CodeTsx';

const { Title, Paragraph, Text } = Typography;

const ArrayIntroPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - 陣列">
      <Typography>

        <Title level={2}>語法</Title>
        <Paragraph>
          <ol>
            <li>
              <Text strong>一般</Text>
              <CodeTsx code={`let 陣列名稱: 型別[] = [數值A, 數值B]`} />
            </li>
            <li>
              <Text strong>泛型</Text>
              <CodeTsx code={`let 陣列名稱: Array&lt;型別&gt; = [數值A, 數值B]`} />
            </li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>常用方法</Title>
        <Paragraph>
          <ol>
            <li>
              <Text strong>新增</Text>
              <CodeTsx code={`陣列名稱.push(數值)`} />
            </li>
            <li>
              <Text strong>長度</Text>
              <CodeTsx code={`陣列名稱.length`} />
            </li>
            <li>
              <Text strong>排序 (小到大)</Text>
              <CodeTsx code={`陣列名稱.sort()`} />
            </li>
            <li>
              <Text strong>排序 (大到小)</Text>
              <CodeTsx code={`陣列名稱.sort((x,y) =>  y-x)`} />
            </li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>範例</Title>

        <CodeTsx code=
{`import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const VDOM: React.FC = () => {
    /* 一般陣列 */
    const f_numbers: number[] = [1,5,3,2,4];

    /* 泛型陣列 */
    console.log("宣告", f_numbers);

    const f_currency: string[] = []

    // 新增資料
    f_numbers.push(6);
    console.log("新增資料", f_numbers);

    // 陣列長度
    const f_length = f_numbers.length;
    console.log("陣列長度", f_length);

    // 排序 (小到大)
    const f_sortA = f_numbers.sort();
    console.log("排序 (小到大)", f_sortA);

    // 排序 (大到小)
    const f_sortB = f_numbers.sort((x,y) => y-x);
    console.log("排序 (大到小)", f_sortB);

    // 泛型範例
    f_currency.push("TWD")
    f_currency.push("USD")
    console.log("泛型", f_currency);

    return (
        <PageContainer>
            <h1>詳見 F12</h1>
        </PageContainer>
    )
}

export default VDOM`}
        />

        <Paragraph type="secondary" style={{ marginTop: 24 }}>
          <Text strong>小提醒：</Text><br />
          • <Text code>sort()</Text> 預設是「字串比較」，純數字要加 <Text code>(a,b) =&gt; a-b</Text> 才會正確<br />
          • <Text code>push()</Text> 會回傳新長度，可用來追蹤
        </Paragraph>

      </Typography>
    </PageContainer>
  );
};

export default ArrayIntroPage;