import React, { useEffect, useState } from 'react'
import { DragSortTable, FooterToolbar, ProForm } from '@ant-design/pro-components'
import type { ProColumns } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import * as poApi from './store/poApi' // API 模組（從後端取得保單資料）
import dayjs from 'dayjs' // 處理日期用的函式庫



const DragSortTableExample: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([]) // 表格資料狀態（主表清單）

  // 🔁 組件載入後，呼叫 API 取得資料
  useEffect(() => {
    poApi.fetchAllData().then((data) => {
      const chgData = data.map((e: any, index: number) => ({
        ...e,
        key: e.policyNo ?? index,                         // 每筆資料需有唯一 key，否則表格無法正常渲染
        poIssueDate: dayjs(e.poIssueDate, 'TTT/MM/DD'),  // 將日期字串轉成 dayjs 物件
      }))
      setDataSource(chgData)                              // 設定表格顯示資料
    })
  }, [])

  const columns: ProColumns<any>[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 60,
    },
    {
      title: '保單號碼',
      dataIndex: 'policyNo',
      valueType: 'text',
    },
    {
      title: '保單狀態',
      dataIndex: 'poStsCode',
      valueType: 'text',
    },
    {
      title: '保單生效日',
      dataIndex: 'poIssueDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD',
      },
    },
  ]

  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type='primary'
            onClick={async () => {
              try {
                console.log('✅ 表單內容：', dataSource)
                message.success('表單提交成功！')
              } catch (err) {
                message.error('請檢查表單錯誤')
              }
            }}
            key='save'
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


  return (
    <ProForm
      layout="vertical"       // 垂直排列 label + input
      submitter={submitterRender()}
    >
      <DragSortTable
        headerTitle="拖拽排序"                 // 表格標題
        columns={columns}                     // 表格欄位
        rowKey="key"                          // 每筆資料的唯一識別欄位
        search={false}                        // 關閉搜尋欄
        pagination={false}                    // 關閉分頁功能
        dataSource={dataSource}               // 資料來源（直接綁定 state）
        dragSortKey="sort"                    // 拖曳排序的對應欄位（自動顯示拖曳把手）
        // ✅ 拖曳排序完成後觸發：更新畫面與提示訊息
        onDragSortEnd={(
          beforeIndex: number,  // 拖曳前的 index
          afterIndex: number,   // 拖曳後的 index
          newDataSource: any,   // 排序後的資料陣列
        ) => {
          console.log('排序后的数据', newDataSource)
          setDataSource(newDataSource) // 更新資料狀態
          message.success('修改列表排序成功') // 顯示提示訊息
        }}
      />
    </ProForm>
  )
}

export default DragSortTableExample
