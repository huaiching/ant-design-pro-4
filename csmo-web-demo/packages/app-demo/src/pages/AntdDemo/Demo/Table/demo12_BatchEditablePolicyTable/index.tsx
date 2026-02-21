import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { Button, Flex, message, Popconfirm, Select, Spin, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import * as poApi from './store/poApi'

const MyForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<ProFormInstance>()
  // 可編輯的明細資料序號
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])
  // 保單資料
  const [poData, setPoData] = useState<any[]>([])
  // 批次新增資料欄位
  const [batchPolicyNo, setBatchPolicyNo] = useState<string>() // 保單號碼
  const [batchPlanCode, setBatchPlanCode] = useState<string[]>([]) // 保障資料

  // 模擬 API 取得資料
  useEffect(() => {
    poApi.fetchAllData().then((data) => {
      setPoData(data)
    })
    // 設定目前資料列的 id 為可編輯
    // const ids = data.map((item) => item.id)
    // setEditableKeys(ids)
  }, [])

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type="primary"
            onClick={async () => {
              formRef.current?.validateFields().then(() => {
                // 確認按鈕 點擊後 要進行的 API 操作
                // 日期轉換為民國年
                const editableData = formRef.current?.getFieldValue('editTable')
                console.info('editableData', editableData)
                message.success('表單提交成功！')
              })
            }}
            key="save"
          >
            確認
          </Button>
          <Button
            onClick={async () => {
              // 取消按鈕 點擊後 要進行的 API 操作
              message.warning('取消作業')
            }}
          >
            取消
          </Button>
        </FooterToolbar>
      )
    }
  }
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
        onChange: (value: string) => {
          // 當 policyNo 改變時，清空該列的 planCodeDesc
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
      fieldProps: (form, { rowKey, rowIndex }) => {
        // 根據 policyNo 設定 選項
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
    <>
      <ProForm grid layout="vertical" formRef={formRef} submitter={submitterRender()}>
        <div style={{ width: '100%' }}>
          <Spin spinning={loading}>
            <EditableProTable
              name="editTable"
              columns={columns}
              rowKey="id"
              style={{ width: '100%' }}
              // 新增按鈕
              recordCreatorProps={false}
              // recordCreatorProps={{
              //   newRecordType: 'dataSource',
              //   record: () => ({
              //     id: (Math.random() * 1000000).toFixed(0)
              //   }),
              //   creatorButtonText: '新增資料',
              //   style: { backgroundColor: 'rgba(206, 230, 255, 1)' }
              // }}
              // 下方自定義區域: 這裡用來擺放 批次新增資料
              footer={() => {
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
                      onClick={() => {
                        const data = formRef.current?.getFieldValue('editTable') || []
                        batchPlanCode.forEach((planCode) => {
                          data.push({
                            id: (Math.random() * 1000000).toFixed(0),
                            policyNo: batchPolicyNo,
                            planCodeDesc: planCode
                          })
                        })
                        formRef.current?.setFieldValue(['editTable'], data)
                        // 更新 coEditableKeys
                        setEditableKeys(data.map((item: any) => item.id))
                        setBatchPolicyNo(undefined) // 清空保單欄位
                        setBatchPlanCode([]) // 清空險種欄位
                      }}
                    >
                      批次新增資料
                    </Button>
                  </Flex>
                )
              }}
              // 編輯設定
              editable={{
                type: 'multiple',
                editableKeys: editableKeys,
                onChange: setEditableKeys,
                actionRender: (row) => [
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
                    <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: 16 }} />
                  </Popconfirm>
                ]
              }}
            />
          </Spin>
        </div>
      </ProForm>
    </>
  )
}

export default MyForm
