import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Button, Card, Input, message, Modal, Popconfirm, Spin, Tag } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { fetchAllData } from './Store/dataApi'
import { DeleteOutlined } from '@ant-design/icons'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [loading, setLoading] = useState<boolean>(false)

  // 可編輯的明細資料序號
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])

  // 自訂輸入欄位：保單號碼輸入框的狀態
  const [policyNoInput, setPolicyNoInput] = useState<string>('')

  // 查詢 API 設定
  const requestApi = async () => {
    const res = await fetchAllData()
    formRef.current?.setFieldValue('editTable', res)
    // 設定目前資料列的 id 為可編輯
    const ids = res.map((item) => item.id)
    setEditableKeys(ids)
  }

  // 控制送出後之動作
  const submitterRender = () => {
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        formRef.current?.validateFields().then(() => {
          // 取得資料
          const data = formRef.current?.getFieldValue('editTable')
          console.info('editableData', data)
          message.success('表單提交成功！')
        })
      },
      onCancel() {
        // 取消按鈕 點擊後 要進行的 API 操作
        message.warning('取消作業')
      }
    })
  }

  // 頁面初始化就要抓取資料
  useEffect(() => {
    setLoading(true)
    requestApi()
    setLoading(false)
  }, [])

  // 表格欄位設定
  const columns: ProColumns<any>[] = [
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60
    },
    {
      title: '保單號碼',
      dataIndex: 'policyNo',
      valueType: 'text',
      editable: false, // 不可編輯
      fieldProps: {
        allowClear: false
      }
    },
    {
      title: '保單狀態',
      dataIndex: 'poStsCode',
      valueType: 'text',
      fieldProps: {
        allowClear: false
      }
    },
    {
      title: '主約險種',
      dataIndex: 'planCode',
      valueType: 'text',
      fieldProps: {
        allowClear: false
      }
    },
    {
      title: '批註',
      dataIndex: 'node',
      valueType: 'text',
      editable: false,
      fieldProps: {
        allowClear: false
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
      }
    },
  ]

  // 編輯表格的操作區設定
  const actionRender = (row: any) => [
    <Popconfirm
      key="delete"
      title="確定刪除嗎？"
      onConfirm={() => {
        // 取得現有資料
        const currentData = formRef.current?.getFieldValue('editTable') || []
        // 過濾刪除該列
        const newData = currentData.filter((item: any) => item.id !== row.id)
        // 更新表單欄位資料
        formRef.current?.setFieldValue('editTable', newData)
        // 同步更新 editableKeys
        setEditableKeys(newData.map((item: any) => item.id))
      }}
    >
      <DeleteOutlined style={{ color: 'red' }} />
    </Popconfirm>
  ]

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
      node: 'N'
    }
    const newData = [...existing, newItem]
    formRef.current?.setFieldValue('editTable', newData)
    setEditableKeys(newData.map((item: any) => item.id))
    setPolicyNoInput('') // 清空輸入框
  }

  // 工具欄
  const toolBarRender = () => [
    <Input
      key="input"
      placeholder="請輸入保單號碼"
      value={policyNoInput}
      onChange={(e) => setPolicyNoInput(e.target.value)}
      style={{ width: 200 }}
    />,
    <Button key="add" type="primary" onClick={handleAddRow}>
      新增空白資料
    </Button>
  ]

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={false} // 自訂底部 submit 區塊
      >
        <div style={{ width: '100%' }}>
          <Spin spinning={loading}>
            <EditableProTable
              headerTitle="保單編輯清單"
              name="editTable"
              rowKey="id"
              columns={columns}
              size='small'
              // 新增按鈕
              recordCreatorProps={false} // 關閉內建新增功能，改用自訂按鈕
              // 編輯設定
              editable={{
                type: 'multiple',
                editableKeys: editableKeys,
                onChange: setEditableKeys,
                actionRender: actionRender
              }}
              // 工具欄
              toolBarRender={toolBarRender}
            />

            {/* 底部功能區 */}
            <FooterToolbar>
              <Button type='primary' onClick={submitterRender}>送出</Button>
            </FooterToolbar>
          </Spin>
        </div>
      </ProForm>
    </PageContainer>
  )
}

export default MyForm
