import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components'
import { ProForm, ProTable } from '@ant-design/pro-components'
import { Button, Card, Input, message, Space, Tooltip } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as poApi from './store/poApi'
import { MliFormCol, MliFormRow } from '@/common/base'
import { FormOutlined } from '@ant-design/icons'


const CaseSearchTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>() // 表單參照
  const actionRef = useRef<ActionType>() // 表格操作引用
  const [dataSource, setDataSource] = useState<any[]>([]) // 主表資料
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]) // 勾選中的保單 key
  const [searchKeys, setSearchKeys] = useState<string[]>(['all']) // 選中的標籤
  const [textSearch, setTextSearch] = useState('') // 快速搜尋輸入文字狀態

  // ProTable 的 分頁控制
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5
  })

  // 頁面初始化：取得資料並設定到 form 與畫面
  useEffect(() => {
    poApi.fetchAllData().then((data) => {
      // 日期格式轉換
      const chgData = data.map((e) => ({
        ...e,
        receiveDate: dayjs(e.receiveDate, 'TTT/MM/DD')
      }))
      setDataSource(chgData)
      formRef.current?.setFieldsValue({ policies: chgData })
    })
  }, [])

  // 主表格欄位
  const columns: ProColumns<any>[] = [
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      align: 'center',
      render: (_, entity) => [
        <Tooltip title="編輯" key="edit">
          <Button
            key="detail"
            type="link"
            onClick={() => {
              console.info('點擊編輯 - entity:', entity)
            }}
          >
            <FormOutlined />
          </Button>
        </Tooltip>
      ]
    },
    { title: '受理號碼', dataIndex: 'receiveNo', valueType: 'text' },
    { title: '受理狀態', dataIndex: 'receiveStsCode', valueType: 'text' },
    { title: '承辦人', dataIndex: 'accessUser', valueType: 'text' },
    { title: '處理人', dataIndex: 'processUser', valueType: 'text' },
    {
      title: '受理日期',
      dataIndex: 'receiveDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD'
      }
    }
  ]

  // 動態計算各篩選條件的數量
  const caseSearch = useMemo(() => {
    const counts = {
      all: dataSource.length,
      stsCode2: dataSource.filter((e) => e.receiveStsCode === '承辦').length,
      stsCodeC: dataSource.filter((e) => e.receiveStsCode === '變更完成').length,
      stsCode3: dataSource.filter((e) => e.receiveStsCode === '照會補件').length,
      stsCode5: dataSource.filter((e) => e.receiveStsCode === '結案').length,
      userTypeA: dataSource.filter((e) => e.accessUser === e.processUser).length,
      userTypeB: dataSource.filter((e) => e.accessUser !== e.processUser).length,
    }

    return [
      {
        key: 'receiveStsCode',
        title: '受理狀態',
        children: [
          { key: 'all', title: '全部', colore: 'rgba(150, 150, 150, 1)', count: counts.all },
          { key: 'stsCode2', title: '承辦', colore: 'rgba(255, 0, 0, 1)', count: counts.stsCode2 },
          { key: 'stsCodeC', title: '變更完成', colore: 'rgba(0, 150, 0, 1)', count: counts.stsCodeC },
          { key: 'stsCode3', title: '照會補件', colore: 'rgba(0, 150, 255, 1)', count: counts.stsCode3 },
          { key: 'stsCode5', title: '結案', colore: 'rgba(200, 200, 0, 1)', count: counts.stsCode5 }
        ]
      },
      {
        key: 'user',
        title: '處理類型',
        children: [
          { key: 'userTypeA', title: '同一人', colore: 'rgba(255, 0, 255, 1)', count: counts.userTypeA },
          { key: 'userTypeB', title: '不同人', colore: 'rgba(143, 105, 255, 1)', count: counts.userTypeB }
        ]
      }
    ]
  }, [dataSource])

  // 導出按鈕事件
  const handleExport = () => {
    const allData: any[] = formRef.current?.getFieldValue('policies') || []
    const selectedData = allData.filter((item) => selectedRowKeys.includes(item.key))
    console.info('勾選導出資料：', selectedData)
    message.success(`已導出 ${selectedData.length} 筆資料到 console`)
  }

  // 取消按鈕事件
  const handleCancel = () => {
    setSelectedRowKeys([])
    message.info('已清空勾選項目')
  }

  // 資料篩選
  const filteredData = useMemo(() => {
    setSelectedRowKeys([]) // 每次篩選都清空勾選
    // 如果沒有選擇標籤，自動選上 'all'
    if (searchKeys.length === 0) setSearchKeys(['all'])
    // 開始篩選
    let result = dataSource
    // 文字搜尋
    if (textSearch) {
      const lowerSearch = textSearch.toLowerCase()
      result = result.filter(
        (item) =>
          item.receiveNo?.toLowerCase().includes(lowerSearch) ||
          item.receiveStsCode?.toLowerCase().includes(lowerSearch) ||
          item.accessUser?.toLowerCase().includes(lowerSearch) ||
          item.processUser?.toLowerCase().includes(lowerSearch) ||
          item.receiveDate?.toString().toLowerCase().includes(lowerSearch)
      )
    }
    // 標籤篩選
    if (searchKeys.length > 0) {
      // 受理狀態
      const receiveStsCodeList = caseSearch.find((c) => c.key === 'receiveStsCode')?.children?.map((child) => child.key) || []
      if (searchKeys.some((key) => receiveStsCodeList.includes(key))) {
        result = result.filter((item) => {
          if (searchKeys.includes('all')) return true
          if (searchKeys.includes('stsCode2') && item.receiveStsCode === '承辦') return true
          if (searchKeys.includes('stsCodeC') && item.receiveStsCode === '變更完成') return true
          if (searchKeys.includes('stsCode3') && item.receiveStsCode === '照會補件') return true
          if (searchKeys.includes('stsCode5') && item.receiveStsCode === '結案') return true
          return false
        })
      }
      // 處理類型
      const userTypeList = caseSearch.find((c) => c.key === 'user')?.children?.map((child) => child.key) || []
      if (searchKeys.some((key) => userTypeList.includes(key))) {
        result = result.filter((item) => {
          if (searchKeys.includes('userTypeA') && item.accessUser === item.processUser) return true
          if (searchKeys.includes('userTypeB') && item.accessUser !== item.processUser) return true
          return false
        })
      }
    }
    return result
  }, [textSearch, searchKeys, dataSource])

  return (
    <ProForm formRef={formRef} submitter={false} layout="vertical">
      {/* 搜尋標籤 */}
      <MliFormRow>
        {caseSearch.map((caseData) => (
          <MliFormCol colSize={4 / caseSearch.length} key={caseData.key}>
            <Card
              title={<span style={{ fontSize: 18 }}>{caseData.title}</span>}
              type="inner"
              style={{ textAlign: 'center' }}
            >
              <Space>
                {caseData.children?.map((children) => {
                  const isSelected = searchKeys.includes(children.key)
                  return (
                    <Button
                      key={children.key}
                      type={isSelected ? 'primary' : 'text'}
                      style={{
                        // 用透明度 辨識 有無選擇
                        backgroundColor: isSelected
                          ? children.colore
                          : children.colore.replace('1)', '0.1)'),
                      }}
                      onClick={() => {
                        // 多選
                        // setSearchKeys((prev) =>
                        //   isSelected ? prev.filter((k) => k !== children.key) : [...prev, children.key]
                        // )
                        // 單選
                        setSearchKeys(isSelected ? [] : [children.key])
                      }}
                    >
                      {children.title} ({children.count})
                    </Button>
                  )
                })}
              </Space>
            </Card>
          </MliFormCol>
        ))}
      </MliFormRow>
      <br />

      {/* 快速搜尋 */}
      <MliFormRow>
        <Input
          key="search"
          placeholder="快速搜尋"
          allowClear
          onChange={(e) => setTextSearch(e.target.value)}
          value={textSearch}
        />
      </MliFormRow>

      {/* 表格資料 */}
      <MliFormRow>
        <ProTable
          rowKey="key"
          actionRef={actionRef}
          columns={columns}
          dataSource={filteredData}
          options={false}
          search={false}
          cardBordered={false}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50', '100'],
            onChange: (page, pageSize) => setPagination({ current: page, pageSize })
          }}
          scroll={{ x: 'max-content', y: 600 }}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys)
          }}
          tableAlertRender={() => (
            <Button color="danger" variant="filled" onClick={handleExport}>
              導出數據(console)
            </Button>
          )}
          tableAlertOptionRender={() => (
            <Button color="cyan" variant="filled" onClick={handleCancel}>
              取消勾選
            </Button>
          )}
        />
      </MliFormRow>
    </ProForm>
  )
}

export default CaseSearchTable
