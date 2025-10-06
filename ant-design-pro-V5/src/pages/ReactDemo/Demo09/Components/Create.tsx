/**
 * 輸入使用者資訊，保存到 useSyncExternalStore 全域變數中
 */
import React, { useEffect } from 'react'
import { ProForm, ProFormText, ProFormDigit } from '@ant-design/pro-components'
import { Card, message } from 'antd'
import { useSyncExternalStore } from 'react'
import { UserInfo, userStore } from '../Store/userStore'

const Create: React.FC = () => {
  // 訂閱 user 狀態
  const user = useSyncExternalStore(
    userStore.subscribe,  // 訂閱
    userStore.getUser,    // 客戶端取值
    userStore.getUser     // 伺服器端取值
  )

  useEffect(()=>{
    userStore.init()
  },[])

  return (
    <Card title="輸入使用者資料" bordered={false}>
      <ProForm
        onFinish={async (values: UserInfo) => {
          userStore.setUser(values) // 更新全域 store
          message.success('使用者資料已儲存')
        }}
        initialValues={user} // 使用 store 中的 user 作為表單初始值
      >
        <ProFormText
          name="name"
          label="姓名"
          rules={[{ required: true, message: '請輸入姓名' }]}
        />
        <ProFormDigit
          name="age"
          label="年齡"
          rules={[{ required: true, message: '請輸入年齡' }]}
        />
        <ProFormText
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: '請輸入有效的 Email' }]}
        />
      </ProForm>
    </Card>
  )
}

export default Create