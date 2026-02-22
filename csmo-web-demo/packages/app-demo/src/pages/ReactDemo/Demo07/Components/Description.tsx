import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';
import CodeTsx from '@/utils/CodePre/CodeTsx';

const { Title, Paragraph, Text } = Typography;

const UseEffectIntroPage: React.FC = () => {
  return (
    <PageContainer title="useEffect 效果鉤子">
      <Typography>

        <Paragraph>
          useEffect 可以讓你於 頁面渲染時，執行指定的操作。<br />
          useEffect 共有 2 個參數
        </Paragraph>
        <ul>
          <li>第一個：定義你要進行的操作</li>
          <li>第二個：定義監測對象</li>
        </ul>

        <Divider />

        <Title level={2}>每次渲染 執行</Title>
        <Paragraph>無監測對象，就是 <Text code>每次渲染</Text> 都要執行</Paragraph>
        <CodeTsx code=
{`useEffect(()=>{
    // useEffect 『啟動』時要執行的操作
    return () => {
        // useEffect 『卸載』時要執行的操作
    }
})`}
        />

        <Divider />

        <Title level={2}>首次渲染 執行</Title>
        <Paragraph>監測對象空白，就是 <Text code>首次渲染</Text> 才要執行</Paragraph>
        <CodeTsx code=
{`useEffect(()=>{
    // useEffect 『啟動』時要執行的操作
    return () => {
        // useEffect 『卸載』時要執行的操作
    }
},[])`}
        />

        <Divider />

        <Title level={2}>特定對象觸發渲染 執行</Title>
        <Paragraph>有設定監測對象，就是 <Text code>監測對象數值更新</Text> 才要執行</Paragraph>
        <CodeTsx code=
{`useEffect(()=>{
    // Effect 『啟動』時要執行的操作
    return () => {
        // Effect 『卸載』時要執行的操作
    }
},[監測對象, 監測對象, ……])`}
        />

        <Divider />

        <Title level={2}>範例</Title>
        <CodeTsx code=
{`import { PageContainer } from "@ant-design/pro-layout"
import React, { useEffect, useState } from "react"

// 頁面顯示計時器，顯示頁面停留了幾秒
const VDOM: React.FC = () => {
  const [timer, setTimer] = useState(0)

  // Effect 僅在頁面首次渲染時執行
  useEffect(() => {
      // 設定計時器，每 1 秒 執行一次
      // 每次 時間 + 1秒
      setInterval(()=>{
          setTimer(prevTimer => prevTimer + 1)
      },1000)
  },[])

  return (
      <PageContainer>
          <h3>頁面停留 {timer} 秒</h3>
      </PageContainer>
  )
}

export default VDOM`}
        />

      </Typography>
    </PageContainer>
  );
};

export default UseEffectIntroPage;