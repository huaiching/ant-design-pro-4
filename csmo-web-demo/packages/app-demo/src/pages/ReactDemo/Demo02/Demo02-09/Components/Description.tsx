// src/pages/JSStatements/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const JSStatementsPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - JS 語句">
      <Typography>

        <Title level={2}>if</Title>
        <pre>
{`if (布林條件式) {
   內容;
}
else if (布林條件式) {
   內容;
}
……以此類推
else {
   內容;
}}`}
        </pre>

        <Divider />

        <Title level={2}>switch</Title>
        <pre>
{`switch (變數) {
   case 值A:
      內容;
      break; ← 沒有break將會繼續往下執行
   case 值B:
      內容;
      break;
   ……以此類推
   case 值N:
      內容;
      break;
   default: ← 其他情況
      內容;
      break;
}`}
        </pre>

        <Divider />

        <Title level={2}>三元運算子</Title>
        <Paragraph>
          <ol>
            <li>語法</li>
          </ol>
        </Paragraph>
        <pre>{`布林條件式 ? True的結果 : False的結果`}</pre>

        <Paragraph>
          <ol start={2}>
            <li>範例</li>
          </ol>
        </Paragraph>
        <pre>{`const data = (age>=18 ? '成年' : '未成年')`}</pre>
        <Paragraph type="secondary">
          如果 age ≥ 18 會是 成年；否則是 未成年
        </Paragraph>

        <Divider />

        <Title level={2}>for</Title>
        <Paragraph>
          <ol>
            <li>無回傳值（單純遍歷）</li>
          </ol>
        </Paragraph>
        <pre>
{`陣列變數.forEach((陣列元素變數) => {
   內容
})`}
        </pre>

        <Paragraph>
          <ol start={2}>
            <li>有回傳值（會自動組成新陣列）</li>
          </ol>
        </Paragraph>
        <pre>
{`const 變數 = 陣列變數.map((陣列元素變數) => {
   return 內容
})`}
        </pre>

        <Divider />

        <Title level={2}>while</Title>
        <pre>
{`while (布林條件式) {
   內容;
}`}
        </pre>

        <Divider />

        <Title level={2}>完整範例</Title>
        <pre>
{`import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const VDOM: React.FC = () => {
    // 範例: if
    const sex = '1'
    let data1 = ""
    if (sex === '1') {
        data1 = "男"
    } else {
        data1 = "女"
    }

    // 範例: 三元表達式
    const age = 18;
    const data2 = (age>=18 ? '成年' : '未成年')

    // 範例: for 迴圈 + push
    const data3 = [];
    for (let i = 1 ; i < 5 ; i++) {
        data3.push(<li key={i}>{i}</li>)
    }

    // 範例: forEach
    const data4 = ['a','b','c','d']
    data4.forEach((data) => {
        data3.push(<li key={data}>{data}</li>)
    })

    // 範例: map（React 推薦）
    const data5 = data4.map((data) => {
        return <li key={data}>{data}</li>
    })

    return (
        <PageContainer>
            <h3>年齡: {age}，是否成年: {data2}，性別: {data1}</h3>
            <ul>
                第一區塊: {data3}
                第二區塊: {data5}
            </ul>
        </PageContainer>
    )
}

export default VDOM`}
        </pre>
      </Typography>
    </PageContainer>
  );
};

export default JSStatementsPage;
