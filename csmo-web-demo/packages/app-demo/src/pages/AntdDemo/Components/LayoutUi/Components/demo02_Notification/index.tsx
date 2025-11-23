import React from 'react'
import { Button, notification, Space } from 'antd'
import { notificationSuccess, notificationInfo, notificationWarning, notificationError } from './Store/NotificaionStore'

const App: React.FC = () => {
  const data = [
    '第一行訊息',
    '第二行訊息',
    '第三行訊息',
    '第四行訊息'
  ]

  return (
    <Space>
      <Button type='primary' onClick={() => notificationSuccess(data)}>
        success
      </Button>
      <Button type='primary' onClick={() => notificationInfo(data)}>
        info
      </Button>
      <Button type='primary' onClick={() => notificationWarning(data)}>
        warning
      </Button>
      <Button type='primary' onClick={() => notificationError(data)}>
        error
      </Button>
    </Space>
  )
}

export default App
