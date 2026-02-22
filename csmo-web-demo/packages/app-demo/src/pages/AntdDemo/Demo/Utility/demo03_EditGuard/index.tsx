import React, { useState } from 'react'
import { Alert, Button, Card, List, Space, Typography } from 'antd'
import editGuard from '@/utils/EditGuard'
import { MliFormRow } from '@mli-csmo/base'
import { ProForm, PageContainer } from '@ant-design/pro-components'

const MyPage: React.FC = () => {

  // 啟用編輯防護
  const [editMode, setEditMode] = useState(true)
  editGuard(editMode, setEditMode)

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm submitter={false} layout="vertical">
        <Typography.Title level={2}>保護頁面範例</Typography.Title>
        {editMode ? (
          <Alert message="目前在 編輯模式 中" type="warning" showIcon />
        ) : (
          <Alert message="目前在 瀏覽模式 中" type="success" showIcon />
        )}
        <br />
        <br />
        <Space>
          <Button type="primary" onClick={() => setEditMode(true)}>
            進入編輯模式
          </Button>
          <Button onClick={() => setEditMode(false)}>
            離開編輯模式
          </Button>
        </Space>
        <br />
        <br />
        <br />
        <Typography.Title level={3}>使用說明：</Typography.Title>
        <List
          size="small"
          dataSource={[
            "1. 開啟 編輯保護模式 時，透過 左側菜單 進行 頁面跳轉 時，會出現告警視窗。",
            "2. 使用時，需要於頁面中，使用下面指令　開啟編輯保護模式。",
            "　const [editMode, setEditMode] = useState(true)",
            "　editGuard(editMode, setEditMode)",
            "3. 需要關閉 編輯保護模式 時，觸發下面指令 即可。",
            "　setEditMode(false)",
            "4. 相關工具 位於 utils/EditGuard.tsx。"
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </ProForm>
    </PageContainer >
  )
}

export default MyPage
