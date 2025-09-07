import React from 'react'
import { Button, message, Modal, Space } from 'antd'
import { modalWarning, modalInfo, modalError, modalSuccess, modalConfirm } from './Store/ModalStore'

const App: React.FC = () => {
  const data = [
    '第一行訊息',
    '第二行訊息',
    '第三行訊息',
    '第四行訊息'
  ]


  return (
    <Space>
      <Button type='primary' onClick={()=>modalConfirm(data)}>
        confirm
      </Button>
      <Button type='primary' onClick={()=>modalSuccess(data)}>
        success
      </Button>
      <Button type='primary' onClick={()=>modalWarning(data)}>
        warning
      </Button>
      <Button type='primary' onClick={()=>modalInfo(data)}>
        info
      </Button>
      <Button type='primary' onClick={()=>modalError(data)}>
        error
      </Button>
    </Space>
  )
}

export default App
