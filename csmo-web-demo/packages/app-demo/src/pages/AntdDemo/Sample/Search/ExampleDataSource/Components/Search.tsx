import { ProColumns, ProFormInstance, ProTable } from "@ant-design/pro-components"
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

export default observer(SubSearch)