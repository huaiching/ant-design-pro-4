import { PageContainer } from '@ant-design/pro-components'
import { Typography } from 'antd'
import React from 'react'

const Home: React.FC = () => {
  const { Title } = Typography

  return (
    <PageContainer title={false}>
      <Typography>
        <Title level={3}>
          <code>React 基本語法範例</code>：基本的 React 語法教學，
        </Title>
        <Title level={3}>
          <code>Mobx 使用範例</code>：全域變數工具 <code>Mobx</code> 的簡單說明，
        </Title>
        <Title level={3}>
          <code>Ant Design 範例</code>：Antd Pro UI 元件的範例，使用時 請搭配 程式碼 使用，
        </Title>
        <Title level={3}>
          <code>後端開發</code>：提供 後端開發 相關教學文件，
        </Title>
      </Typography>
    </PageContainer>
  )
}

export default Home
