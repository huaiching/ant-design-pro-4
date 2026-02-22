import React, { useEffect, useRef, useState } from 'react'
import { DragSortTable, FooterToolbar, PageContainer, ProForm } from '@ant-design/pro-components'
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components'
import { Button, message, Modal } from 'antd'
import { fetchAllData } from './Store/poApi'
import { dayjsToRocString, rocStringToDayjs } from '@/utils/Dayjs/rocDateUtils'



const DragSortTableExample: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 數據源
  const [dataSource, setDataSource] = useState<any[]>([]) // 表格資料狀態（主表清單）

  // 查詢 API 設定
  const requestApi = async () => {
    const res = await fetchAllData()
    // 資料格式轉換: 如果有 日期 資料，要轉為 Dayjs 格式，才能正確顯示在 ProTable 的 date 欄位
    const output = res.map((e: any) => ({
      ...e,
      poIssueDate: rocStringToDayjs(e.poIssueDate)
    }))
    formRef.current?.setFieldValue('dragTable', output)
    setDataSource(output)
  }

  // 初始抓取資料
  useEffect(() => {
    requestApi()
  }, []);

  // formRef 資料同步更新
  useEffect(() => {
    formRef.current?.setFieldValue('dragTable', dataSource)
  }, [dataSource]);

  // 表格欄位定義
  const columns: ProColumns<any>[] = [
    {
      title: '排序',
      dataIndex: 'sort',
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

  // 控制送出後之動作
  const submitterRender = () => {
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        // 取得資料
        const data = formRef.current?.getFieldValue('dragTable')
        // 日期轉換為民國年
        const newData = data.map((e: any) => ({
          ...e,
          poIssueDate: dayjsToRocString(e.poIssueDate)
        }))
        console.info('表單內容：', newData)
        message.success('表單提交成功！')
      },
      onCancel() {
        // 取消按鈕 點擊後 要進行的 API 操作
        message.warning('取消作業')
      }
    })
  }

  // 排序後事件
  const onDragSortEnd = (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    console.info('排序后的数据', newDataSource)
    setDataSource(newDataSource) // 更新資料狀態
    message.success('修改列表排序成功') // 顯示提示訊息
  }

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm
        formRef={formRef}
        layout="vertical"
        submitter={false}
      >
        <DragSortTable
          headerTitle="拖拽排序"
          rowKey="key"
          columns={columns}
          cardProps={false} // 移除外層 Card
          size='small'
          // 數據源
          dataSource={dataSource}
          // 搜尋欄
          search={false}
          // 分頁
          pagination={false}
          // 排序欄位
          dragSortKey="sort"
          // 拖曳後事件
          onDragSortEnd={onDragSortEnd}
        />

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer >
  )
}

export default DragSortTableExample
