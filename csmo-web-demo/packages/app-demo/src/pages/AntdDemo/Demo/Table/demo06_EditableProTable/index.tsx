import { DeleteOutlined } from '@ant-design/icons'
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { Button, message, Modal, Popconfirm, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { fetchAllData } from './Store/dataApi'
import { dayjsToRocString, rocStringToDayjs } from '@/utils/Dayjs/rocDateUtils'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [loading, setLoading] = useState<boolean>(false)

  // 可編輯的明細資料序號
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])

  // 查詢 API 設定
  const requestApi = async () => {
    const res = await fetchAllData()
    // 資料格式轉換: 如果有 日期 資料，要轉為 Dayjs 格式，才能正確顯示在 ProTable 的 date 欄位
    const output = res.map((e: any) => ({
      ...e,
      birthDate: rocStringToDayjs(e.birthDate)
    }))
    formRef.current?.setFieldValue('editTable', output)
    // 設定目前資料列的 id 為可編輯
    const ids = output.map((item) => item.id)
    setEditableKeys(ids)
  }

  // 頁面初始化就要抓取資料
  useEffect(() => {
    setLoading(true)
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
          // 日期轉換為民國年
          const newData = data.map((e: any) => {
            return {
              ...e,
              birthDate: dayjsToRocString(e.birthDate)
            }
          })
          console.info('editableData', newData)
          message.success('表單提交成功！')
        })
      },
      onCancel() {
        // 取消按鈕 點擊後 要進行的 API 操作
        message.warning('取消作業')
      }
    })
  }

  // 下拉選單定義
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
        A: { text: 'A 類' },
        B: { text: 'B 類' }
      }
    },
    {
      title: '選擇（Radio Button）',
      dataIndex: 'radioButton',
      valueType: 'radioButton',
      valueEnum: {
        left: { text: '左' },
        right: { text: '右' }
      }
    },
    {
      title: '是否啟用（Switch）',
      dataIndex: 'switch',
      valueType: 'switch',
      fieldProps: {
        checkedChildren: '是',
        unCheckedChildren: '否'
      }
    },
    {
      title: '同意條款（Checkbox）',
      dataIndex: 'checkbox',
      valueType: 'checkbox',
      valueEnum: {
        Y: '我已閱讀並同意'
      }
    }
  ]

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
              headerTitle="編輯表格 模擬 API 取得資料"
              name="editTable"
              rowKey="id"
              columns={columns}
              size='small'
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
                actionRender: actionRender
              }}
            />

            {/* 底部功能區 */}
            <FooterToolbar>
              <Button type='primary' onClick={submitterRender}>送出</Button>
            </FooterToolbar>
          </Spin>
        </div>
      </ProForm>
    </PageContainer >
  )
}

export default MyForm
