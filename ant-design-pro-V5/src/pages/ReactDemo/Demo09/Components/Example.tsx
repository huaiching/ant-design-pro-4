import React from 'react'
import { Space, Typography } from 'antd'
import DisplayPage from './Components/DisplayPage'
import InputPage from './Components/InputPage'

const { Title } = Typography

const App: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>useSyncExternalStore 範例</Title>
      <Space direction="vertical" size="large">
        <InputPage />
        <DisplayPage />
      </Space>
    </div>
  )
}

export default App
