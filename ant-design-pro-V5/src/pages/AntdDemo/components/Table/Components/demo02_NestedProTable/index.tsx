/**
 * 非搜尋的 ProTable
 * 數據資料 透過 api 取得後，直接放到 dataSource 中
 */

import React, { useEffect, useRef, useState } from 'react'
import { ProForm, ProTable } from '@ant-design/pro-components'
import type { ProColumns, ActionType, ProFormInstance } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import * as poApi from './store/poApi'
import { PoData, coData } from './store/poApi'

// 主表格欄位（保單）
const policyColumns: ProColumns<PoData>[] = [
  { title: '保單號碼', dataIndex: 'policyNo', valueType: 'text', },
  { title: '保單狀態', dataIndex: 'poStsCode', valueType: 'text', },
  { title: '保單生效日', dataIndex: 'poIssueDate', valueType: 'date', },
]

// 子表格欄位（保障清單）
const coverageColumns: ProColumns<coData>[] = [
  { title: '保障序號', dataIndex: 'coverageNo', valueType: 'text', },
  { title: '險種代碼', dataIndex: 'planCode', valueType: 'text', },
  { title: '險種版數', dataIndex: 'rateScale', valueType: 'text', },
  { title: '保障狀態', dataIndex: 'coStsCode', valueType: 'text', },
  { title: '保障生效日', dataIndex: 'coIssueDate', valueType: 'date', },
]

const Demo12_NestedProTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>()    // 表單參照，讀取/寫入資料
  const actionRef = useRef<ActionType>()       // 表格操作引用（如 reload）
  const [dataSource, setDataSource] = useState<PoData[]>([])  // 主表資料
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]) // 勾選中的保單 key

  // ✅ 頁面初始化：取得資料並設定到 form 與畫面
  useEffect(() => {
    poApi.fetchAllData().then((data) => {
      setDataSource(data)                                 // 給 table 顯示
      formRef.current?.setFieldsValue({ policies: data }) // 存入 form 中
    })
  }, [])

  // ✅ 導出按鈕事件：從 formRef 中取得 policies，再過濾出勾選的
  const handleExport = () => {
    const allData: PoData[] = formRef.current?.getFieldValue('policies') || []
    const selectedData = allData.filter((item) => selectedRowKeys.includes(item.key))
    console.log('✅ 勾選導出資料：', selectedData)
    message.success(`已導出 ${selectedData.length} 筆資料到 console`)
  }

  return (
    <ProForm
      formRef={formRef}       // 表單參考對象（可透過 get/set 取值）
      submitter={false}       // 不顯示提交按鈕
      layout="vertical"       // 垂直排列表單項目
    >
      <ProTable<PoData>
        rowKey="key"                 // 每筆唯一 key
        actionRef={actionRef}        // 表格操作參考
        columns={policyColumns}      // 表格欄位
        dataSource={dataSource}      // 表格資料
        search={false}               // 關閉搜尋欄
        pagination={false}           // 關閉分頁
        rowSelection={{              // ✅ 開啟勾選功能
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        expandable={{                // ✅ 展開子表格
          expandedRowRender: (record) => (
            // ✅ 子表格：使用 ProTable 顯示該保單的保障資料
            <ProTable<coData>
              rowKey="key"                    // 每筆保障資料的唯一 key
              columns={coverageColumns}       // 子表格欄位（保障序號、險種代碼等）
              dataSource={record.coList}      // 子表格的資料來源為該筆保單的 coList
              pagination={false}              // 子表格不使用分頁，直接列出所有保障
              search={false}                  // 子表格關閉搜尋欄
              options={false}                 // 子表格關閉右上角設定選項
            />
          ),
        }}
        headerTitle="保單清單"
        /** ✅ 使用 tableAlertRender 顯示勾選資料與導出按鈕 */
        tableAlertRender={() => (
          <Button
            type="link"
            onClick={handleExport}
          >
            導出數據(console）
          </Button>
        )}
        toolBarRender={() => [
          <Button
            key="export"
            onClick={handleExport}
            disabled={selectedRowKeys.length === 0} // 沒選資料就停用按鈕
          >
            導出數據（console）
          </Button>,
        ]}
      />
    </ProForm>
  )
}

export default Demo12_NestedProTable
