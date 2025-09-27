import React, { useEffect, useRef, useState } from 'react'
import { ProTable, ActionType, ProColumns, ProCard, ProForm, FooterToolbar, ProFormInstance } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import ModelEdit from './components/ModelEdit'

interface Policy {
  policyNo: string
  poStsCode: string
  basicPlanCode: string
  basicRateScale: string
  poIssueDate?: string
  o1Name?: string
  i1Name?: string
  address?: string
  phone?: string
  eMail?: string
}

const initValue = [
  {
    policyNo: 'P123456789',
    poStsCode: '有效',
    basicPlanCode: 'A001',
    basicRateScale: 'V1',
    poIssueDate: '2023-01-01',
    o1Name: '王大明',
    i1Name: '王小明',
    address: '台北市信義區',
    phone: '0912345678',
    eMail: 'example@mail.com'
  }
]

const ShowPolicyTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  // 編輯模式: 'create' 為新增，'edit' 為編輯
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [dataSource, setDataSource] = useState<any[]>([]) // 主表資料
  const [visible, setVisible] = useState(false) // 管理 ModelForm 的開關狀態
  const [editableRow, setEditableRow] = useState<Policy | undefined>() // 編輯行的資料
  // ProTable 的 分頁控制
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5
  })

  // 初始化表格資料
  useEffect(() => {
    setDataSource(initValue)
  }, [])

  // 自動將初始資料寫入 formRef 中，因為 ProTable 的資料需要手動塞入 formRef 中，設定 name 無效
  useEffect(() => {
    // 初始化表單資料
    formRef.current?.setFieldsValue({
      policyTable: dataSource
    })
  }, [dataSource])


  const columns: ProColumns<Policy>[] = [
    { title: '保單號碼', dataIndex: 'policyNo', valueType: 'text' },
    { title: '保單狀態', dataIndex: 'poStsCode', valueType: 'text' },
    { title: '主約險種代碼', dataIndex: 'basicPlanCode', valueType: 'text' },
    { title: '主約險種版數', dataIndex: 'basicRateScale', valueType: 'text' }
  ]

  // 編輯區域 的 儲存按鈕事件
  const handleSave = (updated: Policy) => {
    if (formMode === 'edit') {
      // 修改
      setDataSource((prev) =>
        prev.map((item) => (item.policyNo === updated.policyNo ? updated : item))
      )
      message.success('修改成功')
    } else {
      // 新增
      const newRecord = { ...updated }
      setDataSource((prev) => [...prev, newRecord])
      message.success('新增成功')
    }
    setEditableRow(undefined)
  }

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type='primary'
            onClick={async () => {
              console.info('formRef', formRef.current?.getFieldValue('policyTable'))
              message.success('表單提交成功！')
            }}
            key='save'
          >
            確認
          </Button>
          <Button
            onClick={async () => {
              // 取消按鈕 點擊後 要進行的 API 操作
              message.warning('取消作業')
            }}
          >
            取消
          </Button>
        </FooterToolbar>
      )
    }
  }

  return (
    <ProForm
      grid
      layout='vertical'
      formRef={formRef}
      submitter={submitterRender()}
    >
      <ProCard ghost>
        <ProTable
          columns={columns}
          dataSource={dataSource}
          cardProps={false}      //  移除 Card 包裝
          rowKey='policyNo'
          options={false} // 關閉選單
          search={false} // 關閉搜尋欄
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50', '100'],
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize })
            }
          }}
          // row 有無點選 的 樣式設定
          rowClassName={(record) =>
            record.policyNo === editableRow?.policyNo ? 'ant-table-row-selected' : ''
          }
          // 點擊 row 觸發事件
          onRow={(record) => ({
            onClick: () => {
              setEditableRow({ ...record }) // 將點擊row的資料，設定為 編輯列
              setFormMode('edit') // 設定編輯狀態：edit
              setVisible(true)  // 開啟 Model
            }
          })}
          toolbar={{
            title: '保單清單',
            actions: [
              <Button key='new' type='primary'
                onClick={() => {
                  setEditableRow({} as Policy)  // 新增：編輯列定為 空值
                  setFormMode('create') // 設定編輯狀態：create
                }}>
                新增
              </Button>
            ]
          }}
        />
        <br />

        <ModelEdit
          mode={formMode}
          initialValues={editableRow}
          onSubmit={handleSave}
          visible={visible}
          setVisible={setVisible}
        />

      </ProCard>
    </ProForm>
  )
}

export default ShowPolicyTable
