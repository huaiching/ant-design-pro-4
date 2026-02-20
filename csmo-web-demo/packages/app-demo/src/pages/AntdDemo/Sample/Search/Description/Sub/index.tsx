import CodeTsx from '@/utils/CodePre/CodeTsx'
import { Typography } from 'antd'
import React from 'react'

const { Title, Paragraph } = Typography

const SampleSub: React.FC = () => {
  return (
    <Typography>
      <Paragraph>
        查詢 使用 ProTable 作為 查詢結果列表 的呈現元件，並透過 request 屬性來實現與 API 的對接。 <br />
        根據需求，可能會包含一些額外的功能按鈕，例如 新增、匯出 等，這些按鈕通常會放在工具欄 (toolBarRender) 中。
      </Paragraph>

      <Title level={5}>分頁設定</Title>
      <Paragraph>
        ProTable 的分頁設定，透過 pagination 屬性來進行設定，設定項目包括： <br />
        1. current：當前頁碼 <br />
        2. pageSize：每頁顯示的數量 <br />
        每頁數量的選項，透過 pageSizeOptions 來進行設定。
      </Paragraph>

      <Title level={5}>查詢 API</Title>
      <Paragraph>
        查詢 API 的設定，透過 request 屬性來進行設定，這裡 透過 requestApi 方法 來實現與 API 的對接，並在 requestApi 方法中，根據清除模式的開關，來決定是回傳空資料還是從 API 抓取資料。 <br />
        1. 清除模式: 當清除模式開啟時，回傳空資料，並關閉清除模式。 <br />
        2. 資料抓取: 當清除模式關閉時，從 API 抓取資料，並進行資料格式轉換，最後回傳資料給 ProTable 進行顯示。 <br />
        3. 資料格式轉換: 如果 API 回傳的資料中有 日期 資料，需要將其轉為 Dayjs 格式，才能正確顯示在 ProTable 的 date 欄位中。
      </Paragraph>

      <Title level={5}>頁面跳轉</Title>
      <Paragraph>
        在查詢結果列表中，通常會有一些操作按鈕，例如 新增、修改、查詢 等，這些按鈕的功能是跳轉到對應的頁面，並將當前行的資料傳遞過去。 <br />
        這裡透過 pageJump 方法來實現頁面跳轉，根據不同的操作類型，來決定跳轉的路徑，並將資料傳遞過去。 <br />
        在頁面跳轉的實現上，提供了兩種方式，<code>原頁面跳轉</code> 和 <code>新開分頁</code>。 <br />
        1. 原頁面跳轉: 直接使用 navigate 進行頁面跳轉，資料透過 state 傳遞。 <br />
        2. 新開分頁: 將資料暫存到 sessionStorage 中，使用 window.open 開啟新頁面，並在新頁面中從 sessionStorage 中取出資料，最後移除 sessionStorage 中的資料。
        請依照需求 來選擇適合的跳轉方式，跳轉後的頁面 要如何獲取 參數，可以參考 <code>元件範例 / 工具類與整合範例 / 頁面跳轉</code> 中的實現方式。
      </Paragraph>
      
      <Title level={5}>欄位設定</Title>
      <Paragraph>
        columns 屬性用於設定 ProTable 的欄位，這裡定義了幾個欄位，包括 操作、保單號碼、受理號碼、受理日期、變更生效日、變更選項 等。 <br />
        1. 操作欄位: 定義了一個操作欄位，包含修改和查詢兩個按鈕，點擊後會觸發 pageJump 方法進行頁面跳轉。 <br />
        2. 其他欄位: 定義了保單號碼、受理號碼、受理日期、變更生效日、變更選項等欄位，並根據需求設定了 valueType、fieldProps 等屬性來控制欄位的顯示和行為。 <br />
        3. 變更生效日 欄位: 設定了 hideInSearch: true，表示在查詢表單中隱藏該欄位，因為變更生效日通常不會作為查詢條件。
      </Paragraph>
      <Paragraph>
        formRef 和 actionRef 是 ProTable 提供的兩個 Ref，用於 <code>操作查詢表單</code> 和 <code>操作表格</code> 的行為。 <br />
        1. formRef: 用於獲取 查詢表單 的實例，可以通過 formRef.current 來訪問查詢表單的方法和屬性，例如獲取表單的值、重置表單等行為。 <br />
        2. actionRef: 用於獲取表格的實例，可以通過 actionRef.current 來訪問表格的方法和屬性，例如觸發表格的刷新、重置等行為。 <br />
      </Paragraph>

      <Paragraph type='warning'>
        此範例 設定為 手動請求 (manualRequest: true)，因此在頁面載入時 不會自動發出請求，如果需要在頁面載入時就發出請求，可以將 manualRequest 設定為 false，或者在 useEffect 中呼叫 actionRef.current?.reload() 來觸發請求。
      </Paragraph>

      <Paragraph type='danger'>
        僅為 程式基本結構，實際使用 請參考 <code>元件範例</code> 來進行開發，並根據實際需求進行調整。
      </Paragraph>

      <CodeTsx title='Search.tsx' code={`import { ActionType, ProColumns, ProFormInstance, ProTable } from "@ant-design/pro-components"
import { observer } from "mobx-react"
import { useRef, useState } from "react"
import { useNavigate } from "@umijs/max"
import { toUpperProps } from "@/utils/FieldUtil/StringUtil"
import { ClearOutlined, FormOutlined, SearchOutlined } from "@ant-design/icons"
import { Tooltip, Button } from "antd"
import { getSearchApi } from "../Api/SearchDemoController"
import { dayjsToRocString, rocStringToDayjs } from "@/utils/Dayjs/rocDateUtils"

const SubSearch: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()

  // ProTable 的 分頁控制
  const pageSizeOptions = ['5', '10', '20', '50', '100']
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10 // 初始每頁數量
  })
  
  // 清除資料 開關
  const [cleared, setCleared] = useState(false)
  const reload = () => {
    setCleared(false) // 關閉清除模式
    actionRef.current?.reload() // 啟動重新刷新
  }
  
  // 查詢 API 設定
  const requestApi = async (params: any) => {
    // 清除模式: 回傳空資料
    if (cleared) {
      setCleared(false)
      return { data: [], success: true, total: 0 }
    }
    // 資料抓取
    const res = await getSearchApi(params)
    // 資料格式轉換: 如果有 日期 資料，要轉為 Dayjs 格式，才能正確顯示在 ProTable 的 date 欄位
    const chgData = res.map((e: any) => ({
      ...e,
      receiveDate: rocStringToDayjs(e.receiveDate),
      chgDate: rocStringToDayjs(e.chgDate)
    }))
    return { data: chgData, success: true, total: chgData.length }
  }

  // 頁面跳轉
  const navigate = useNavigate()
  const pageJump = (type: string, rowData: any) => {
    // 資料處理
    let path = ''
    let data = {
      ...rowData,
      receiveDate: dayjsToRocString(rowData.receiveDate),
      chgDate: dayjsToRocString(rowData.chgDate)
    }
    // 路徑設定
    switch (type) {
      case 'create':
        path = '/container/demo/antdDemo/demo/PageTemplates/Create'
        break
      case 'edit':
        path = '/container/demo/antdDemo/demo/PageTemplates/Edit'
        break
      case 'query':
        path = '/container/demo/antdDemo/demo/PageTemplates/Query'
        break
      default:
        return
    }
    /* 原頁面跳轉 */
    // navigate(path, {
    //   state: data
    // })

    /* 新開分頁 */
    sessionStorage.setItem('state', JSON.stringify(data))
    window.open(path)
    sessionStorage.removeItem('state');
  }

  // 下拉選單定義
  const chgTypeOption = [
    { label: '0 首期契變', value: '0' },
    { label: '1 一般契變', value: '1' },
    { label: '2 復效', value: '2' }
  ]

  // 表格欄位定義
  const columns: ProColumns<any>[] = [
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      render: (dom, rowData) => [
        <div>
          <Tooltip title="修改">
            <Button
              type="link"
              icon={<FormOutlined />}
              onClick={() => pageJump('edit', rowData)}
            />
          </Tooltip>
          <Tooltip title="查詢">
            <Button
              type="link"
              icon={<SearchOutlined />}
              onClick={() => pageJump('query', rowData)}
            />
          </Tooltip>
        </div>
      ]
    },
    {
      title: '保單號碼',
      dataIndex: 'policyNo',
      valueType: 'text'
    },
    {
      title: '受理號碼',
      dataIndex: 'receiveNo',
      valueType: 'text',
      fieldProps: {
        ...toUpperProps
      }
    },
    {
      title: '受理日期',
      dataIndex: 'receiveDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD',
        style: { width: '100%' },
      }
    },
    {
      title: '變更生效日',
      dataIndex: 'chgDate',
      valueType: 'date',
      hideInSearch: true,
      fieldProps: {
        format: 'TTT/MM/DD',
        style: { width: '100%' },
      }
    },
    {
      title: '變更選項',
      dataIndex: 'chgType',
      valueType: 'select',
      fieldProps: {
        options: chgTypeOption
      }
    }
  ]


  return (
    <ProTable
      rowKey="receiveNo"
      columns={columns}
      formRef={formRef}
      actionRef={actionRef}
      cardProps={false} // 移除外層 Card
      form={{
        component: false // 移除查詢表單的 Card
      }}
      size='small'
      // 請求數據
      request={requestApi}
      // 手動請求
      manualRequest={true}
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
        pageSizeOptions: pageSizeOptions,
        onChange: (page, pageSize) => {
          setPagination({ current: page, pageSize })
        }
      }}
      // 工具欄
      toolBarRender={() => [
        <Space>
          <Button
            color="purple" variant="solid"
            onClick={() => pageJump('create', null)}
          >
            新增
          </Button>
          <Tooltip title="清除資料">
            <Button
              icon={<ClearOutlined />}
              onClick={reload}
            />
          </Tooltip>
        </Space>
      ]}
    />
  )
}

export default observer(SubSearch)`}
      />
    </Typography>
  )
}

export default SampleSub
