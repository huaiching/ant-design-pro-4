import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, Input, message, Spin, Tag, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'

// 模擬取得後端資料的 API
const fetchTableData = async () => {
  return {
    data: [
      {
        id: Math.random(),
        policyNo: 'P0000001',
        poStsCode: '有效',
        planCode: 'A01',
        node: 'N',
      },
      {
        id: Math.random(),
        policyNo: 'P0000002',
        poStsCode: '有效',
        planCode: 'A01',
        node: 'Y',
      },
    ],
  }
}

const MyForm: React.FC = () => {
  // 表單載入中狀態
  const [loading, setLoading] = useState<boolean>(false)

  // 表單實例 ref，用來操作 ProForm
  const formRef = useRef<ProFormInstance>()

  // 用來控制哪些列是可編輯狀態
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])

  // 自訂輸入欄位：保單號碼輸入框的狀態
  const [policyNoInput, setPolicyNoInput] = useState<string>('')

  // 初始化載入資料
  useEffect(() => {
    setLoading(true)
    fetchTableData()
      .then((res) => {
        // 將資料設定進表單欄位 editTable 中
        formRef.current?.setFieldsValue({
          editTable: res.data,
        })
        // 設定目前資料列的 id 為可編輯
        const ids = res.data.map((item) => item.id)
        setEditableKeys(ids)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // 初始化或更新時，確保所有列皆可編輯
  useEffect(() => {
    const editTable = formRef.current?.getFieldValue('editTable') || []
    const ids = editTable.map((item: any) => item.id)
    setEditableKeys(ids)
  })

  // 表格欄位設定
  const columns: ProColumns<any>[] = [
    {
      title: '保單號碼',
      dataIndex: 'policyNo',
      valueType: 'text',
      editable: false, // 不可編輯
      fieldProps: {
        allowClear: false,
      }
    },
    {
      title: '保單狀態',
      dataIndex: 'poStsCode',
      valueType: 'text',
      fieldProps: {
        allowClear: false,
      }
    },
    {
      title: '主約險種',
      dataIndex: 'planCode',
      valueType: 'text',
      fieldProps: {
        allowClear: false,
      }
    },
    {
      title: '批註',
      dataIndex: 'node',
      valueType: 'text',
      editable: false,
      fieldProps: {
        allowClear: false,
      },
      render: (value, record) => {
        // 根據值顯示不同顏色的 Tag
        return record.node === 'Y' ? (
          <Tag
            color="red"
            onClick={() => message.info('有批註喔')}
            style={{ cursor: 'pointer' }}
          >
            Y
          </Tag>
        ) : (
          <Tag color="default">N</Tag>
        )
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60, // 編輯欄寬度
    },
  ]

  // 表單底部提交/取消區塊（自訂 FooterToolbar）
  const submitterRender = () => ({
    render: () => (
      <FooterToolbar>
        <Button
          type="primary"
          onClick={async () => {
            try {
              // 驗證表單欄位
              await formRef.current?.validateFields()
              const editableData = formRef.current?.getFieldValue('editTable')
              console.info('提交資料：', editableData)
              message.success('表單提交成功！')
            } catch {
              message.error('驗證失敗，請檢查輸入')
            }
          }}
        >
          確認
        </Button>
        <Button
          onClick={() => {
            message.warning('取消作業')
          }}
        >
          取消
        </Button>
      </FooterToolbar>
    ),
  })

  // 自訂新增一筆空白資料（依據使用者輸入的保單號碼）
  const handleAddRow = () => {
    if (!policyNoInput) {
      message.warning('請輸入保單號碼')
      return
    }
    const existing = formRef.current?.getFieldValue('editTable') || []
    // 檢查是否已存在
    if (existing.some((item: any) => item.policyNo === policyNoInput)) {
      message.error('保單號碼已存在')
      return
    }

    // 建立新資料列
    const newItem = {
      id: (Math.random() * 1000000).toFixed(0),
      policyNo: policyNoInput,
      poStsCode: '',
      planCode: '',
      node: 'N',
    }
    const newData = [...existing, newItem]
    formRef.current?.setFieldsValue({ editTable: newData })
    setEditableKeys(newData.map((item: any) => item.id))
    setPolicyNoInput('') // 清空輸入框
  }

  return (
    <>
      <h2>InputEditableProTable</h2>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={submitterRender()} // 自訂底部 submit 區塊
      >
        <Spin spinning={loading}>
          <EditableProTable
            name="editTable" // 綁定表單欄位
            columns={columns}
            rowKey="id"
            headerTitle="保單編輯清單"
            // 工具列：保單號碼輸入框 + 自訂新增按鈕
            toolBarRender={() => [
              <Input
                key="input"
                placeholder="請輸入保單號碼"
                value={policyNoInput}
                onChange={(e) => setPolicyNoInput(e.target.value)}
                style={{ width: 200 }}
              />,
              <Button key="add" type="primary" onClick={handleAddRow}>
                新增空白資料
              </Button>,
            ]}
            recordCreatorProps={false} // 關閉內建新增功能，改用自訂按鈕
            editable={{
              type: 'multiple', // 多筆可同時編輯
              editableKeys: editableKeys,
              actionRender: (row, config, defaultDoms) => {
                // 自訂操作列：僅保留刪除功能
                return [defaultDoms.delete]
              },
              onChange: setEditableKeys,
            }}
          />
        </Spin>
      </ProForm>
    </>
  )
}

export default MyForm
