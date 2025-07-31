/**
 * 輸入使用者資訊，保存到 mobx 全域變數中
 */
import React from 'react'
import { ProForm, ProFormText, ProFormDigit } from '@ant-design/pro-components'
import { Card, message } from 'antd'
import userStore, { UserInfo } from '../Mobx/userStore'
import { observer } from 'mobx-react'

const Create: React.FC = () => {
  return (
    <Card title="輸入使用者資料" bordered={false}>
      <ProForm
        onFinish={async (values: any) => {
          userStore.setUser(values)
          message.success('使用者資料已儲存')
        }}
        initialValues={userStore.user}
      >
        <ProFormText 
          name="name" 
          label="姓名" 
          rules={[{ required: true }]} 
        />
        <ProFormDigit 
          name="age" 
          label="年齡" 
          rules={[{ required: true }]} 
        />
        <ProFormText 
          name="email" 
          label="Email" 
          rules={[{ required: true, type: 'email' }]} 
          />
      </ProForm>
    </Card>
  )
}

export default observer(Create)
