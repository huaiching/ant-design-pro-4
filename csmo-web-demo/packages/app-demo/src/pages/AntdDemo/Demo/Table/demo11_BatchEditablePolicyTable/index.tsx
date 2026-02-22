import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { Button, Flex, message, Modal, Popconfirm, Select, Spin, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { fetchAllDataApi, editTableDataApi } from './Store/dataApi'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [loading, setLoading] = useState<boolean>(false)

  // 可編輯的明細資料序號
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])

  // 保單資料
  const [poData, setPoData] = useState<any[]>([])

  /** 查詢 API 設定 **/
  // 保單資料
  const requestPoApi = async () => {
    const res = await fetchAllDataApi()
    setPoData(res)
  }
  // 已選取資料
  const requestApi = async () => {
    const res = await editTableDataApi()
    formRef.current?.setFieldValue('editTable', res)
    // 設定目前資料列的 id 為可編輯
    const ids = res.map((item) => item.id)
    setEditableKeys(ids)
  }

  // 頁面初始化就要抓取資料
  useEffect(() => {
    setLoading(true)
    requestPoApi()
    requestApi()
    setLoading(false)
  }, [])

  // 控制送出後之動作
  const submitterRender = () => {
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        formRef.current?.validateFields().then(() => {
          // 取得資料
          const data = formRef.current?.getFieldValue('editTable')
          console.info('editableData', data)
          message.success('表單提交成功！')
        })
      },
      onCancel() {
        // 取消按鈕 點擊後 要進行的 API 操作
        message.warning('取消作業')
      }
    })
  }

  /** 批次新增資料相關設定 **/
  // 批次新增資料欄位: 保單號碼
  const [batchPolicyNo, setBatchPolicyNo] = useState<string>()
  // 批次新增資料欄位: 保障資料
  const [batchPlanCode, setBatchPlanCode] = useState<string[]>([])

  // 編輯表格的操作區設定
  const actionRender = (row: any) => [
    <Popconfirm
      key="delete"
      title="確定刪除嗎？"
      onConfirm={() => {
        // 取得現有資料
        const currentData = formRef.current?.getFieldValue('editTable') || []
        // 過濾刪除該列
        const newData = currentData.filter((item: any) => item.id !== row.id)
        // 更新表單欄位資料
        formRef.current?.setFieldValue('editTable', newData)
        // 同步更新 editableKeys
        setEditableKeys(newData.map((item: any) => item.id))
      }}
    >
      <DeleteOutlined style={{ color: 'red' }} />
    </Popconfirm>
  ]

  // 自定義的新增按鈕
  const addRender = () => {
    return (
      <Flex
        justify="center" // 水平對齊方式
        align="top" // 垂直對齊方式
        gap="large" // 元素間距
      >
        <Flex gap='small'>
          <Typography.Text>保單號碼：</Typography.Text>
          <Select
            value={batchPolicyNo}
            showSearch // 開啟搜尋功能
            placeholder="保單號碼"
            options={poOption}
            style={{ width: 150 }}
            onChange={setBatchPolicyNo}
          />
        </Flex>
        <Flex gap='small'>
          <Typography.Text>險種：</Typography.Text>
          <Select
            value={batchPlanCode}
            showSearch
            placeholder="險種"
            mode="multiple" // 多選模式
            options={planCodeDescOption(batchPolicyNo)}
            style={{ width: 350 }}
            onChange={setBatchPlanCode}
          />
        </Flex>
        <Button
          type="dashed"
          style={{ backgroundColor: 'rgba(206, 230, 255, 1)' }}
          icon={<PlusOutlined />}
          onClick={batchAddData}
        >
          批次新增資料
        </Button>
      </Flex>
    )
  }

  // 批次新增資料事件
  const batchAddData = () => {
    // 取得目前資料
    const data = formRef.current?.getFieldValue('editTable') || []
    // 新增資料設定
    batchPlanCode.forEach((planCode) => {
      data.push({
        id: (Math.random() * 1000000).toFixed(0),
        policyNo: batchPolicyNo,
        planCodeDesc: planCode
      })
    })
    // 資料新增
    formRef.current?.setFieldValue(['editTable'], data)
    // 開啟可編輯狀態
    setEditableKeys(data.map((item: any) => item.id))
    // 新增相關欄位清空
    setBatchPolicyNo(undefined) // 清空保單欄位
    setBatchPlanCode([]) // 清空險種欄位
  }

  /** 下拉選單定義 **/
  // 保單號碼下拉選單
  const poOption = poData.map((po) => ({
    label: po.policyNo,
    value: po.policyNo
  }))
  // 險種下拉選單
  const planCodeDescOption = (policyNo: string | undefined) => {
    const po = poData.find((item) => item.policyNo === policyNo)
    if (!po) return []

    return po.coInfoList.map((coInfo: any) => ({
      label: coInfo.planCodeDesc,
      value: coInfo.planCodeDesc
    }))
  }

  // 表格欄位定義
  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: false,
      hideInTable: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60
    },
    {
      title: '保單號碼',
      dataIndex: 'policyNo',
      valueType: 'select',
      fieldProps: (form, { rowIndex }) => ({
        placeholder: '',
        options: poOption,
        // 當 policyNo 改變時，清空該列的 planCodeDesc
        onChange: (value: string) => {
          const currentData = form.getFieldValue('editTable') || []
          currentData[rowIndex] = {
            ...currentData[rowIndex],
            policyNo: value,
            planCodeDesc: undefined,
          }
          form.setFieldValue('editTable', currentData)
        },
      }),
      formItemProps: {
        rules: [
          { required: true, message: '不可空白' }
        ]
      }
    },
    {
      title: '險種',
      dataIndex: 'planCodeDesc',
      valueType: 'select',
      // 根據 policyNo 設定 選項
      fieldProps: (form, { rowKey, rowIndex }) => {
        const currentData = form.getFieldValue('editTable') || [];
        const policyNo = currentData[rowIndex]?.policyNo;
        return {
          placeholder: '',
          options: planCodeDescOption(policyNo)
        }
      },
      formItemProps: {
        rules: [
          { required: true, message: '不可空白' }
        ]
      }
    }
  ]


  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm grid layout="vertical" formRef={formRef} submitter={false}>
        <div style={{ width: '100%' }}>
          <Spin spinning={loading}>
            <EditableProTable
              name="editTable"
              rowKey="id"
              columns={columns}
              size='small'
              // 新增按鈕
              recordCreatorProps={false}
              // 編輯設定
              editable={{
                type: 'multiple',
                editableKeys: editableKeys,
                onChange: setEditableKeys,
                actionRender: actionRender
              }}
              // 下方自定義區域: 這裡用來擺放 批次新增資料
              footer={addRender}
            />

            {/* 底部功能區 */}
            <FooterToolbar>
              <Button type='primary' onClick={submitterRender}>送出</Button>
            </FooterToolbar>
          </Spin>
        </div>
      </ProForm>
    </PageContainer>
  )
}

export default MyForm
