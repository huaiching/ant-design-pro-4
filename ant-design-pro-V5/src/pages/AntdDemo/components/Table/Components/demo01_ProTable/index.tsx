/**
 * 非搜尋的 ProTable
 * 數據資料 透過 api 取得後，直接放到 dataSource 中
 */

import type { ActionType, ProFormInstance } from '@ant-design/pro-components'
import { ProForm, ProTable } from '@ant-design/pro-components'
import { Button, Input, message } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as poApi from './store/poApi'

// 主表格欄位（保單）
const policyColumns: any[] = [
  { title: '保單號碼', dataIndex: 'policyNo', valueType: 'text' },
  { title: '保單狀態', dataIndex: 'poStsCode', valueType: 'text' },
  {
    title: '保單生效日',
    dataIndex: 'poIssueDate',
    valueType: 'date',
    fieldProps: {
      format: 'TTT/MM/DD'
    }
  }
]

const NestedProTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>() // 表單參照，讀取/寫入資料
  const actionRef = useRef<ActionType>() // 表格操作引用（如 reload）
  const [dataSource, setDataSource] = useState<any[]>([]) // 主表資料
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]) // 勾選中的保單 key
  const [searchText, setSearchText] = useState('') // 快速搜尋輸入文字狀態

  // ✅ 頁面初始化：取得資料並設定到 form 與畫面
  useEffect(() => {
    poApi.fetchAllData().then((data) => {
      // 日期格式轉換
      const chgData = data.map((e) => ({
        ...e,
        poIssueDate: dayjs(e.poIssueDate, 'TTT/MM/DD')
      }))
      // 給 table 顯示
      setDataSource(chgData)
      // 存入 form 中
      formRef.current?.setFieldsValue({ policies: chgData })
    })
  }, [])

  // 利用 useMemo 篩選 dataSource ，依 searchText 過濾資料，避免每次渲染都重複計算
  const filteredData = useMemo(() => {
    if (!searchText) return dataSource
    // 將 搜尋文字 轉為 小寫
    const lowerSearch = searchText.toLowerCase()
    // 過濾資料，將原始資料 轉為小寫 後 進行比較
    return dataSource.filter(
      (item) =>
        item.policyNo?.toLowerCase().includes(lowerSearch) ||
        item.poStsCode?.toLowerCase().includes(lowerSearch) ||
        item.poIssueDate?.toString().toLowerCase().includes(lowerSearch)
    )
  }, [searchText, dataSource])

  // ✅ 導出按鈕事件：從 formRef 中取得 policies，再過濾出勾選的
  const handleExport = () => {
    const allData: any[] = formRef.current?.getFieldValue('policies') || []
    const selectedData = allData.filter((item) => selectedRowKeys.includes(item.key))
    console.info('✅ 勾選導出資料：', selectedData)
    message.success(`已導出 ${selectedData.length} 筆資料到 console`)
  }

  return (
    <ProForm
      formRef={formRef} // 表單參考對象（可透過 get/set 取值）
      submitter={false} // 不顯示提交按鈕
      layout="vertical" // 垂直排列表單項目
    >
      <ProTable
        rowKey="key" // 每筆唯一 key
        actionRef={actionRef} // 表格操作參考
        columns={policyColumns} // 表格欄位
        dataSource={filteredData} // 傳入篩選後的資料，實現快速搜尋功能
        options={false} // 關閉選單
        search={false} // 關閉搜尋欄
        pagination={false} // 關閉分頁
        rowSelection={{
          // ✅ 開啟勾選功能
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys)
        }}
        toolBarRender={() => [
          <Input
            key="search"
            placeholder="快速搜尋"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        ]}
        headerTitle="保單清單"
        /** ✅ 使用 tableAlertRender 顯示勾選資料與導出按鈕 */
        tableAlertRender={() => (
          <Button type="link" onClick={handleExport}>
            導出數據(console)
          </Button>
        )}
      />
    </ProForm>
  )
}

export default NestedProTable
