/**
 * 從 useSyncExternalStore 全域變數讀取使用者資訊，將資料展示出來
 */
import React, { useEffect } from 'react'
import { Card, Descriptions, message } from 'antd'
import { useSyncExternalStore } from 'react'
import { userStore } from '../Store/userStore'

const Display: React.FC = () => {
  // 訂閱 user 狀態
  const user = useSyncExternalStore(
    userStore.subscribe,  // 訂閱
    userStore.getUser,    // 客戶端取值
    userStore.getUser     // 伺服器端取值
  )

  // 當 name 變化時顯示消息
  useEffect(() => {
    return () => {
      message.info('姓名變更了')
    }
  }, [user.name])

  return (
    <Card title="使用者資料預覽" bordered={false}>
      <Descriptions column={1}>
        <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
        <Descriptions.Item label="年齡">{user.age}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="計算日">{user.calcDate}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default Display