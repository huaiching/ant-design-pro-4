import { parseRocDate } from '@/utils/rocDateUtils'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { Button, Flex, message, Popconfirm, Select, Spin } from 'antd'
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
                const newData = editableData.map((data: any) => {
                  return {
                    ...data
                  }
                })
                console.info('editableData', newData)
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

  const genderInd = [
    {
      label: '男',
      value: '1'
    },
    {
      label: '女',
      value: '2'
    }
  ]

  const drinksOptions = [
    {
      value: 'tea',
      label: '茶類',
      children: [
        { value: 'black_tea', label: '紅茶' },
        { value: 'green_tea', label: '綠茶' },
        { value: 'oolong_tea', label: '烏龍茶' }
      ]
    },
    {
      value: 'coffee',
      label: '咖啡類',
      children: [
        { value: 'latte', label: '拿鐵' },
        { value: 'americano', label: '美式咖啡' }
      ]
    },
    {
      value: 'juice',
      label: '果汁類',
      children: [
        { value: 'orange_juice', label: '柳橙汁' },
        { value: 'apple_juice', label: '蘋果汁' }
      ]
    },
    {
      value: 'smoothie',
      label: '冰沙類',
      children: [{ value: 'fruit_smoothie', label: '水果冰沙' }]
    }
  ]

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
      title: '姓名',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '請輸入名稱！' }]
      },
      fieldProps: {
        allowClear: false
      }
    },
    {
      title: '年齡',
      dataIndex: 'age',
      valueType: 'digit',
      fieldProps: {
        allowClear: false
      }
    },
    {
      title: '選擇飲料(Cascader)',
      dataIndex: 'cascader',
      valueType: 'cascader',
      fieldProps: {
        placeholder: '請選擇飲料',
        options: drinksOptions,
        multiple: true, // 啟用多選模式
        allowClear: false
      }
    },
    {
      title: '同意條款（Checkbox）',
      dataIndex: 'checkbox',
      valueType: 'checkbox',
      valueEnum: {
        // checkbox: ['Y']
        Y: '我已閱讀並同意'
      }
    },
    {
      title: '生日',
      dataIndex: 'birthDate',
      valueType: 'date',
      fieldProps: (form, row) => ({
        format: 'TTT/MM/DD',
        onBlur: (e: any) => {
          // 取得 欄位資料
          const value = e.target?.value
          // 取得 該行 index
          let rowKey = row?.rowKey ? row.rowKey[1] : row?.rowKey
          // 取得 table 資料
          const tableData = formRef.current?.getFieldValue('editTable') || []
          // 更新該行資料 並進行 日期格式化
          const newData = tableData.map((item: any, index: number) =>
            index === Number(rowKey) ? { ...item, birthDate: parseRocDate(value) } : item
          )
          // 資料更新
          formRef.current?.setFieldsValue({ editTable: newData })
        }
      })
    },
    {
      title: '類型（Radio）',
      dataIndex: 'radio',
      valueType: 'radio',
      valueEnum: {
        // radio: "A"
        A: { text: 'A 類' },
        B: { text: 'B 類' }
      }
    },
    {
      title: '選擇（Radio Button）',
      dataIndex: 'radioButton',
      valueType: 'radioButton',
      valueEnum: {
        // radioButton: "left"
        left: { text: '左' },
        right: { text: '右' }
      }
    },
    {
      title: '是否啟用（Switch）',
      dataIndex: 'switch',
      valueType: 'switch',
      fieldProps: {
        // switch: true
        checkedChildren: '是',
        unCheckedChildren: '否'
      }
    },
    {
      title: '同意條款（Checkbox）',
      dataIndex: 'checkbox',
      valueType: 'checkbox',
      valueEnum: {
        // checkbox: ['Y']
        Y: '我已閱讀並同意'
      }
    }
  ]

  return (
    <>
      <h2>此頁面目前實驗中</h2>
      <ProForm grid layout="vertical" formRef={formRef} submitter={submitterRender()}>
        <div style={{ width: '100%' }}>
          <Spin spinning={loading}>
            <EditableProTable
              name="editTable"
              columns={columns}
              rowKey="id"
              headerTitle="編輯表格 模擬 API 取得資料"
              // 新增按鈕
              recordCreatorProps={{
                newRecordType: 'dataSource',
                record: () => ({
                  id: (Math.random() * 1000000).toFixed(0)
                }),
                creatorButtonText: '新增資料',
                style: { backgroundColor: 'rgba(206, 230, 255, 1)' }
              }}
              // 下方自定義區域: 這裡用來擺放 批次新增資料
              footer={() => {
                return (
                  <Flex
                    justify="center" // 水平對齊方式
                    align="center" // 垂直對齊方式
                    gap="large" // 元素間距
                  >
                    <Select
                      value={batchPolicyNo}
                      showSearch // 開啟搜尋功能
                      placeholder="保單號碼"
                      options={[]}
                      style={{ width: 150 }}
                      onChange={setBatchPolicyNo}
                    />
                    <Select
                      value={batchPlanCode}
                      showSearch
                      placeholder="險種"
                      mode="multiple" // 多選模式
                      options={[]}
                      style={{ width: 200 }}
                      onChange={setBatchPlanCode}
                    />
                    <Button
                      type="dashed"
                      style={{ backgroundColor: 'rgba(206, 230, 255, 1)' }}
                      onClick={(data) => {
                        const subData = formRef.current?.getFieldValue('editTable') || []
                        const newData = [
                          ...subData,
                          { id: (Math.random() * 1000000).toFixed(0), poStsCode: '有效' },
                          { id: (Math.random() * 1000000).toFixed(0), poStsCode: '有效' },
                          { id: (Math.random() * 1000000).toFixed(0), poStsCode: '有效' },
                          { id: (Math.random() * 1000000).toFixed(0), poStsCode: '有效' }
                        ]
                        formRef.current?.setFieldValue(['editTable'], newData)
                        // 更新 coEditableKeys
                        setEditableKeys(newData.map((item: any) => item.id))
                      }}
                    >
                      <PlusOutlined />
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
