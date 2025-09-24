
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import dayjs from 'dayjs'
import { observer } from 'mobx-react'
import React, { useEffect, useRef, useState } from 'react'
import formStore from './Mobx/formRefStore'
import { Button, FloatButton, message, Tooltip } from 'antd'
import { AppstoreOutlined, ClearOutlined, FileAddOutlined, FormOutlined, VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import { parseRocDate } from '@/utils/rocDateUtils'
import optionsStore from './Mobx/optionStore'
import { poChgApi } from './Store/poChgApi'
import { useNavigate } from '@umijs/max'

const SearchForm: React.FC = () => {
  const formRef = formStore.getFormRef
  const actionRef = useRef<ActionType>()
  const navigate = useNavigate()
  // ProTable 的 分頁控制
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5
  })
  // 清除資料 開關
  const [cleared, setCleared] = useState(false)

  // 載入 option
  useEffect(() => {
    optionsStore.setOptions('chgType', [
      { label: '0 首期契變', value: '0' },
      { label: '1 一般契變', value: '1' },
      { label: '2 復效', value: '2' }
    ])
  }, [])

  // 表格欄位定義
  const columns: ProColumns<any>[] = [
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (dom, entity) => [
        <Tooltip title='修改'>
          <Button
            type='link' icon={<FormOutlined />}
            onClick={() => {
              entity = {
                ...entity,
                receiveDate: dayjs(entity.receiveDate).format('TTT/MM/DD'),
                chgDate: dayjs(entity.chgDate).format('TTT/MM/DD'),
              }
              console.log('entity', entity)
              navigate('/antdDemo/demo/PageTemplates/Edit', {
                state: entity
              })
            }}
          />
        </Tooltip>
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
        onChange: (e) => {
          // 強制將值設為大寫
          const upperCaseValue = e.target.value.toUpperCase()
          formRef.current?.setFieldsValue({ receiveNo: upperCaseValue })
        }
      }
    },
    {
      title: '受理日期',
      dataIndex: 'receiveDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD',
        style: { width: '100%' },
        onBlur: (e: any) => {
          if (e.target?.value) {
            formRef.current?.setFieldValue('receiveDate', parseRocDate(e.target?.value))
          }
        }
      }
    },
    {
      title: '變更生效日',
      dataIndex: 'chgDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD',
        style: { width: '100%' },
        onBlur: (e: any) => {
          if (e.target?.value) {
            formRef.current?.setFieldValue('chgDate', parseRocDate(e.target?.value))
          }
        }
      }
    },
    {
      title: '變更選項',
      dataIndex: 'chgType',
      valueType: 'select',
      fieldProps: {
        options: optionsStore.getOptions('chgType')
      }
    },

  ]

  return (
    <PageContainer
      header={{
        title: '查詢資料 - 新增/修改',
        ghost: true
      }}
    >
      <ProTable
        rowKey='receiveNo'
        columns={columns}
        formRef={formRef}
        actionRef={actionRef}
        cardProps={false} // 移除外層 Card
        // 請求數據
        request={async (params: any) => {
          // 清除模式: 回傳空資料
          if (cleared) {
            setCleared(false)
            return { data: [], success: true, total: 0 }
          }
          // 資料抓取
          const res = await poChgApi(params)
          const chgData = res.map((e) => ({
            ...e,
            receiveDate: dayjs(e.receiveDate, 'TTT/MM/DD'),
            chgDate: dayjs(e.chgDate, 'TTT/MM/DD')
          }))
          console.log('chgData', chgData)
          return { data: chgData, success: true, total: chgData.length }
        }}
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
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          onChange: (page, pageSize) => {
            setPagination({ current: page, pageSize })
          }
        }}
        // 工具欄
        toolBarRender={() => [
          <>
            <Button
              type='primary'
              onClick={() => {
                navigate('/antdDemo/demo/PageTemplates/Create')
              }}
            >新增</Button>
            <Tooltip title='清除資料'>
              <Button
                icon={<ClearOutlined />}
                onClick={() => {
                  setCleared(true)              // 開啟清除模式
                  actionRef.current?.reload()   // 啟動重新刷新
                }}
              />
            </Tooltip>
          </>
        ]}
      />

      {/* 懸浮按鈕 */}
      <FloatButton.Group
        shape="square"
        trigger="click"
        style={{ bottom: 100 }}
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
    </PageContainer>
  )
}

export default observer(SearchForm)