// 引入所需元件與函式庫
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { Button, message, Popconfirm, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import './store/index.less'
import { DeleteOutlined } from '@ant-design/icons'
import { fetchAllData } from './Store/dataApi'
import { rocStringToDayjs } from '@/utils/Dayjs/rocDateUtils'

// 主元件定義
const NestedEditableProTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [loading, setLoading] = useState<boolean>(false)

  // 可編輯的明細資料序號
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])
  const [subEditableKeys, setSubEditableKeys] = useState<Record<string, React.Key[]>>({})

  // 查詢 API 設定
  const requestApi = async () => {
    const res = await fetchAllData()
    // 日期資料格式轉換
    const data = res.map((po: any) => ({
      ...po,
      poIssueDate: rocStringToDayjs(po.poIssueDate),
      coList: po.coList.map((co: any) => ({
        ...co,
        coIssueDate: rocStringToDayjs(co.coIssueDate)
      }))
    }))

    // 資料儲存
    formRef.current?.setFieldValue('editTable', data)

    // 設定目前資料列的 id 為可編輯
    // 主表格
    const ids = data.map((item) => item.id)
    setEditableKeys(ids)
    // 子表格
    const subIds = data.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item.coList?.map((co: any) => co.id) || []
      }),
      {}
    )
    setSubEditableKeys(subIds)

    // 預設展開全部資料
    setExpandedRowKeys(data.map((item) => item.id))
  }

  // 頁面初始化就要抓取資料
  useEffect(() => {
    setLoading(true)
    requestApi()
    setLoading(false)
  }, [])

  // 控制展開列
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([])

  // 表單底部的提交按鈕渲染函式
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type="primary"
            onClick={async () => {
              try {
                // 驗證整個表單
                await formRef.current?.validateFields()
                const editableData = formRef.current?.getFieldValue('editTable')
                console.info('提交資料：', editableData)
                message.success('表單提交成功！')
              } catch (err) {
                message.error('請檢查表單錯誤')
              }
            }}
            key="save"
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
      )
    }
  }

  // 主表格 欄位設定
  const poColumns: ProColumns<any>[] = [
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60
    },
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
      title: '保單生效日',
      dataIndex: 'poIssueDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD'
      }
    }
  ]

  // 子表格 欄位設定
  const coColumns: ProColumns<any>[] = [
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60
    },
    {
      title: '保障序號',
      dataIndex: 'coverageNo',
      valueType: 'text'
    },
    {
      title: '險種代碼',
      dataIndex: 'planCode',
      valueType: 'text'
    },
    {
      title: '險種版數',
      dataIndex: 'rateScale',
      valueType: 'text'
    },
    {
      title: '保障狀態',
      dataIndex: 'coStsCode',
      valueType: 'text'
    },
    {
      title: '保障生效日',
      dataIndex: 'coIssueDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD',
        style: { width: '100%' }
      }
    }
  ]

  // 主表格 編輯表格的操作區設定
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
      <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: 16 }} />
    </Popconfirm>
  ]

  // 子表格 編輯表格的操作區設定
  const subActionRender = (row: any, record: any) => [
    <Popconfirm
      key="delete"
      title="確定刪除保障嗎？"
      onConfirm={() => {
        const table = formRef.current?.getFieldValue('editTable') || []
        const poIndex = table.findIndex((po: any) => po.id === record.id)

        if (poIndex !== -1) {
          const oldCoList = table[poIndex].coList || []
          const newCoList = oldCoList.filter((co: any) => co.id !== row.id)

          // 更新表單資料
          formRef.current?.setFieldValue(['editTable', poIndex, 'coList'], newCoList)

          // 更新 coEditableKeys
          setSubEditableKeys((prev) => ({
            ...prev,
            [record.id]: newCoList.map((co: any) => co.id)
          }))
        }
      }}
    >
      <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: 16 }} />
    </Popconfirm>
  ]

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm grid layout="vertical" formRef={formRef} submitter={submitterRender()}>
        <div style={{ width: '100%' }}>
          <Spin spinning={loading}>
            <EditableProTable
              name="editTable"
              rowKey="id"
              columns={poColumns}
              size='small'
              // 設定表格底色
              // rowClassName={'ant-table-row-selected'}  // 設定表格底色: 預設顏色
              rowClassName={() => 'custom-selected-row'} // 設定表格底色: 透過 CSS 設定
              // 新增按鈕
              recordCreatorProps={{
                newRecordType: 'dataSource',
                record: () => ({
                  id: (Math.random() * 1000000).toFixed(0)
                }),
                creatorButtonText: '新增保單',
                style: { backgroundColor: 'rgba(206, 230, 255, 1)' }
              }}
              // 編輯設定
              editable={{
                type: 'multiple',
                editableKeys: editableKeys,
                onChange: setEditableKeys,
                actionRender: actionRender
              }}
              // 子表格
              expandable={{
                expandedRowKeys, // 用狀態控制展開
                onExpandedRowsChange: (keys: any) => setExpandedRowKeys(keys), // 更新展開狀態
                expandedRowRender: (mainRow, index) => {
                  // 建立索引 index
                  const table = formRef.current?.getFieldValue('editTable') || []
                  const rowIndex =
                    typeof index === 'number'
                      ? index
                      : table.findIndex((x: any) => x.id === mainRow.id)
                  return (
                    <EditableProTable
                      name={['editTable', rowIndex, 'coList']}
                      rowKey="id"
                      columns={coColumns}
                      size='small'
                      style={{
                        paddingLeft: 50,
                      }}
                      // 新增按鈕
                      recordCreatorProps={{
                        newRecordType: 'dataSource',
                        record: () => ({
                          id: (Math.random() * 1000000).toFixed(0)
                        }),
                        creatorButtonText: '新增保障',
                        style: { backgroundColor: 'rgba(243, 255, 200, 1)' }
                      }}
                      // 編輯設定
                      editable={{
                        type: 'multiple',
                        editableKeys: subEditableKeys[mainRow.id] || [],
                        onChange: (keys) =>
                          setSubEditableKeys((prev) => ({ ...prev, [mainRow.id]: keys })),
                        actionRender: (row) => subActionRender(row, mainRow)
                      }}
                    />
                  )
                }
              }}
            />
          </Spin>
        </div>
      </ProForm>
    </PageContainer>
  )
}

export default NestedEditableProTable
