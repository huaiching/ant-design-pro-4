import { Space, Input, Button, InputNumber, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { distributeToData } from './Store/distributeToDataUtil'

const DistributeDemo: React.FC = () => {
  // 使用者清單
  const [users, setUsers] = useState<string[]>([])
  // 當前輸入框名字
  const [name, setName] = useState<string>('')
  // 總筆數
  const [totalItems, setTotalItems] = useState<number>(10)
  // 分配結果
  const [result, setResult] = useState<any[]>([])

  /** 新增使用者 */
  const addUser = () => {
    if (name.trim()) {
      setUsers([...users, name.trim()])
      setName('')
    }
  }

  /** 移除單個使用者 */
  const removeUser = (user: string) => {
    setUsers(users.filter((u) => u !== user))
  }

  /** 清空使用者清單、輸入框、分配結果 */
  const resetAll = () => {
    setUsers([])
    setName('')
    setResult([])
  }

  /** 計算分配結果 */
  const calculate = () => {
    const people = users.map((u, idx) => ({ id: idx + 1, name: u }))
    setResult(distributeToData(people, totalItems))
  }

  /** Table 欄位設定 */
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '分到數量', dataIndex: 'count', key: 'count' },
  ]

  return (
    <div style={{ padding: 24 }}>
      <h2>平均分配工具</h2>

      {/* 新增使用者 + 重製按鈕 */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder='輸入姓名'
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type='primary' onClick={addUser}>
          新增使用者
        </Button>
        <Button onClick={resetAll} danger>
          重製
        </Button>
      </Space>

      {/* 已新增使用者列表 */}
      <div style={{ margin: '12px 0' }}>
        {users.length > 0 ? (
          <Space wrap>
            {users.map((u, idx) => (
              <Tag
                key={idx}
                color='blue'
                closable
                onClose={() => removeUser(u)}
              >
                {u}
              </Tag>
            ))}
          </Space>
        ) : (
          <span style={{ color: '#999' }}>尚未新增使用者</span>
        )}
      </div>

      {/* 總筆數輸入 */}
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>總筆數：</span>
        <InputNumber
          min={1}
          value={totalItems}
          onChange={(val) => setTotalItems(val || 1)}
        />
      </div>

      {/* 計算按鈕 */}
      <Button type='primary' onClick={calculate} disabled={users.length === 0}>
        開始分配
      </Button>

      {/* 分配結果表格 */}
      <Table
        style={{ marginTop: 24 }}
        dataSource={result}
        columns={columns}
        rowKey='id'
        pagination={false}
      />
    </div>
  )
}

export default DistributeDemo
