/**
 * 非搜尋的 ProTable
 * 數據資料 透過 api 取得後，直接放到 dataSource 中
 */

import type { ProColumns } from '@ant-design/pro-components'
import { PageContainer, ProForm, ProTable } from '@ant-design/pro-components'
import { Button, Input, List, message } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'
import { fetchAllData } from './store/poApi'
import { dayjsToRocString, rocStringToDayjs } from '@/utils/Dayjs/rocDateUtils'


const NestedProTable: React.FC = () => {
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
    console.info('勾選導出資料：', data)
    message.success(`已導出 ${data.length} 筆資料到 console`)
  }
  // 取消勾選事件
  const handleCancel = () => {
    setSelectedRowKeys([]) // 清空勾選
    message.info('已清空勾選項目')
  }

  /** 快速搜尋 **/
  // 快速搜尋輸入文字狀態
  const [searchText, setSearchText] = useState('')
  // 快速搜尋的資料分析
  const filteredData = useMemo(() => {
    if (!searchText) return dataSource
    // 將 搜尋文字 轉為 小寫
    const lowerSearch = searchText.toLowerCase()
    // 過濾資料，將原始資料 轉為小寫 後 進行比較
    return dataSource.filter(
      (item) =>
        item.policyNo?.toLowerCase().includes(lowerSearch) ||
        item.poStsCode?.toLowerCase().includes(lowerSearch) ||
        dayjsToRocString(item.poIssueDate)?.toLowerCase().includes(lowerSearch)
    )
  }, [searchText, dataSource])

  // 表格欄位定義
  const columns: ProColumns<any>[] = [
    {
      title: '保單號碼',
      dataIndex: 'policyNo',
      valueType: 'text',
      sorter: (a: any, b: any) => a.policyNo.localeCompare(b.policyNo),
    },
    {
      title: '保單狀態',
      dataIndex: 'poStsCode',
      valueType: 'text',
      filters: [
        {
          text: '有效',
          value: '有效'
        },
        {
          text: '無效',
          value: '失效'
        }
      ],
      onFilter: (value: any, record: any) => record.poStsCode.includes(value)
    },
    {
      title: '保單生效日',
      dataIndex: 'poIssueDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD'
      },
      sorter: (a: any, b: any) => dayjs(a.poIssueDate).unix() - dayjs(b.poIssueDate).unix()
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
          // headerTitle="保單清單"
          rowKey="key" // 每筆唯一 key
          columns={columns} // 表格欄位
          dataSource={filteredData} // 數據源
          size='small'
          // 表格配置
          options={false}
          // options={{
          //   density: true, // 列表密度
          //   fullScreen: true, // 全螢幕
          //   reload: requestApi, // 重新載入
          //   setting: true // 設定
          // }}
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
          // 捲動設定
          scroll={{
            x: 'max-content',
            y: 600
          }}
          // 勾選設定
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys)
          }}
          // toolBarRender={() => [
          //   <Input
          //     key="search"
          //     placeholder="快速搜尋"
          //     allowClear
          //     onChange={(e) => setSearchText(e.target.value)}
          //     value={searchText}
          //   />
          // ]}
          /** 使用 tableAlertRender 顯示勾選資料與導出按鈕 */
          tableAlertRender={() => (
            <Button color="danger" variant="filled" onClick={handleExport}>
              導出數據
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
          size="small"
          dataSource={[
            "1. Date: 日期格式 fieldProps.format 設定為 'TTT/MM/DD' (民國年)。",
            "2. 前端資料 日期為 字串(string) 時，需轉換為 Dayjs 格式才可使用，請使用：",
            "　dayjs(stringDate, 'TTT/MM/DD').isValid() ? dayjs(stringDate, 'TTT/MM/DD') : null",
            "　dayjs(stringDate, 'TTT/MM').isValid() ? dayjs(stringDate, 'TTT/MM') : null",
            "　或是 小工具 中的 rocStringToDayjs(stringDate) 與 rocStringToDayjsMonth(stringDate)",
            "3. 導出數據時，要使用 dayjs(XXX).format('TTT/MM/DD') 來將 日期 轉換為 string",
            "　或是 小工具 中的 dayjsToRocString(dayjsDate) 與 dayjsToRocStringMonth(dayjsDate)"
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </ProForm>
    </PageContainer >
  )
}

export default NestedProTable
