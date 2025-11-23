import { Space, Input, Button, Tag, InputNumber, Table, List } from 'antd'
import React, { useState } from 'react'
import { distributeToData } from './Store/distributeToDataUtil'
import { assignDataToAssignees } from './Store/assignDataToAssignees' // 假設已建立這個 util

const DistributeDemo: React.FC = () => {
  // 使用者清單
  const [users, setUsers] = useState<string[]>([])
  const [name, setName] = useState<string>('')

  // 文件清單
  const [files, setFiles] = useState<string[]>([])
  const [fileName, setFileName] = useState<string>('')

  // 分配結果 (使用者分到的筆數)
  const [result, setResult] = useState<any[]>([])

  // 文件分配結果 (processUser)
  const [fileAssignment, setFileAssignment] = useState<any[]>([])

  /** 新增使用者 */
  const addUser = () => {
    if (name.trim()) {
      setUsers([...users, name.trim()])
      setName('')
    }
  }

  /** 移除使用者 */
  const removeUser = (user: string) => {
    setUsers(users.filter((u) => u !== user))
  }

  /** 新增文件 */
  const addFile = () => {
    if (fileName.trim()) {
      setFiles([...files, fileName.trim()])
      setFileName('')
    }
  }

  /** 移除文件 */
  const removeFile = (file: string) => {
    setFiles(files.filter((f) => f !== file))
  }

  /** 重置所有資料 */
  const resetAll = () => {
    setUsers([])
    setName('')
    setFiles([])
    setFileName('')
    setResult([])
    setFileAssignment([])
  }

  /** 計算分配結果 (每個使用者分到的筆數) */
  const calculate = () => {
    const people = users.map((u, idx) => ({ id: idx + 1, name: u }))
    const totalItems = files.length
    setResult(distributeToData(people, totalItems))
    setFileAssignment([]) // 重置文件分配結果
  }

  /** 文件處理者分配 */
  const assignFiles = () => {
    if (!result.length || !files.length) return
    const assignedFiles = assignDataToAssignees(files.map(f => ({ fileName: f })), result, 'userCode')
    setFileAssignment(assignedFiles)
  }

  /** Table 欄位設定 (count 可編輯) */
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    {
      title: '分到筆數',
      dataIndex: 'count',
      key: 'count',
      render: (value: number, record: any) => (
        <InputNumber
          min={0}
          value={value}
          onChange={(val) => {
            const newResult = result.map((r) =>
              r.id === record.id ? { ...r, count: val || 0 } : r
            )
            setResult(newResult)
            setFileAssignment([]) // 人工修改後重置文件分配
          }}
        />
      ),
    },
  ]

  /** 文件分配 Table */
  const fileColumns = [
    { title: '文件名稱', dataIndex: 'fileName', key: 'fileName' },
    { title: '處理者', dataIndex: 'userCode', key: 'userCode' },
  ]

  return (
    <div style={{ padding: 24 }}>
      <h2>平均分配工具</h2>

      {/* 使用者管理 */}
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
          重置
        </Button>
      </Space>

      {/* 使用者列表 */}
      <div style={{ marginBottom: 16 }}>
        {users.length > 0 ? (
          <Space wrap>
            {users.map((u, idx) => (
              <Tag key={idx} color='blue' onClose={() => removeUser(u)}>
                {u}
              </Tag>
            ))}
          </Space>
        ) : (
          <span style={{ color: '#999' }}>尚未新增使用者</span>
        )}
      </div>

      {/* 文件管理 */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder='輸入文件名稱'
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type='primary' onClick={addFile}>
          新增文件
        </Button>
      </Space>

      {/* 文件列表 */}
      <div style={{ marginBottom: 16 }}>
        {files.length > 0 ? (
          <Space wrap>
            {files.map((f, idx) => (
              <Tag key={idx} color='green' onClose={() => removeFile(f)}>
                {f}
              </Tag>
            ))}
          </Space>
        ) : (
          <span style={{ color: '#999' }}>尚未新增文件</span>
        )}
      </div>

      {/* 計算分配按鈕 */}
      <Space style={{ marginBottom: 16 }}>
        <Button
          type='primary'
          onClick={calculate}
          disabled={users.length === 0 || files.length === 0}
        >
          開始分配
        </Button>
        <Button
          type='default'
          onClick={assignFiles}
          disabled={!result.length || !files.length}
        >
          分配文件處理者
        </Button>
      </Space>

      {/* 使用者分配結果 Table */}
      {result.length > 0 && (
      <div style={{ marginTop: 24 }}>
        <h3>每個使用者分到的筆數</h3>
        <Table
          dataSource={result}
          columns={columns}
          rowKey='id'
          pagination={false}
        />
      </div>
      )}

      {/* 文件分配結果 Table */}
      {fileAssignment.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3>文件處理者分配結果</h3>
          <Table
            dataSource={fileAssignment}
            columns={fileColumns}
            rowKey='fileName'
            pagination={false}
          />
        </div>
      )}
        <List
          size="small"
          dataSource={[
            "本頁僅是使用範例",
            "重點是 Store 裡面的 distributeToDataUtil.tsx (分配數量) 和 assignDataToAssignees.tsx (分配處理者) 這兩個方法",
            ""
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
    </div>
  )
}

export default DistributeDemo
