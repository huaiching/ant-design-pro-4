// 檔名建議：EditableAmountTable.tsx

import { DeleteOutlined } from '@ant-design/icons'
import { FooterToolbar, PageContainer } from '@ant-design/pro-components'
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { Button, message, Popconfirm, Select, Spin, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

const EditableAmountTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<ProFormInstance>()
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])
  // 幣別
  const [currency, setCurrency] = useState<string>('TWD')
  formRef.current?.setFieldValue('currency', currency)
  // 合計金額
  const [totalAmount, setTotalAmount] = useState<number>(0)
  formRef.current?.setFieldValue('totalAmount', totalAmount)

  // 初始化假資料
  useEffect(() => {
    setLoading(true)
    const resData = [
      { id: 1, item: '001', amount: 1000 },
      { id: 2, item: '003', amount: 50 }
    ]
    formRef.current?.setFieldsValue({ editTable: resData })
    setEditableKeys(resData.map((i) => i.id))
    setLoading(false)
  }, [])

  const currencyOptions = [
    { label: '新台幣', value: 'TWD' },
    { label: '美元', value: 'USD' },
    { label: '日圓', value: 'JPY' },
    { label: '歐元', value: 'EUR' }
  ]

  const itemOptions = [
    { label: '001 紅茶', value: '001' },
    { label: '002 奶茶', value: '002' },
    { label: '003 咖啡', value: '003' }
  ]

  // 欄位設定
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
      formItemProps: { rules: [{ required: true, message: '請選擇品項！' }] }
    },
    {
      title: '金額',
      dataIndex: 'amount',
      valueType: 'digit',
      fieldProps: (form: any, row: any) => {
        return {
          precision: currency === 'TWD' ? 0 : 2,
          step: currency === 'TWD' ? 1 : 0.01,
          min: 0,
          style: { width: 200 },
          addonAfter: '元',
          changeOnWheel: true // 滾輪變更數值
        }
      },
      formItemProps: { rules: [{ required: true, message: '請輸入金額！' }] }
    }
  ]

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type="primary"
            onClick={async () => {
              formRef.current?.validateFields().then(() => {
                // 確認按鈕 點擊後 要進行的 API 操作
                const editableData = formRef.current?.getFieldValue('editTable')
                const currency = formRef.current?.getFieldValue('currency')
                const totalAmount = formRef.current?.getFieldValue('totalAmount')
                console.info('editableData', editableData)
                console.info('currency', currency)
                console.info('totalAmount', totalAmount)
                message.success('表單提交成功！')
              })
            }}
            key="save"
          >
            確認
          </Button>
          <Button
            onClick={async () => {
              // 取消按鈕 點擊後 要進行的 API 操作
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
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm grid layout="vertical" formRef={formRef} submitter={submitterRender()}>
        <div style={{ width: '100%' }}>
          <Spin spinning={loading}>
            <EditableProTable
              name="editTable"
              columns={columns}
              rowKey="id"
              headerTitle="金額編輯範例"
              cardProps={false} // 移除外層 Card
              toolBarRender={() => [
                <Select
                  key="currency"
                  showSearch
                  placeholder="幣別"
                  options={currencyOptions}
                  onChange={(value) => setCurrency(value)}
                  value={currency}
                  style={{ width: 120 }}
                />
              ]}
              // 新增按鈕
              recordCreatorProps={{
                newRecordType: 'dataSource',
                record: () => ({
                  id: (Math.random() * 1000000).toFixed(0)
                }),
                creatorButtonText: '新增商品',
                style: { backgroundColor: 'rgba(206, 230, 255, 1)' }
              }}
              // 編輯設定
              editable={{
                type: 'multiple',
                editableKeys: editableKeys,
                onChange: setEditableKeys,
                actionRender: (row) => [
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
                    <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: 16 }} />
                  </Popconfirm>
                ]
              }}
              // 表格合計欄位
              summary={(pageData) => {
                // 取得現有資料
                const dataList = formRef.current?.getFieldValue('editTable') || [];
                // 計算金額總和
                let total = 0;
                dataList.forEach((data: any) => {
                  total += data.amount || 0;
                });
                // 根據幣別設定小數位數
                const precision = currency === 'TWD' ? 0 : 2;
                // 四捨五入
                total = currency === 'TWD' ? Math.round(total) : Math.round(total * 100) / 100;
                setTotalAmount(total);

                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>合計：{total.toFixed(precision)} 元</Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          </Spin>
        </div>
      </ProForm>
    </PageContainer >
  )
}

export default EditableAmountTable
