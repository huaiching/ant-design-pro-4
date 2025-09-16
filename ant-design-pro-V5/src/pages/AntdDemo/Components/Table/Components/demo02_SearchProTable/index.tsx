/**
 * 查詢型 ProTable
 * 1. formRef 保存搜尋框的欄位變數
 * 2. actionRef 控制表格操作，如 reload、reset 等
 * 3. request 呼叫 API 取得數據，搭配 manualRequest={true} 關閉自動請求
 *    request 回傳欄位：
 *      - data   : 數據列表
 *      - success: 是否成功
 *      - total  : 數據總筆數
 * 4. rowSelection 可選擇行，tableAlertRender 顯示勾選資料與導出
 * 5. tableAlertOptionRender 顯示「取消勾選」按鈕
 * 6. 日期格式統一使用 'TTT/MM/DD' (民國年)，前端 string 轉 dayjs，導出轉回 string
 */

import { parseRocDate } from '@/utils/rocDateUtils'
import { ProFormInstance } from '@ant-design/pro-form'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Button, List, message } from 'antd'
import dayjs from 'dayjs'
import React, { useRef, useState } from 'react'
import * as userApi from './store/userApi'

const ProTableDemo: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]) // 勾選資料 key
  const [dataSource, setDataSource] = useState<any[]>([]) // 主表資料
  // ProTable 的 分頁控制
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5
  })

  // 性別選項
  const genderInd = [
    { label: '男', value: '1' },
    { label: '女', value: '2' }
  ]

  // 表格欄位定義
  const columns: ProColumns<any>[] = [
    { title: 'ID', dataIndex: 'id', valueType: 'digit', search: false, hideInTable: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, entity) => [
        <a
          key="detail"
          onClick={() => {
            console.info('點擊明細 - entity:', entity)
          }}
        >
          明細
        </a>
      ]
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [{ required: true, message: '請輸入姓名！' }]
      }
    },
    { title: '年齡', dataIndex: 'age', valueType: 'digit', sorter: true, copyable: true },
    { title: '地址', dataIndex: 'address', valueType: 'text', search: false, sorter: true },
    {
      title: '性別',
      dataIndex: 'sex',
      valueType: 'select',
      fieldProps: { placeholder: '請選擇性別', options: genderInd }
    },
    {
      title: '生日',
      dataIndex: 'birthDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD',
        onBlur: (e: any) => {
          if (e.target?.value) {
            formRef.current?.setFieldValue('birthDate', parseRocDate(e.target.value))
          }
        }
      }
    }
  ]

  // 導出按鈕事件：從 formRef 中取得 userTable，再過濾出勾選的
  const handleExport = () => {
    const selectedData = dataSource.filter((item) => selectedRowKeys.includes(item.id))
    console.info('勾選導出資料：', selectedData)
    message.success(`已導出 ${selectedData.length} 筆資料到 console`)
    setSelectedRowKeys([]) // 清空勾選
  }

  // 取消按鈕事件
  const handleCancel = () => {
    setSelectedRowKeys([]) // 清空勾選
    message.info('已清空勾選項目')
  }

  return (
    <>
      <ProTable
        rowKey="id"
        name="userTable"
        headerTitle="模擬 API 表格"
        columns={columns}
        formRef={formRef}
        actionRef={actionRef}
        // 請求數據
        request={async (params) => {
          const res = await userApi.fetchAllData(params)
          const chgData = res.data.map((e) => ({
            ...e,
            birthDate: dayjs(e.birthDate, 'TTT/MM/DD')
          }))
          setDataSource(chgData)
          return { data: chgData, success: true, total: chgData.length }
        }}
        cardProps={false} // 移除外層 Card
        // 手動請求
        manualRequest={true}
        // 搜尋表單佈局
        search={{ labelWidth: 'auto' }}
        // 查詢 不要忽略欄位驗證規則 (預設忽略)
        // form={{ ignoreRules: false }}
        // 工具欄
        toolBarRender={() => [<Button type="primary">工具欄</Button>]}
        // 表格配置
        options={{
          density: true, // 列表密度
          fullScreen: true, // 全螢幕
          reload: true, // 重新載入
          setting: true // 設定
        }}
        // 分頁
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
        // 選擇行
        rowSelection={{
          type: 'checkbox', // checkbox 選擇框(預設) / radio 單選框
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
          selections: true
        }}
        /** ✅ 使用 tableAlertRender 顯示勾選資料與導出按鈕 */
        tableAlertRender={() => (
          <Button color="danger" variant="filled" onClick={handleExport}>
            導出數據(console)
          </Button>
        )}
        /** ✅ 使用 tableAlertOptionRender 顯示取消勾選資料 */
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
          "2. 前端日期資料 (string) 要轉換為 dayjs 物件時，請使用 dayjs(XXX, 'TTT/MM/DD') 進行格式轉換。",
          "3. 導出數據時，要使用 dayjs(XXX).format('TTT/MM/DD') 來將日期轉回字串。"
        ]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  )
}

export default ProTableDemo
