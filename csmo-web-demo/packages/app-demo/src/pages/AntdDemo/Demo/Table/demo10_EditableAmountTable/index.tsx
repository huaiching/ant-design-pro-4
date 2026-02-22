// 檔名建議：EditableAmountTable.tsx

import { DeleteOutlined } from '@ant-design/icons'
import { FooterToolbar, PageContainer } from '@ant-design/pro-components'
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { Button, message, Modal, Popconfirm, Select, Spin, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { fetchAllData } from './Store/dataApi'
import { currencyProps, round } from '@/utils/FieldUtil/DigitUtil'

const EditableAmountTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [loading, setLoading] = useState<boolean>(false)

  // 可編輯的明細資料序號
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])

  // 查詢 API 設定
  const requestApi = async () => {
    const res = await fetchAllData()
    formRef.current?.setFieldValue('editTable', res)
    // 設定目前資料列的 id 為可編輯
    const ids = res.map((item) => item.id)
    setEditableKeys(ids)
  }

  // 頁面初始化就要抓取資料
  useEffect(() => {
    setLoading(true)
    requestApi()
    setLoading(false)
  }, [])

  // 幣別
  const [currency, setCurrency] = useState<string>('TWD')
  formRef.current?.setFieldValue('currency', currency)
  // 合計金額
  const [totalAmount, setTotalAmount] = useState<number>(0)
  formRef.current?.setFieldValue('totalAmount', totalAmount)

  // 下拉選單定義
  // 幣別
  const currencyOptions = [
    { label: '新台幣', value: 'TWD' },
    { label: '美元', value: 'USD' },
    { label: '日圓', value: 'JPY' },
    { label: '歐元', value: 'EUR' }
  ]

  // 品項
  const itemOptions = [
    { label: '001 紅茶', value: '001' },
    { label: '002 奶茶', value: '002' },
    { label: '003 咖啡', value: '003' }
  ]

  // 表格欄位定義
  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: false,
      hideInTable: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60
    },
    {
      title: '品項',
      dataIndex: 'item',
      valueType: 'select',
      fieldProps: { options: itemOptions },
      formItemProps: {
        rules: [
          { required: true, message: '請選擇品項！' }
        ]
      }
    },
    {
      title: '金額',
      dataIndex: 'amount',
      valueType: 'digit',
      fieldProps: {
        ...currencyProps(currency),
        style: { width: 200 },
        addonAfter: '元',
      },
      formItemProps: {
        rules: [
          { required: true, message: '請輸入金額！' }
        ]
      }
    }
  ]

  // 控制送出後之動作
  const submitterRender = () => {
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        formRef.current?.validateFields().then(() => {
          // 取得資料
          const data = formRef.current?.getFieldValue('editTable')
          console.info('editableData', data)
          const currency = formRef.current?.getFieldValue('currency')
          console.info('currency', currency)
          const totalAmount = formRef.current?.getFieldValue('totalAmount')
          console.info('totalAmount', totalAmount)
          message.success('表單提交成功！')
        })
      },
      onCancel() {
        // 取消按鈕 點擊後 要進行的 API 操作
        message.warning('取消作業')
      }
    })
  }

  // 編輯表格的操作區設定
  const actionRender = (row: any) => [
    <Popconfirm
      key="delete"
      title="確定刪除嗎？"
      onConfirm={() => {
        // 取得現有資料
        const currentData = formRef.current?.getFieldValue('editTable') || []
        // 過濾刪除該列
        const newData = currentData.filter((item: any) => item.id !== row.id)
        // 更新表單欄位資料
        formRef.current?.setFieldValue('editTable', newData)
        // 同步更新 editableKeys
        setEditableKeys(newData.map((item: any) => item.id))
      }}
    >
      <DeleteOutlined style={{ color: 'red' }} />
    </Popconfirm>
  ]

  // 工具欄
  const toolBarRender = () => [
    <Select
      key="currency"
      showSearch
      placeholder="幣別"
      options={currencyOptions}
      onChange={(value) => setCurrency(value)}
      value={currency}
      style={{ width: 120 }}
    />
  ]

  // 合計欄
  const summary = () => {
    // 取得現有資料
    const dataList = formRef.current?.getFieldValue('editTable') || [];
    // 計算金額總和
    let total = 0;
    dataList.forEach((data: any) => total += data.amount || 0);
    // 根據幣別設定小數位數
    const precision = currency === 'TWD' ? 0 : 2;
    // 四捨五入
    total = currency === 'TWD' ? round(total, 0) : round(total, 2);
    setTotalAmount(total);

    return (
      <Table.Summary.Row>
        <Table.Summary.Cell index={0}></Table.Summary.Cell>
        <Table.Summary.Cell index={1}></Table.Summary.Cell>
        <Table.Summary.Cell index={2}>合計：{total.toFixed(precision)} 元</Table.Summary.Cell>
      </Table.Summary.Row>
    );
  }

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm grid layout="vertical" formRef={formRef} submitter={false}>
        <div style={{ width: '100%' }}>
          <Spin spinning={loading}>
            <EditableProTable
              headerTitle="金額編輯範例"
              name="editTable"
              rowKey="id"
              columns={columns}
              cardProps={false} // 移除外層 Card
              size='small'
              // 新增按鈕
              recordCreatorProps={{
                newRecordType: 'dataSource',
                record: () => ({
                  id: (Math.random() * 1000000).toFixed(0)
                }),
                creatorButtonText: '新增商品',
                style: { backgroundColor: 'rgba(206, 230, 255, 1)' }
              }}
              // 工具欄
              toolBarRender={toolBarRender}
              // 編輯設定
              editable={{
                type: 'multiple',
                editableKeys: editableKeys,
                onChange: setEditableKeys,
                actionRender: actionRender
              }}
              // 表格合計欄位
              summary={summary}
            />

            {/* 底部功能區 */}
            <FooterToolbar>
              <Button type='primary' onClick={submitterRender}>送出</Button>
            </FooterToolbar>
          </Spin>
        </div>
      </ProForm>
    </PageContainer >
  )
}

export default EditableAmountTable
