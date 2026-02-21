import {
  AppstoreOutlined,
  FormOutlined,
  SearchOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons'
import {
  ActionType,
  PageContainer,
  ProCard,
  ProColumns,
  ProForm,
  ProTable
} from '@ant-design/pro-components'
import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import { useNavigate } from '@umijs/max'
import { Button, Card, FloatButton, Space, Tooltip } from 'antd'
import { Dayjs } from 'dayjs'
import { observer } from 'mobx-react'
import React, { useMemo, useRef, useState } from 'react'
import formStore from './Mobx/formRefStore'
import { poChgApi } from './Store/poChgApi'
import { dayjsToRocString, rocStringToDayjs } from '@/utils/Dayjs/rocDateUtils'
import { toUpperProps } from '@/utils/FieldUtil/StringUtil'

const ManagerMe: React.FC = () => {
  const formRef = formStore.getFormRef
  const actionRef = useRef<ActionType>()

  // ProTable 的 分頁控制
  const pageSizeOptions = ['5', '10', '20', '50', '100']
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })
  
  const [searchKeys, setSearchKeys] = useState<string[]>(['all']) // 選中的標籤

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
    const res = await poChgApi(input)
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
      fieldProps: { ...toUpperProps }
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
      fieldProps: { options: chgTypeOption }
    }
  ]

  // 動態計算各篩選條件的數量
  const caseSearch = useMemo(() => {
    const counts = {
      all: dataSource.length,
      chgType0: dataSource.filter((e) => e.chgType === '0').length,
      chgType1: dataSource.filter((e) => e.chgType === '1').length,
      chgType2: dataSource.filter((e) => e.chgType === '2').length
    }

    return [
      {
        key: 'chgType',
        title: '變更選項',
        children: [
          { key: 'all', title: '全部', colore: 'rgba(150, 150, 150, 1)', count: counts.all },
          {
            key: 'chgType0',
            title: '首期契變',
            colore: 'rgba(255, 0, 0, 1)',
            count: counts.chgType0
          },
          {
            key: 'chgType1',
            title: '一般契變',
            colore: 'rgba(0, 150, 0, 1)',
            count: counts.chgType1
          },
          {
            key: 'chgType2',
            title: '復效',
            colore: 'rgba(0, 150, 255, 1)',
            count: counts.chgType2
          }
        ]
      }
    ]
  }, [dataSource])

  // 資料篩選
  const filteredData = useMemo(() => {
    // 如果沒有選擇標籤，自動選上 'all'
    if (searchKeys.length === 0) setSearchKeys(['all'])
    // 開始篩選
    let result = dataSource
    // 標籤篩選
    if (searchKeys.length > 0) {
      // 變更選項
      const chgTypeList =
        caseSearch.find((c) => c.key === 'chgType')?.children?.map((child) => child.key) || []
      if (searchKeys.some((key) => chgTypeList.includes(key))) {
        result = result.filter((item) => {
          if (searchKeys.includes('all')) return true
          if (searchKeys.includes('chgType0') && item.chgType === '0') return true
          if (searchKeys.includes('chgType1') && item.chgType === '1') return true
          if (searchKeys.includes('chgType2') && item.chgType === '2') return true
          return false
        })
      }
    }
    return result
  }, [searchKeys, dataSource])

  return (
    <PageContainer
      header={{
        title: '個人責任區',
        ghost: true
      }}
    >
      <ProForm grid layout="vertical" submitter={false}>
        {/* 搜尋標籤 */}
        <ProCard ghost>
          <MliFormRow gutter={8} style={{ width: '100%' }}>
            {caseSearch.map((caseData) => (
              <MliFormCol key={caseData.key} colSize={4 / caseSearch.length}>
                <Card
                  title={<span style={{ fontSize: 18 }}>{caseData.title}</span>}
                  type="inner"
                  style={{ textAlign: 'center', height: '100%' }}
                >
                  <Space wrap>
                    {caseData.children?.map((children) => {
                      const isSelected = searchKeys.includes(children.key)
                      return (
                        <Button
                          key={children.key}
                          type={isSelected ? 'primary' : 'text'}
                          style={{
                            // 用透明度 辨識 有無選擇
                            backgroundColor: isSelected
                              ? children.colore
                              : children.colore.replace('1)', '0.1)')
                          }}
                          onClick={() => {
                            // 多選
                            // setSearchKeys((prev) =>
                            //   isSelected ? prev.filter((k) => k !== children.key) : [...prev, children.key]
                            // )
                            // 單選
                            setSearchKeys(isSelected ? [] : [children.key])
                          }}
                        >
                          {children.title} ({children.count})
                        </Button>
                      )
                    })}
                  </Space>
                </Card>
              </MliFormCol>
            ))}
          </MliFormRow>
        </ProCard>

        {/* 表格資料 */}
        <ProTable
          rowKey="receiveNo"
          columns={columns}
          formRef={formRef}
          dataSource={filteredData}
          style={{ width: '100%' }}
          // 搜尋列 查詢 的行為
          onSubmit={requestApi}
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

export default observer(ManagerMe)
