import CodeTsx from '@/utils/CodePre/CodeTsx'
import { Typography } from 'antd'
import React from 'react'

const { Title, Paragraph } = Typography

const SampleSub: React.FC = () => {
  return (
    <Typography>
      <Paragraph>
        查詢 使用 ProTable 作為 查詢結果列表 的呈現元件，並透過 <code>與 API 的對接</code> 來獲得數據。 <br />
        根據需求，可能會包含一些額外的功能按鈕，例如 新增、匯出 等，這些按鈕通常會放在工具欄 (toolBarRender) 中。
      </Paragraph>

      <Paragraph type='danger'>
        此頁面 透過 <code>dataSource</code> 來獲取數據的方式，運作時 透過 自定義 <code>dataSource 狀態機</code> 來保存資料， <br />
        使用時，必須自定義 資料相關操作，並且 <code>只能一次獲取全部資料</code>，無法使用 <code>Page API</code>。
        在 需要取得全部數據 的進階作業，可透過此方式進行頁面設定。 <br />
        依然能夠在 columns 中，透過 <code>render 屬性</code> 來獲得 該行數據，並進行一些簡單的處理，如：操作欄位的頁面跳轉。 <br />
        如果 作業上 無需對全部數據進行處理，可改用 request 屬性 來實現與 API 的對接，設定上會比較簡單。
      </Paragraph>

      <Title level={5}>分頁設定</Title>
      <Paragraph>
        ProTable 的分頁設定，透過 pagination 屬性來進行設定，設定項目包括： <br />
        1. current：當前頁碼 <br />
        2. pageSize：每頁顯示的數量 <br />
        每頁數量的選項，透過 pageSizeOptions 來進行設定。
      </Paragraph>
      
      <Title level={5}>欄位設定</Title>
      <Paragraph>
        columns 屬性用於設定 ProTable 的欄位，這裡定義了幾個欄位，包括 操作、保單號碼、受理號碼、受理日期、變更生效日、變更選項 等。 <br />
        1. 操作欄位：定義了一個操作欄位，包含修改和查詢兩個按鈕，點擊後會觸發 pageJump 方法進行頁面跳轉。 <br />
        2. 其他欄位：定義了保單號碼、受理號碼、受理日期、變更生效日、變更選項等欄位，並根據需求設定了 valueType、fieldProps 等屬性來控制欄位的顯示和行為。 <br />
        3. 變更生效日 欄位：設定了 hideInSearch: true，表示在查詢表單中隱藏該欄位，因為變更生效日通常不會作為查詢條件。
      </Paragraph>

      <Paragraph>
        非 操作欄位 可使用 <code>sorter 屬性</code> 開啟資料排序，使用時需根據 <code>類型</code> 設定排序比對條件 <br />
        字串：使用 <code>localeCompare</code> 做為比對條件，如：<code>{`sorter: (a: any, b: any) => a.policyNo.localeCompare(b.policyNo)`}</code>。 <br />
        日期：使用 <code>-</code> 做為比對條件，如：<code>{`sorter: (a: any, b: any) => a.receiveDate - b.receiveDate`}</code>。 <br />
        數字：使用 <code>-</code> 做為比對條件，如：<code>{`sorter: (a: any, b: any) => a.age - b.age`}</code>。
      </Paragraph>

      <Paragraph type='danger'>
        如果 搜尋列數據 中有 日期 資料，需要將其轉為 String 格式，才能將數據正確傳遞給 API。 <br />
        透過 民國年日期工具 的 <code>dayjsToRocString</code> 與 <code>dayjsToRocStringMonth</code> 可快速進行轉換。
      </Paragraph>

      <Title level={5}>查詢 API</Title>
      <Paragraph>
        此範例 統一透過 <code>requestApi 方法</code> 來進行 資料獲取作業。 <br />
        執行時，透過 從 formRef 獲取 搜尋列數據，並透過 API 來獲取資料數據。 <br />
        資料數據 取得後，必須手動將資料 寫入 dataSource 中，並設定 分頁資訊。 <br />
        並且 ProTable 的設定上，需要設定 <code>onSubmit</code> 與 <code>options.requestApi</code> 觸發 <code>requestApi 方法</code>。
      </Paragraph>

      <Paragraph type='danger'>
        如果 搜尋列數據 中有 日期 資料，需要將其轉為 String 格式，才能將數據正確傳遞給 API。 <br />
        透過 民國年日期工具 的 <code>dayjsToRocString</code> 與 <code>dayjsToRocStringMonth</code> 可快速進行轉換。
      </Paragraph>

      <Paragraph type='danger'>
        如果 API 回傳的資料 中有 日期 資料，需要將其轉為 Dayjs 格式，才能正確顯示在 ProTable 的 date 欄位中。 <br />
        透過 民國年日期工具 的 <code>rocStringToDayjs</code> 與 <code>rocStringToDayjsMonth</code> 可快速進行轉換。
      </Paragraph>

      <Title level={5}>清除資料</Title>
      <Paragraph>
        此範例 統一透過 <code>reload 方法</code> 來進行 資料清除作業。 <br />
        執行時，手動清空 <code>dataSource</code> 和 <code>重置 分頁資訊</code>。
        並且 ProTable 的設定上，需要設定 <code>onReset</code>  觸發 <code>reload 方法</code>。
      </Paragraph>

      <Title level={5}>頁面跳轉</Title>
      <Paragraph>
        在查詢結果列表中，通常會有一些操作按鈕，例如 新增、修改、查詢 等，這些按鈕的功能是跳轉到對應的頁面，並將當前行的資料傳遞過去。 <br />
        這裡透過 pageJump 方法來實現頁面跳轉，根據不同的操作類型，來決定跳轉的路徑，並將資料傳遞過去。 <br />
        在頁面跳轉的實現上，提供了兩種方式，<code>原頁面跳轉</code> 和 <code>新開分頁</code>。 <br />
        1. 原頁面跳轉：直接使用 navigate 進行頁面跳轉，資料透過 state 傳遞。 <br />
        2. 新開分頁：將資料暫存到 sessionStorage 中，使用 window.open 開啟新頁面，並在新頁面中從 sessionStorage 中取出資料，最後移除 sessionStorage 中的資料。
        請 依照需求 來選擇適合的跳轉方式，跳轉後的頁面 要如何 獲取參數，可以參考 <code>元件範例 / 工具類與整合範例 / 頁面跳轉</code> 中的實現方式。
      </Paragraph>

      <Title level={5}>工具欄</Title>
      <Paragraph>
        工具欄 (toolBarRender) 是 ProTable 於 表格上方 的自定義區域，可以用來擺放 新增、匯出 等自定義按鈕。 <br />
        此範例中，為了方便設定，統一透過 toolBarRender 方法 來進行設定。
      </Paragraph>

      <Paragraph type='warning'>
        此範例 設定為 手動請求 (manualRequest: true)，因此在頁面載入時 不會自動發出請求，如果需要在頁面載入時就發出請求，可以將 manualRequest 設定為 false，或者在 useEffect 中呼叫 actionRef.current?.reload() 來觸發請求。
      </Paragraph>

      <Paragraph type='danger'>
        僅為 程式基本結構，實際使用 請參考 <code>元件範例</code> 來進行開發，並根據實際需求進行調整。
      </Paragraph>

      <CodeTsx title='Search.tsx' code={`import { ProColumns, ProFormInstance, ProTable } from "@ant-design/pro-components"
import { observer } from "mobx-react"
import { useRef, useState } from "react"
import { useNavigate } from "@umijs/max"
import { toUpperProps } from "@/utils/FieldUtil/StringUtil"
import { FormOutlined, SearchOutlined } from "@ant-design/icons"
import { Tooltip, Button, Space } from "antd"
import { getSearchApi } from "../Api/SearchDemoController"
import { dayjsToRocString, rocStringToDayjs } from "@/utils/Dayjs/rocDateUtils"

const SubSearch: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // ProTable 的 分頁控制
  const pageSizeOptions = ['5', '10', '20', '50', '100']
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })

  // 數據源
  const [dataSource, setDataSource] = useState<any[]>([])

  // 清除資料
  const reload = () => {
    formRef.current?.resetFields()
    setDataSource([])
    setPagination({ current: 1, pageSize: 10 })
  }

  // 查詢 API 設定
  const requestApi = async () => {
    // 獲取數據
    const formValues = formRef.current?.getFieldsValue()
    // 整理數據
    const input = {
      ...formValues,
      receiveDate: dayjsToRocString(formValues.receiveDate),
    }
    const res = await getSearchApi(input)
    // 資料格式轉換: 如果有 日期 資料，要轉為 Dayjs 格式，才能正確顯示在 ProTable 的 date 欄位
    const output = res.map((e: any) => ({
      ...e,
      receiveDate: rocStringToDayjs(e.receiveDate),
      chgDate: rocStringToDayjs(e.chgDate)
    }))
    setDataSource(output)
    setPagination(prev => ({ ...prev, current: 1 }))
  }

  // 頁面跳轉
  const navigate = useNavigate()
  const pageJump = (type: string, rowData: any) => {
    // 設定 路徑
    let path = ''
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
    // 設定 參數
    let data = {}
    if (rowData) {
      data = {
        ...rowData,
        receiveDate: dayjsToRocString(rowData?.receiveDate),
        chgDate: dayjsToRocString(rowData?.chgDate)
      }
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

  // 工具欄
  const toolBarRender = () => [
    <Space>
      <Button
        color="purple" variant="solid"
        onClick={() => pageJump('create', null)}
      >
        新增
      </Button>
    </Space>
  ]

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
      valueType: 'text',
      sorter: (a: any, b: any) => a.policyNo.localeCompare(b.policyNo),
    },
    {
      title: '受理號碼',
      dataIndex: 'receiveNo',
      valueType: 'text',
      sorter: (a: any, b: any) => a.receiveNo.localeCompare(b.receiveNo),
      fieldProps: { ...toUpperProps }
    },
    {
      title: '受理日期',
      dataIndex: 'receiveDate',
      valueType: 'date',
      sorter: (a: any, b: any) => a.receiveDate - b.receiveDate,
      fieldProps: {
        format: 'TTT/MM/DD',
        style: { width: '100%' }
      }
    },
    {
      title: '變更生效日',
      dataIndex: 'chgDate',
      valueType: 'date',
      sorter: (a: any, b: any) => a.chgDate - b.chgDate,
      hideInSearch: true,
      fieldProps: {
        format: 'TTT/MM/DD',
        style: { width: '100%' }
      }
    },
    {
      title: '變更選項',
      dataIndex: 'chgType',
      valueType: 'select',
      sorter: (a: any, b: any) => a.chgType.localeCompare(b.chgType),
      fieldProps: { options: chgTypeOption }
    }
  ]

  return (
    <ProTable
      rowKey="receiveNo"
      columns={columns}
      formRef={formRef}
      cardProps={false} // 移除外層 Card
      form={{
        component: false, // 移除查詢表單的 Card
        ignoreRules: false  // 不要忽略欄位驗證規則 (預設忽略)
      }}
      size='small'
      // 數據源
      dataSource={dataSource}
      // 表格配置
      options={{
        density: true, // 列表密度
        fullScreen: true, // 全螢幕
        reload: requestApi, // 重新載入
        setting: true // 設定
      }}
      // 搜尋列 查詢 的行為
      onSubmit={requestApi}
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
    />
  )
}

export default observer(SubSearch)`}
      />
    </Typography>
  )
}

export default SampleSub
