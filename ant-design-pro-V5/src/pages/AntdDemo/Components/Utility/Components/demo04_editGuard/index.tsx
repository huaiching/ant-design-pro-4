import React, { useState } from 'react'
import { Button, Space } from 'antd'
import editGuard from '@/utils/EditGuard'

const MyPage: React.FC = () => {

  // 啟用編輯防護
  const [editMode, setEditMode] = useState(true)
  editGuard(editMode, setEditMode)

  return (
    <div>
      <h2>保護頁面範例</h2>
      {editMode ? (
        <p>目前在編輯模式中</p>
      ) : (
        <p>目前在瀏覽模式</p>
      )}
      <Space>
        <Button type="primary" onClick={() => setEditMode(true)}>
          進入編輯模式
        </Button>
        <Button
          className="ignore-guard"
          onClick={() => setEditMode(false)}
        >
          離開編輯模式
        </Button>
      </Space>
    </div>
  )
}

export default MyPage
