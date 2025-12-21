import { parseRocDate } from '@/utils/rocDateUtils'
import {
  AppstoreOutlined,
  DownOutlined,
  FormOutlined,
  SearchOutlined,
  UpOutlined,
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
import { Button, Card, DatePicker, FloatButton, Input, Select, Space, Tooltip } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { observer } from 'mobx-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import formStore from './Mobx/formRefStore'
import optionsStore from './Mobx/optionStore'
import { poChgApi } from './Store/poChgApi'

const ManagerMe: React.FC = () => {
  const formRef = formStore.getFormRef
  const actionRef = useRef<ActionType>()
  const navigate = useNavigate()
  // ProTable 的 分頁控制
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5
  })
  const [cleared, setCleared] = useState(false) // 清除資料 開關
  const [searchKeys, setSearchKeys] = useState<string[]>(['all']) // 選中的標籤
  const [dataSource, setDataSource] = useState<any[]>([]) // 主表資料
  // 快速搜尋 輸入資料
  const [policyNo, setPolicyNo] = useState<string>('')
  const [receiveNo, setReceiveNo] = useState<string>('')
  const [receiveDate, setReceiveDate] = useState<Dayjs | null>(null)
  const [chgDate, setChgDate] = useState<Dayjs | null>(null)
  const [chgType, setChgType] = useState<string>('')
  // 快速搜尋 開關
  const [showSearch, setShowSearch] = useState<boolean>(false)

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
      width: 80,
      render: (dom, entity) => [
        <>
          <Tooltip title="修改">
            <Button
              type="link"
              icon={<FormOutlined />}
              onClick={() => {
                entity = {
                  ...entity,
                  receiveDate: dayjs(entity.receiveDate).format('TTT/MM/DD'),
                  chgDate: dayjs(entity.chgDate).format('TTT/MM/DD')
                }
                console.log('entity', entity)
                navigate('/antdDemo/demo/PageTemplates/Edit', {
                  state: entity
                })
              }}
            />
          </Tooltip>
          <Tooltip title="查詢">
            <Button
              type="link"
              icon={<SearchOutlined />}
              onClick={() => {
                entity = {
                  ...entity,
                  receiveDate: dayjs(entity.receiveDate).format('TTT/MM/DD'),
                  chgDate: dayjs(entity.chgDate).format('TTT/MM/DD')
                }
                console.log('entity', entity)
                navigate('/antdDemo/demo/PageTemplates/Query', {
                  state: entity
                })
              }}
            />
          </Tooltip>
        </>
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
    // 保單號碼
    if (policyNo) {
      const lowerSearch = policyNo.toLowerCase()
      result = result.filter((item) => item.policyNo?.toLowerCase().includes(lowerSearch))
    }
    // 受理號碼
    if (receiveNo) {
      const lowerSearch = receiveNo.toLowerCase()
      result = result.filter((item) => item.receiveNo?.toLowerCase().includes(lowerSearch))
    }
    // 受理日期
    if (receiveDate) {
      result = result.filter((item) => {
        return item.receiveDate?.isSame(receiveDate, 'day') // 比較年月日是否相同
      })
    }
    // 變更生效日
    if (chgDate) {
      result = result.filter((item) => {
        return item.chgDate?.isSame(chgDate, 'day') // 比較年月日是否相同
      })
    }
    // 變更選項
    if (chgType) {
      const lowerSearch = chgType.toLowerCase()
      result = result.filter((item) => item.chgType?.toLowerCase().includes(lowerSearch))
    }

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
  }, [policyNo, receiveNo, receiveDate, chgDate, chgType, searchKeys, dataSource])

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

        {/* 快速查詢 */}
        {showSearch && (
          <ProCard ghost>
            <MliFormRow gutter={8} style={{ width: '100%' }}>
              <MliFormCol>
                <ProForm.Item label="保單號碼">
                  <Input
                    style={{ width: '100%' }}
                    placeholder=""
                    value={policyNo}
                    onChange={(e) => setPolicyNo(e.target.value)}
                  />
                </ProForm.Item>
              </MliFormCol>
              <MliFormCol>
                <ProForm.Item label="受理號碼">
                  <Input
                    style={{ width: '100%' }}
                    placeholder=""
                    value={receiveNo}
                    onChange={(e) => setReceiveNo(e.target.value)}
                  />
                </ProForm.Item>
              </MliFormCol>
              <MliFormCol colSize={2 / 3}>
                <ProForm.Item label="受理日期">
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder=""
                    format="TTT/MM/DD"
                    value={receiveDate}
                    onBlur={(e: any) => {
                      if (e.target?.value) {
                        setReceiveDate(parseRocDate(e.target?.value))
                      }
                    }}
                  />
                </ProForm.Item>
              </MliFormCol>
              <MliFormCol colSize={2 / 3}>
                <ProForm.Item label="變更生效日">
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder=""
                    format="TTT/MM/DD"
                    value={chgDate}
                    onBlur={(e: any) => {
                      if (e.target?.value) {
                        setChgDate(parseRocDate(e.target?.value))
                      }
                    }}
                  />
                </ProForm.Item>
              </MliFormCol>
              <MliFormCol colSize={2 / 3}>
                <ProForm.Item label="變更選項">
                  <Select
                    style={{ width: '100%' }}
                    placeholder=""
                    options={optionsStore.getOptions('chgType')}
                    value={chgType}
                    onChange={setChgType}
                  />
                </ProForm.Item>
              </MliFormCol>
            </MliFormRow>
            <Button
              type="primary"
              onClick={() => {
                setPolicyNo('')
                setReceiveNo('')
                setReceiveDate(null)
                setChgDate(null)
                setChgType('')
              }}
            >
              清除搜尋條件
            </Button>
          </ProCard>
        )}

        {/* 表格資料 */}
        <ProTable
          rowKey="receiveNo"
          columns={columns}
          formRef={formRef}
          actionRef={actionRef}
          dataSource={filteredData}
          style={{ width: '100%' }}
          headerTitle={
            <Button
              type="default"
              icon={showSearch ? <DownOutlined /> : <UpOutlined />}
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? '收合搜尋' : '展開搜尋'}
            </Button>
          }
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
            setDataSource(chgData)
            return { data: chgData, success: true, total: chgData.length }
          }}
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
          search={false} // 關閉搜尋欄
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
