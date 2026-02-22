/**
 * 非搜尋的 ProTable
 * 數據資料 透過 api 取得後，直接放到 dataSource 中
 */

import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components'
import { PageContainer, ProForm, ProTable } from '@ant-design/pro-components'
import { Button, Input, List, message } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { fetchAllData } from './store/poApi'
import './store/index.less'
import { dayjsToRocString, rocStringToDayjs } from '@/utils/Dayjs/rocDateUtils'


const NestedProTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()

  // ProTable 的 分頁控制
  const pageSizeOptions = ['5', '10', '20', '50', '100']
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10 // 初始每頁數量
  })

  // 數據源
  const [dataSource, setDataSource] = useState<any[]>([])
  // 控制展開列
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([])

  // 查詢 API 設定
  const requestApi = async () => {
    // 資料抓取
    const res = await fetchAllData()
    // 資料格式轉換: 如果有 日期 資料，要轉為 Dayjs 格式，才能正確顯示在 ProTable 的 date 欄位
    const output = res.map((po: any) => ({
      ...po,
      poIssueDate: rocStringToDayjs(po.poIssueDate),
      coList: po?.coList.map((co: any) => ({
        ...co,
        coIssueDate: rocStringToDayjs(co?.coIssueDate)
      }))
    }))
    console.log('output', output);

    setDataSource(output)
    setPagination(prev => ({ ...prev, current: 1 }))
    // 預設展開全部資料
    setExpandedRowKeys(output.map((item) => item.key))
    return { data: output, success: true, total: output.length }
  }

  // 頁面初始化就要抓取資料
  useEffect(() => {
    requestApi()
  }, [])

  /** 勾選設定 **/
  // 記錄勾選的key
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  // 勾選導出事件
  const handleExport = () => {
    const data = dataSource.filter((item) => selectedRowKeys.includes(item.key))
    // 導出時，將日期轉回字串格式
    const outputData = data.map((po: any) => ({
      ...po,
      poIssueDate: dayjsToRocString(po.poIssueDate),
      coList: po.coList.map((co: any) => ({
        ...co,
        coIssueDate: dayjsToRocString(co.coIssueDate)
      }))
    }))
    console.info('勾選導出資料：', outputData)
    message.success(`已導出 ${outputData.length} 筆資料到 console`)
    setSelectedRowKeys([]) // 清空勾選
  }
  // 取消勾選事件
  const handleCancel = () => {
    setSelectedRowKeys([]) // 清空勾選
    message.info('已清空勾選項目')
  }

  /** 快速搜尋 **/
  // 快速搜尋輸入文字狀態
  const [searchText, setSearchText] = useState('')
  // 快速搜尋的資料篩選器: 當 數據變動 或 搜尋框有輸入資料 時啟動，進行 顯示資料 的異動
  const filteredData = useMemo(() => {
    if (!searchText) return dataSource
    // 將 搜尋文字 轉為 小寫
    const lowerSearch = searchText.toLowerCase()
    // 過濾資料，將原始資料 轉為小寫 後 進行比較
    return dataSource.filter(
      (item) =>
        item.policyNo?.toLowerCase().includes(lowerSearch) ||
        item.poStsCode?.toLowerCase().includes(lowerSearch) ||
        dayjsToRocString(item.poIssueDate)?.toLowerCase().includes(lowerSearch) ||
        item.coList?.some((co: any) => co.planCode?.toLowerCase().includes(lowerSearch))
    )
  }, [searchText, dataSource])

  /** 表格欄位定義 **/
  // 主表格
  const columns: ProColumns<any>[] = [
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

  // 子表格
  const subColumns: ProColumns<any>[] = [
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

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm
        submitter={false} // 不顯示提交按鈕
        layout="vertical" // 垂直排列表單項目
      >
        <Input
          key="search"
          placeholder="快速搜尋"
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <ProTable
          rowKey="key" // 每筆唯一 key
          columns={columns}
          formRef={formRef}
          actionRef={actionRef}
          cardProps={false} // 移除外層 Card
          size='small'
          // 數據源
          dataSource={filteredData}
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
          // rowClassName={'ant-table-row-selected'}  // 設定表格底色: 預設顏色
          rowClassName={() => 'custom-selected-row'}  // 設定表格底色: 透過 CSS 設定
          // 勾選設定
          rowSelection={{
            type: 'checkbox', // checkbox 選擇框(預設) / radio 單選框
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
            selections: true
          }}
          // 子表格
          expandable={{
            expandedRowKeys, // 用狀態控制展開
            onExpandedRowsChange: (keys: any) => setExpandedRowKeys(keys), // 更新展開狀態
            expandedRowRender: (record) => (
              <ProTable
                rowKey="key"
                columns={subColumns}
                // 子表格 數據源
                dataSource={record.coList}
                // 子表格 分頁
                pagination={false}
                // 子表格 搜尋欄
                search={false}
                // 子表格 表格操作選項
                options={false}
              />
            ),
          }}
          /** 使用 tableAlertRender 顯示勾選資料與導出按鈕 */
          tableAlertRender={() => (
            <Button color="danger" variant="filled" onClick={handleExport}>
              導出數據(console)
            </Button>
          )}
          /** 使用 tableAlertOptionRender 顯示取消勾選資料 */
          tableAlertOptionRender={() => (
            <Button color="cyan" variant="filled" onClick={handleCancel}>
              取消勾選
            </Button>
          )}
        />
        <List
          size='small'
          dataSource={[
            '1. Date: 日期格式 fieldProps.format 設定為 \'TTT/MM/DD\' (民國年)。',
            "2. 前端資料 日期為 字串(string) 時，需轉換為 Dayjs 格式才可使用，請使用：",
            "　dayjs(stringDate, 'TTT/MM/DD').isValid() ? dayjs(stringDate, 'TTT/MM/DD') : null",
            "　dayjs(stringDate, 'TTT/MM').isValid() ? dayjs(stringDate, 'TTT/MM') : null",
            "　或是 小工具 中的 rocStringToDayjs(stringDate) 與 rocStringToDayjsMonth(stringDate)",
            '3. 導出數據時，要使用 dayjs(XXX).format(\'TTT/MM/DD\') 來將 日期 轉換為 string',
          ]}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </ProForm>
    </PageContainer >
  )
}

export default NestedProTable
