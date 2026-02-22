import {
  AppstoreOutlined,
  FormOutlined,
  SearchOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons'
import { ActionType, PageContainer, ProColumns, ProForm, ProTable } from '@ant-design/pro-components'
import { useNavigate } from '@umijs/max'
import { Button, FloatButton, Space, Tooltip } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect, useRef, useState } from 'react'
import formStore from './Mobx/formRefStore'
import optionsStore from './Mobx/optionStore'
import { poChgApi } from './Store/poChgApi'
import { toUpperProps } from '@/utils/FieldUtil/StringUtil'
import { dayjsToRocString, rocStringToDayjs } from '@/utils/Dayjs/rocDateUtils'

const SearchForm: React.FC = () => {
  const formRef = formStore.getFormRef
  const actionRef = useRef<ActionType>()

  // ProTable 的 分頁控制
  const pageSizeOptions = ['5', '10', '20', '50', '100']
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10 // 初始每頁數量
  })

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
      return { data: [], success: true, total: 0 }
    }
    // 資料抓取
    const res = await poChgApi(params)
    // 資料格式轉換: 如果有 日期 資料，要轉為 Dayjs 格式，才能正確顯示在 ProTable 的 date 欄位
    const output = res.map((e: any) => ({
      ...e,
      receiveDate: rocStringToDayjs(e.receiveDate),
      chgDate: rocStringToDayjs(e.chgDate)
    }))
    return { data: output, success: true, total: output.length }
  }

  // 載入 option
  useEffect(() => {
    optionsStore.setOptions('chgType', [
      { label: '0 首期契變', value: '0' },
      { label: '1 一般契變', value: '1' },
      { label: '2 復效', value: '2' }
    ])
  }, [])

  // 頁面跳轉
  const navigate = useNavigate()
  const pageJump = (type: string, rowData: any) => {
    // 設定 路徑
    let path = ''
    switch (type) {
      case 'create':
        path = '/antdDemo/demo/PageTemplates/Create'
        break
      case 'edit':
        path = '/antdDemo/demo/PageTemplates/Edit'
        break
      case 'query':
        path = '/antdDemo/demo/PageTemplates/Query'
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
    navigate(path, {
      state: data
    })
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
        options: optionsStore.getOptions('chgType')
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
          rowKey="receiveNo"
          columns={columns}
          formRef={formRef}
          actionRef={actionRef}
          cardProps={false} // 移除外層 Card
          form={{
            component: false // 移除查詢表單的 Card
          }}
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

        {/* 懸浮按鈕 */}
        <FloatButton.Group
          shape="square"
          trigger="click"
          style={{ bottom: 80 }}
          placement="top"
          icon={<AppstoreOutlined />}
        >
          <FloatButton
            icon={<VerticalAlignTopOutlined />}
            // tooltip='回頂部'
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }}
          />
          <FloatButton
            icon={<VerticalAlignBottomOutlined />}
            // tooltip='到底部'
            onClick={() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
              })
            }}
          />
        </FloatButton.Group>
      </ProForm>
    </PageContainer>
  )
}

export default observer(SearchForm)
