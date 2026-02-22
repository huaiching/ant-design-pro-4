import React, { useEffect, useState } from 'react'
import { ProTable, ProColumns, PageContainer, ProForm } from '@ant-design/pro-components'
import { Card, Descriptions } from 'antd'
import { fetchAllData } from './Store/dataApi'

const PolicyTable: React.FC = () => {

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
    setDataSource(res)
    setPagination(prev => ({ ...prev, current: 1 }))
  }

  // 初始資料抓取
  useEffect(() => {
    requestApi()
  }, []);

  // 儲存選取的資料
  const [selectedRow, setSelectedRow] = useState<any>()

  // 表格欄位定義
  const columns: ProColumns<any>[] = [
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
      title: '主約險種代碼',
      dataIndex: 'basicPlanCode',
      valueType: 'text',
    },
    {
      title: '主約險種版數',
      dataIndex: 'basicRateScale',
      valueType: 'text',
    }
  ]

  /** Descriptions 的欄位項目定義 */
  const descriptionItems = [
    {
      key: 'policyNo',
      label: '保單號碼',
      children: selectedRow?.policyNo
    },
    {
      key: 'poStsCode',
      label: '保單狀態',
      children: selectedRow?.poStsCode
    },
    {
      key: 'basicPlanCode',
      label: '主約險種代碼',
      children: selectedRow?.basicPlanCode
    },
    {
      key: 'basicRateScale',
      label: '主約險種版數',
      children: selectedRow?.basicRateScale
    },
    {
      key: 'poIssueDate',
      label: '保單生效日',
      children: selectedRow?.poIssueDate
    },
    {
      key: 'o1Name',
      label: '要保人姓名',
      children: selectedRow?.o1Name
    },
    {
      key: 'i1Name',
      label: '被保人姓名',
      children: selectedRow?.i1Name
    },
    {
      key: 'address',
      label: '通訊地址',
      children: selectedRow?.address,
      span: 2
    },
    {
      key: 'phone',
      label: '行動電話',
      children: selectedRow?.phone
    },
    {
      key: 'eMail',
      label: 'E-mail',
      children: selectedRow?.eMail
    }
  ]

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm submitter={false} layout="vertical">
        {/* 顯示保單主列表 */}
        <ProTable
          rowKey='policyNo'
          columns={columns}
          cardProps={false}     //  移除 Card 包裝
          size='small'
          // 數據源
          dataSource={dataSource}
          // 搜尋列
          search={false}
          // 表格操作選項
          options={false}
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
          // 點擊行時的事件處理
          onRow={(record) => ({
            onClick: () => setSelectedRow(record)
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
              bordered
              items={descriptionItems}
            />
          </Card>
        )}
      </ProForm>
    </PageContainer >
  )
}

export default PolicyTable
