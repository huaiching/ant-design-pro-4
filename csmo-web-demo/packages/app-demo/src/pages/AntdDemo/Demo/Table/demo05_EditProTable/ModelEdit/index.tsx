import React, { useEffect, useRef, useState } from 'react'
import { ProTable, ProColumns, ProForm, FooterToolbar, ProFormInstance } from '@ant-design/pro-components'
import { Button, message, Modal } from 'antd'
import ModelEdit from './Components/ModelEdit'
import { fetchAllData } from './Store/dataApi'
import { rocStringToDayjs, dayjsToRocString } from '@/utils/Dayjs/rocDateUtils'

const ShowPolicyTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // ProTable 的 分頁控制
  const pageSizeOptions = ['5', '10', '20', '50', '100']
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })

  // 數據源
  const [dataSource, setDataSource] = useState<any[]>([])

  // 查詢 API 設定
  const requestApi = async () => {
    const res = await fetchAllData()
    // 資料格式轉換: 如果有 日期 資料，要轉為 Dayjs 格式，才能正確顯示在 ProTable 的 date 欄位
    const output = res.map((e: any) => ({
      ...e,
      poIssueDate: rocStringToDayjs(e.poIssueDate)
    }))
    setDataSource(output)
    setPagination(prev => ({ ...prev, current: 1 }))
    formRef.current?.setFieldValue('policyTable', output)
  }

  // 頁面初始化就要抓取資料
  useEffect(() => {
    requestApi()
  }, [])

  // formRef 資料同步
  useEffect(() => {
    const data = dataSource.map(e => ({
      ...e,
      poIssueDate: dayjsToRocString(e.poIssueDate)
    }))
    formRef.current?.setFieldValue('policyTable', data)
  }, [dataSource])

  // 刪除作業
  const deleteData = (index: any) => {
    const data = dataSource.filter(e => !index.includes(e.policyNo))
    setDataSource(data)
  }

  /** 編輯區設定 **/
  // 編輯模式: 'create' 為新增，'edit' 為編輯
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  // 編輯行的資料
  const [editableRow, setEditableRow] = useState<any>()
  // ModelForm 開關
  const [visible, setVisible] = useState(false)
  // 編輯區域 的 儲存按鈕事件
  const handleSave = (updated: any) => {
    switch (formMode) {
      case 'create':
        const newRecord = { ...updated }
        setDataSource((prev) => [...prev, newRecord])
        message.success('新增成功')
        break
      case 'edit':
        setDataSource((prev) =>
          prev.map((item) => (item.policyNo === updated.policyNo ? updated : item))
        )
        message.success('修改成功')
        break
    }
    setEditableRow(undefined)
  }

  /** 勾選設定 **/
  // 記錄勾選的key
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  // 勾選導出事件
  const handleDelete = () => {
    // 取得勾選資料
    const selectedData = dataSource.filter((item) => selectedRowKeys.includes(item.policyNo))
    // 進行刪除作業
    Modal.confirm({
      content: "確定要刪除嗎？",
      onOk() {
        selectedData.forEach(e => {
          deleteData(e.policyNo)
        })
      },
    })
    setSelectedRowKeys([]) // 清空勾選
  }
  // 取消勾選事件
  const handleCancel = () => {
    setSelectedRowKeys([]) // 清空勾選
  }

  // 表格欄位定義
  const columns: ProColumns<any>[] = [
    {
      title: '保單號碼',
      dataIndex: 'policyNo',
      valueType: 'text'
    },
    {
      title: '保單狀態',
      dataIndex: 'poStsCode',
      valueType: 'text'
    },
    {
      title:
        '主約險種代碼',
      dataIndex: 'basicPlanCode',
      valueType: 'text'
    },
    {
      title: '主約險種版數',
      dataIndex: 'basicRateScale',
      valueType: 'text'
    }
  ]

  // 控制送出後之動作
  const submitterRender = () => {
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        console.info('formRef', formRef.current?.getFieldValue('policyTable'))
        message.success('表單提交成功！')
      },
      onCancel() {
        // 取消按鈕 點擊後 要進行的 API 操作
        message.warning('取消作業')
      }
    })
  }

  // 工具欄
  const toolBarRender = () => [
    <Button
      color="purple" variant="solid"
      onClick={() => {
        setEditableRow({})  // 新增：編輯列定為 空值
        setFormMode('create') // 設定編輯狀態：create
        setVisible(true)  // 開啟 Model
      }}
    >
      新增
    </Button>
  ]

  return (
    <ProForm
      grid
      layout='vertical'
      formRef={formRef}
      submitter={false}
    >
      <div style={{ width: '100%' }}>
        <ProTable
          headerTitle="浮層表單編輯"
          rowKey='policyNo'
          columns={columns}
          cardProps={false}      //  移除 Card 包裝
          size='small'
          // 數據源
          dataSource={dataSource}
          // 表格操作選項
          options={false}
          // 搜尋欄
          search={false}
          // 分頁
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: pageSizeOptions,
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize })
            }
          }}
          // 工具欄
          toolBarRender={toolBarRender}
          // 選擇行
          rowSelection={{
            type: 'checkbox', // checkbox 選擇框(預設) / radio 單選框
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
            selections: true
          }}
          /** 使用 tableAlertRender 顯示勾選資料與導出按鈕 */
          tableAlertRender={() => (
            <Button color="danger" variant="filled" onClick={handleDelete}>
              刪除
            </Button>
          )}
          /**　使用 tableAlertOptionRender 顯示取消勾選資料 */
          tableAlertOptionRender={() => (
            <Button color="cyan" variant="filled" onClick={handleCancel}>
              取消勾選
            </Button>
          )}
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
        />
        <br />

        <ModelEdit
          mode={formMode}
          initialValues={editableRow}
          onSubmit={handleSave}
          open={visible}
          onOpenChange={setVisible}
        />

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </div>
    </ProForm>
  )
}

export default ShowPolicyTable
