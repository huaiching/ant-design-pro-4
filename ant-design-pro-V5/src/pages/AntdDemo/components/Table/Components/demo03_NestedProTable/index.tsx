/**
 * 非搜尋的 ProTable
 * 數據資料 透過 api 取得後，直接放到 dataSource 中
 */

import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components'
import { ProForm, ProTable } from '@ant-design/pro-components'
import { Button, Input, message, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as poApi from './store/poApi'
import { PoData, coData } from './store/poApi'
import './store/index.less'

// 主表格欄位（保單）
const policyColumns: ProColumns<PoData>[] = [
  {
    title: '保單號碼',
    dataIndex: 'policyNo',
    valueType: 'text',
    width: '15%'
  },
  {
    title: '保單狀態',
    dataIndex: 'poStsCode',
    valueType: 'text',
    width: '15%'
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

// 子表格欄位（保障清單）
const coverageColumns: ProColumns<coData>[] = [
  { title: '保障序號', dataIndex: 'coverageNo', valueType: 'text' },
  { title: '險種代碼', dataIndex: 'planCode', valueType: 'text' },
  { title: '險種版數', dataIndex: 'rateScale', valueType: 'text' },
  { title: '保障狀態', dataIndex: 'coStsCode', valueType: 'text' },
  {
    title: '保障生效日',
    dataIndex: 'coIssueDate',
    valueType: 'date',
    fieldProps: {
      format: 'TTT/MM/DD'
    }
  }
]

const NestedProTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>() // 表單參照，讀取/寫入資料
  const actionRef = useRef<ActionType>() // 表格操作引用（如 reload）
  const [dataSource, setDataSource] = useState<PoData[]>([]) // 主表資料
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]) // 勾選中的保單 key
  const [searchText, setSearchText] = useState('') // 快速搜尋輸入文字狀態
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]) // 控制展開列

  // ✅ 頁面初始化：取得資料並設定到 form 與畫面
  useEffect(() => {
    poApi.fetchAllData().then((data: any[]) => {
      // 日期格式轉換
      const chgData = data.map((po: any) => ({
        ...po,
        poIssueDate: dayjs(po.poIssueDate, 'TTT/MM/DD'),
        coList: po.coList.map((co: any) => ({
          ...co,
          coIssueDate: dayjs(co.coIssueDate, 'TTT/MM/DD')
        }))
      }))
      // 給 table 顯示
      setDataSource(chgData)
      // 存入 form 中
      formRef.current?.setFieldsValue({ policies: chgData })
      // 預設展開全部資料
      setExpandedRowKeys(chgData.map((item) => item.key))
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
        item.poIssueDate?.toString().toLowerCase().includes(lowerSearch) ||
        item.coList?.some(co => co.planCode?.toLowerCase().includes(lowerSearch))
    )
  }, [searchText, dataSource])

  // ✅ 導出按鈕事件：從 formRef 中取得 policies，再過濾出勾選的
  const handleExport = () => {
    const allData: PoData[] = formRef.current?.getFieldValue('policies') || []
    const selectedData = allData.filter((item) => selectedRowKeys.includes(item.key))
    const exportData = selectedData.map(row => {
      const poIssueDate = dayjs(row.poIssueDate).format('TTT/MM/DD')
      const coList = row.coList?.map(co => ({
        ...co,
        coIssueDate: dayjs(co.coIssueDate).format('TTT/MM/DD'),
      }));
      return {
        ...row,
        poIssueDate,
        coList
      }
    });
    console.info('✅ 勾選導出資料：', exportData)
    message.success(`已導出 ${exportData.length} 筆資料到 console`)
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
        search={false} // 關閉搜尋欄
        pagination={false} // 關閉分頁
        // rowClassName={'ant-table-row-selected'}  // 設定表格底色: 預設顏色
        rowClassName={() => 'custom-selected-row'}  // 設定表格底色: 透過 CSS 設定

        rowSelection={{
          // ✅ 開啟勾選功能
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys)
        }}
        expandable={{
          // ✅ 展開子表格
          expandedRowRender: (record) => (
            // ✅ 子表格：使用 ProTable 顯示該保單的保障資料
            <ProTable
              rowKey="key" // 每筆保障資料的唯一 key
              columns={coverageColumns} // 子表格欄位（保障序號、險種代碼等）
              dataSource={record.coList} // 子表格的資料來源為該筆保單的 coList
              pagination={false} // 子表格不使用分頁，直接列出所有保障
              search={false} // 子表格關閉搜尋欄
              options={false} // 子表格關閉右上角設定選項
            />
          ),
          expandedRowKeys, // 用狀態控制展開
          onExpandedRowsChange: (keys: any) => setExpandedRowKeys(keys) // 更新展開狀態
        }}
        headerTitle="保單清單"
        /** ✅ 使用 tableAlertRender 顯示勾選資料與導出按鈕 */
        tableAlertRender={() => (
          <Button type="link" onClick={handleExport}>
            導出數據(console)
          </Button>
        )}
        toolBarRender={() => [
          <Input
            key="search"
            placeholder="快速搜尋"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        ]}
      />
      <Typography.Text type='danger'>
        1. Date: 日期格式 fieldProps.format 設定為 'TTT/MM/DD' (民國年)。 <br />
        2. 前端日期資料 (string) 要轉換為 dayjs 物件時，請使用 dayjs(XXX, 'TTT/MM/DD') 進行格式轉換。 <br />
        3. 導出數據時，要使用 dayjs(XXX).format('TTT/MM/DD') 來將 日期 轉換為 string。
      </Typography.Text>
    </ProForm>
  )
}

export default NestedProTable
