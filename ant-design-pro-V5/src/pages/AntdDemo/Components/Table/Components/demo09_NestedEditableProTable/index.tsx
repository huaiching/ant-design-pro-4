// 引入所需元件與函式庫
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { Button, Card, message, Popconfirm, Spin } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import './store/index.less'
import { DeleteOutlined } from '@ant-design/icons'

// 主元件定義
const NestedEditableProTable: React.FC = () => {
  // 狀態管理：載入中
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false)
  // 表單參考，用來取得或設定表單資料
  const formRef = useRef<ProFormInstance>()
  // 外層保單表格可編輯列的 key 值
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])
  // 內層保障子表格的每一個保單對應的可編輯 key 值
  const [coEditableKeys, setCoEditableKeys] = useState<Record<string, React.Key[]>>({})
  // 控制展開列
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([])

  // 模擬 API 載入資料
  useEffect(() => {
    const data = [
      {
        id: 1,
        policyNo: '100000000001',
        poStsCode: '有效',
        poIssueDate: '114/01/10',
        coList: [
          {
            id: 1,
            coverageNo: 1,
            planCode: 'A001',
            rateScale: '0',
            coStsCode: '有效',
            coIssueDate: '114/01/01'
          },
          {
            id: 2,
            coverageNo: 2,
            planCode: 'A002',
            rateScale: '0',
            coStsCode: '有效',
            coIssueDate: '114/01/01'
          }
        ]
      },
      {
        id: 2,
        policyNo: '100000000002',
        poStsCode: '有效',
        poIssueDate: '113/10/14',
        coList: [
          {
            id: 1,
            coverageNo: 1,
            planCode: 'B001',
            rateScale: '0',
            coStsCode: '有效',
            coIssueDate: '113/10/14'
          },
          {
            id: 2,
            coverageNo: 2,
            planCode: 'B002',
            rateScale: '0',
            coStsCode: '有效',
            coIssueDate: '113/10/14'
          }
        ]
      }
    ]

    // 將字串日期轉換為 dayjs 物件以供 ProForm 處理
    const chgData = data.map((po) => ({
      ...po,
      poIssueDate: dayjs(po.poIssueDate, 'TTT/MM/DD'),
      coList: po.coList.map((co) => ({
        ...co,
        coIssueDate: dayjs(co.coIssueDate, 'TTT/MM/DD')
      }))
    }))

    // 設定表單初始值
    formRef.current?.setFieldsValue({ editTable: chgData })

    // 初始化保單可編輯列
    setEditableKeys(data.map((item) => item.id))

    // 初始化每張保單對應的保障項目可編輯列
    setCoEditableKeys(
      data.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item.coList?.map((co) => co.id) || []
        }),
        {}
      )
    )
    // 預設展開全部資料
    setExpandedRowKeys(chgData.map((item) => item.id))
  }, [])

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

  // 外層保單表格的欄位定義
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

  // 內層保障項目表格的欄位定義
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

  return (
    <>
      <ProForm grid layout="vertical" formRef={formRef} submitter={submitterRender()}>
        <Card style={{ width: '100%' }}>
          <Spin spinning={loading}>
            <EditableProTable
              name="editTable"
              columns={poColumns}
              rowKey="id"
              scroll={{
                x: 1000 // 父子表格一致
              }}
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
                // 更新對應保單的保單可編輯列
                onChange: setEditableKeys,
                actionRender: (row) => [
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
              }}
              // 子表格（保障清單）展開設定
              expandable={{
                expandedRowRender: (record, index) => {
                  // 有些型別定義 index 可能是可選，保險起見再算一次
                  const table = formRef.current?.getFieldValue('editTable') || []
                  const rowIndex =
                    typeof index === 'number'
                      ? index
                      : table.findIndex((x: any) => x.id === record.id)

                  return (
                    <EditableProTable
                      rowKey="id"
                      columns={coColumns}
                      // ✅ 用索引定位到當列的 coList
                      name={['editTable', rowIndex, 'coList']}
                      scroll={{
                        x: 1000 // 父子表格一致
                      }}
                      recordCreatorProps={{
                        newRecordType: 'dataSource',
                        record: () => ({
                          id: (Math.random() * 1000000).toFixed(0)
                        }),
                        creatorButtonText: '新增保障',
                        style: { backgroundColor: 'rgba(243, 255, 200, 1)' }
                      }}
                      editable={{
                        type: 'multiple',
                        editableKeys: coEditableKeys[record.id] || [],
                        onChange: (keys) =>
                          setCoEditableKeys((prev) => ({ ...prev, [record.id]: keys })),
                        actionRender: (row, config, defaultDoms) => [
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
                                setCoEditableKeys((prev) => ({
                                  ...prev,
                                  [record.id]: newCoList.map((co: any) => co.id)
                                }))
                              }
                            }}
                          >
                            <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: 16 }} />
                          </Popconfirm>
                        ]
                      }}
                    />
                  )
                },
                expandedRowKeys,
                onExpandedRowsChange: (keys: any) => setExpandedRowKeys(keys)
              }}
            />
          </Spin>
        </Card>
      </ProForm>
    </>
  )
}

export default NestedEditableProTable
