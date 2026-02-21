import { DeleteOutlined } from '@ant-design/icons'
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { Button, Card, message, Popconfirm, Spin } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'

const MyForm: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<ProFormInstance>()
  // 可編輯的明細資料序號
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])

  // 模擬 API 取得表格資料
  useEffect(() => {
    const resData = [
      {
        id: 1,
        name: '測試人員 A',
        age: 25,
        birthDate: '089/01/10',
        sex: '1'
      },
      {
        id: 2,
        name: '測試人員 B',
        age: 10,
        birthDate: '104/01/10',
        sex: '2'
      }
    ]
    // 日期格式轉換
    const chgData = resData.map((data) => ({
      ...data,
      birthDate: dayjs(data.birthDate, 'TTT/MM/DD')
    }))

    formRef.current?.setFieldsValue({
      editTable: chgData
    })
    // 設定目前資料列的 id 為可編輯
    const ids = chgData.map((item) => item.id)
    setEditableKeys(ids)
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
      fixed: 'left',
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
      title: '性別',
      dataIndex: 'sex',
      valueType: 'select',
      fieldProps: {
        placeholder: '請選擇性別',
        options: genderInd,
        allowClear: false
      }
    },
    {
      title: '生日',
      dataIndex: 'birthDate',
      valueType: 'date',
      fieldProps: (form, row) => ({
        format: 'TTT/MM/DD',
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
    <PageContainer
      header={{
        ghost: true
      }}
    >
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
    </PageContainer >
  )
}

export default MyForm
