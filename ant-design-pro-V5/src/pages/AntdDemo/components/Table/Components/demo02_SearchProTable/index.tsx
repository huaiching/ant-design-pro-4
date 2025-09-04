/**
 * 查詢 ProTable
 * 1. formRef 保存 搜尋框的變數
 * 2. request 呼叫 api 取得 數據，搭配 manualRequest={true} 來 關閉自動請求數據
 *    return 的欄位
 *    1. data   : 數據實體
 *    2. success: 是否成功
 *    3. total  : 數據筆數
 */

import { ProFormInstance } from '@ant-design/pro-form'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { List, Space } from 'antd'
import dayjs from 'dayjs'
import React, { useRef } from 'react'
import * as userApi from './store/userApi'
import { parseRocDate } from '@/utils/rocDateUtils'

const ProTableDemo: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()

  const genderInd = [
    { label: '男', value: '1' },
    { label: '女', value: '2' }
  ]

  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'digit',
      search: false,
      hideInTable: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (dom, entity) => [
        <a
          key="a"
          onClick={() => {
            console.info('dom', dom)
            console.info('entity', entity)
          }}
        >
          明細
        </a>
      ]
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text'
      // formItemProps: {
      //   rules: [
      //     { required: true, message: '請輸入名稱！' }
      //   ],
      // },
    },
    {
      title: '年齡',
      dataIndex: 'age',
      valueType: 'digit',
      sorter: '1',
      copyable: true
    },
    {
      title: '地址',
      dataIndex: 'address',
      valueType: 'text',
      search: false,
      sorter: '2'
    },
    {
      title: '性別',
      dataIndex: 'sex',
      valueType: 'select',
      fieldProps: {
        placeholder: '請選擇性別',
        options: genderInd
      }
    },
    {
      title: '生日',
      dataIndex: 'birthDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD',
        onBlur: (e: any) => {
          // 日期格式化
          const date = parseRocDate(e.target?.value)
          // 更新資料
          formRef.current?.setFieldValue('birthDate', date)
        }
      }
    }
  ]

  return (
    <>
      <ProTable
        name="testTable"
        columns={columns}
        formRef={formRef} // 查詢框 的 欄位變數
        actionRef={actionRef} // 表格控制的變數實體
        request={async (params) => {
          const res = await userApi.fetchAllData(params)
          // 日期格式轉換
          const chgData = res.data.map((e) => ({
            ...e,
            birthDate: dayjs(e.birthDate, 'TTT/MM/DD')
          }))
          return {
            data: chgData,
            success: true,
            total: chgData.length
          }
        }} // 數據請求函式
        manualRequest={true} // 手動請求數據
        rowKey="id" // 設定 資料唯一值 欄位
        search={{
          labelWidth: 'auto'
        }}
        form={{
          ignoreRules: false
        }}
        headerTitle="模擬 API 表格"
        toolBarRender={() => [<div key="d">toolBarRender</div>]}
        options={{
          density: true, // 密度
          fullScreen: true, // 全螢幕
          reload: true, // 刷新
          setting: true, // 列設置
          search: true // 搜尋欄
        }}
        pagination={{
          showQuickJumper: true
        }}
        rowSelection={{
          selections: true,
          type: 'checkbox'
        }}
        tableAlertRender={({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          selectedRowKeys, // 選取行的key
          selectedRows // 選取行的資料
        }) => {
          // 生日 轉換為 string
          const exportData = selectedRows.map((row) => ({
            ...row,
            birthDate: dayjs(row.birthDate).format('TTT/MM/DD') // 將日期轉為 string
          }))

          return (
            <Space size={16}>
              <a
                onClick={() => {
                  console.info(exportData) // 這裡的 birthDate 已是字串
                }}
              >
                導出數據
              </a>
            </Space>
          )
        }}
      />
      <List
        size="small"
        dataSource={[
          "1. Date: 日期格式 fieldProps.format 設定為 'TTT/MM/DD' (民國年)。",
          "2. 前端日期資料 (string) 要轉換為 dayjs 物件時，請使用 dayjs(XXX, 'TTT/MM/DD') 進行格式轉換。",
          "3. 導出數據時，要使用 dayjs(XXX).format('TTT/MM/DD') 來將 日期 轉換為 string"
        ]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  )
}
export default ProTableDemo
