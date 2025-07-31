// src/pages/user/Display.tsx
import React, { useEffect } from 'react'
import { Card, Descriptions, message } from 'antd'
import userStore from '../Models/userStore'
import { observer } from 'mobx-react'

const Display: React.FC = () => {
  const user = userStore.getUser
  useEffect(() => {
    
    return () => {
      message.info('姓名變更了')
    };
  }, [user.name]);

  return (
    <Card title="使用者資料預覽" bordered={false}>
      <Descriptions column={1}>
        <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
        <Descriptions.Item label="年齡">{user.age}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default observer(Display)
