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
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Button, List, message, Tooltip } from 'antd'
import React, { useRef, useState } from 'react'
import { fetchAllData } from './store/userApi'
import { PageContainer } from '@ant-design/pro-components'
import { rocStringToDayjs } from '@/utils/Dayjs/rocDateUtils'
import { FileSearchOutlined } from '@ant-design/icons'

const ProTableDemo: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()

  // ProTable 的 分頁控制
  const pageSizeOptions = ['5', '10', '20', '50', '100']
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10 // 初始每頁數量
  })

  // 數據源
  const [dataSource, setDataSource] = useState<any[]>([])

  // 清除資料 開關
  const [cleared, setCleared] = useState<boolean>(false)
  const reload = () => {
    setCleared(true) // 開啟清除模式
    actionRef.current?.reload() // 啟動重新刷新
  }

  // 查詢 API 設定
  const requestApi = async (params: any) => {
    // 清除模式: 回傳空資料
    if (cleared) {
      setCleared(false)
      setDataSource([])
      return { data: [], success: true, total: 0 }
    }
    // 資料抓取
    const res = await fetchAllData(params)
    // 資料格式轉換: 如果有 日期 資料，要轉為 Dayjs 格式，才能正確顯示在 ProTable 的 date 欄位
    const output = res.data.map((e: any) => ({
      ...e,
      birthDate: rocStringToDayjs(e.birthDate)
    }))
    setDataSource(output)
    return { data: output, success: true, total: res.total }
  }

  /** 勾選設定 **/
  // 記錄勾選的key
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  // 勾選導出事件
  const handleExport = () => {
    const selectedData = dataSource.filter((item) => selectedRowKeys.includes(item.id))
    console.info('勾選導出資料：', selectedData)
    message.success(`已導出 ${selectedData.length} 筆資料到 console`)
    setSelectedRowKeys([]) // 清空勾選
  }
  // 取消勾選事件
  const handleCancel = () => {
    setSelectedRowKeys([]) // 清空勾選
    message.info('已清空勾選項目')
  }

  // 工具欄
  const toolBarRender = () => [
    <Button>工具欄</Button>
  ]

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
      render: (dom, rowData) => [
        <div>
          <Tooltip title="明細">
            <Button
              type="link"
              icon={<FileSearchOutlined />}
              onClick={() => {
                console.info('點擊明細 - entity:', dom, rowData)
              }}
            />
          </Tooltip>
        </div>
      ]
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      formItemProps: {
        rules: [{ required: true, message: '請輸入姓名！' }]
      }
    },
    {
      title: '年齡',
      dataIndex: 'age',
      valueType: 'digit',
      sorter: (a: any, b: any) => a.age - b.age,
      copyable: true
    },
    {
      title: '地址',
      dataIndex: 'address',
      valueType: 'text',
      search: false,
      sorter: (a: any, b: any) => a.address.localeCompare(b.address),
    },
    {
      title: '性別',
      dataIndex: 'sex',
      valueType: 'select',
      sorter: (a: any, b: any) => a.sex.localeCompare(b.sex),
      fieldProps: {
        placeholder: '請選擇性別',
        options: genderInd
      }
    },
    {
      title: '生日',
      dataIndex: 'birthDate',
      valueType: 'date',
      sorter: (a: any, b: any) => a.birthDate - b.birthDate,
      fieldProps: {
        format: 'TTT/MM/DD',
      }
    }
  ]

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm submitter={false} layout="vertical">
        <ProTable
          rowKey="id"
          headerTitle="模擬 API 表格"
          columns={columns}
          formRef={formRef}
          actionRef={actionRef}
          cardProps={false} // 移除外層 Card
          form={{
            component: false, // 移除查詢表單的 Card
            // ignoreRules: false  // 不要忽略欄位驗證規則 (預設忽略)
          }}
          // 自定義無資料要顯示的內容
          locale={{
            emptyText: '無資料，請點擊查詢按鈕',
          }}
          size='small'
          // 請求數據
          request={requestApi}
          // 手動請求
          manualRequest={true}
          // 表格操作選項
          options={{
            density: true, // 列表密度
            fullScreen: true, // 全螢幕
            reload: true, // 重新載入
            setting: true // 設定
          }}
          // 搜尋列 重置 的行為
          onReset={reload}
          // 搜尋表單佈局
          search={{ labelWidth: 'auto' }}
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
          // 工具欄
          toolBarRender={toolBarRender}
          // 選擇行
          rowSelection={{
            type: 'checkbox', // checkbox 選擇框(預設) / radio 單選框
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
            selections: true
          }}
          /** 使用 tableAlertRender 顯示勾選資料與導出按鈕 */
          tableAlertRender={() => (
            <Button color="danger" variant="filled" onClick={handleExport}>
              導出數據(console)
            </Button>
          )}
          /**　使用 tableAlertOptionRender 顯示取消勾選資料 */
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

export default ProTableDemo
