/**
 * 從 useSyncExternalStore 全域變數讀取使用者資訊，將資料展示出來
 */
import React from 'react'
import { Descriptions, Typography } from 'antd'
import { useSyncExternalStore } from 'react'
import { userStore } from '../Store/userStore'

const Display: React.FC = () => {
  // 訂閱 user 狀態
  const user = useSyncExternalStore(
    userStore.subscribe,  // 訂閱
    userStore.getUser,    // 客戶端取值
    userStore.getUser     // 伺服器端取值
  )

  return (
    <>
      <Typography.Title level={4}>使用者資料預覽</Typography.Title>
      <Descriptions column={4}>
        <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
        <Descriptions.Item label="年齡">{user.age}</Descriptions.Item>
        <Descriptions.Item label="地址">{user.address}</Descriptions.Item>
        <Descriptions.Item label="計算日">{user.calcDate}</Descriptions.Item>
      </Descriptions>
    </>
  )
}

export default Display