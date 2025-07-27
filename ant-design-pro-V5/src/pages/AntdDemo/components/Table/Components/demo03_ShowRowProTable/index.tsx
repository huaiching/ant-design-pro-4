import React, { useState } from 'react'
import { ProTable, ProColumns } from '@ant-design/pro-components'
import { Card, Descriptions } from 'antd'

/** 假資料 */
const mockData: PolicyRecord[] = [
  {
    policyNo: 'P123456789',
    poStsCode: 'A1',
    basicPlanCode: 'H001',
    basicRateScale: '2',
    poIssueDate: '2023-01-01',
    o1Name: '王小明',
    i1Name: '李大華',
    address: '台北市信義區信義路100號',
    phone: '0912345678',
    eMail: 'test@example.com',
  },
  {
    policyNo: 'P987654321',
    poStsCode: 'B2',
    basicPlanCode: 'C002',
    basicRateScale: '3',
    poIssueDate: '2024-03-15',
    o1Name: '陳美麗',
    i1Name: '陳小美',
    address: '新北市板橋區中山路1段123號',
    phone: '0922333444',
    eMail: 'meili@example.com',
  },
]

/** 資料結構定義 */
type PolicyRecord = {
  policyNo: string
  poStsCode: string
  basicPlanCode: string
  basicRateScale: string
  poIssueDate?: string
  o1Name?: string
  i1Name?: string
  address?: string
  phone?: string
  eMail?: string
}

const PolicyTable: React.FC = () => {
  // 儲存選取的資料
  const [selectedRow, setSelectedRow] = useState<PolicyRecord>()

  /** 表格欄位定義 */
  const columns: ProColumns<PolicyRecord>[] = [
    {
      title: '保單號碼',
      dataIndex: 'policyNo',
      key: 'policyNo',
    },
    {
      title: '保單狀態',
      dataIndex: 'poStsCode',
      key: 'poStsCode',
    },
    {
      title: '主約險種代碼',
      dataIndex: 'basicPlanCode',
      key: 'basicPlanCode',
    },
    {
      title: '主約險種版數',
      dataIndex: 'basicRateScale',
      key: 'basicRateScale',
    },
  ]

  /** Descriptions 的欄位項目定義 */
  const descriptionItems = [
          {
            key: 'policyNo',
            label: '保單號碼',
            children: selectedRow?.policyNo,
          },
          {
            key: 'poStsCode',
            label: '保單狀態',
            children: selectedRow?.poStsCode,
          },
          {
            key: 'basicPlanCode',
            label: '主約險種代碼',
            children: selectedRow?.basicPlanCode,
          },
          {
            key: 'basicRateScale',
            label: '主約險種版數',
            children: selectedRow?.basicRateScale,
          },
          {
            key: 'poIssueDate',
            label: '保單生效日',
            children: selectedRow?.poIssueDate,
          },
          {
            key: 'o1Name',
            label: '要保人姓名',
            children: selectedRow?.o1Name,
          },
          {
            key: 'i1Name',
            label: '被保人姓名',
            children: selectedRow?.i1Name,
          },
          {
            key: 'address',
            label: '通訊地址',
            children: selectedRow?.address,
          },
          {
            key: 'phone',
            label: '行動電話',
            children: selectedRow?.phone,
          },
          {
            key: 'eMail',
            label: 'E-mail',
            children: selectedRow?.eMail,
          },
        ]

  return (
    <div>
      {/* 顯示保單主列表 */}
      <ProTable<PolicyRecord>
        rowKey='policyNo'     // 唯一鍵
        columns={columns}     // 表格欄位
        dataSource={mockData} // 數據實體
        search={false}        // 關閉搜尋功能
        pagination={false}    // 關閉分頁功能
        // 點擊行時的事件處理
        onRow={(record) => ({ 
          onClick: () => setSelectedRow(record),
        })}
        // 選中行 設定為 反白背景
        rowClassName={(record) =>
          selectedRow?.policyNo === record.policyNo ? 'ant-table-row-selected' : ''
        }
      />

      {/* 明細區塊，點擊列後才顯示 */}
      {selectedRow && (
        <Card title='保單詳細資料' style={{ marginTop: 24 }}>
          <Descriptions 
            column={3} 
            // bordered 
            items={descriptionItems} 
          />
        </Card>
      )}
    </div>
  )
}

export default PolicyTable
