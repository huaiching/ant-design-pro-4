import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, message, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { fetchTableData } from './store/userApi'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import { v4 as uuidv4 } from 'uuid'

const MyForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<ProFormInstance>()
  // 可編輯的明細資料序號
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])

  // 模擬 API 取得表格資料
  useEffect(()=>{
    setLoading(true)
    fetchTableData({})
    .then((request)=>{
      // 資料寫入 formRef
      formRef.current?.setFieldsValue({
        editTable: request.data
      })
      // 資料開啟可編輯
      request.data.map((data)=>{
        if(data.id != undefined) editableKeys.push(data.id)
      })
      setEditableKeys(editableKeys)
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])
  // 每次畫面刷新，都要重新進行可編輯設定，避免設定跑掉
  useEffect(()=>{
    const editTable = formRef.current?.getFieldValue('editTable')
    if (editTable != undefined) {
      editTable.map((data: any)=>{
        if(data.id != undefined) editableKeys.push(data.id)
      })
      setEditableKeys(editableKeys)
    }
  })

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
            <Button
              type='primary'
              onClick={async () => {
                formRef.current?.validateFields().then(values => {
                  // 確認按鈕 點擊後 要進行的 API 操作
                  // 日期轉換為民國年
                  const editableData = formRef.current?.getFieldValue('editTable')
                  const newData = editableData.map((data: any)=>{
                    return {
                      ...data,
                    }
                  })
                  console.log('editableData',newData)
                  message.success('表單提交成功！')
                })
              }}
              key='save'
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
      width: 60,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          { required: true, message: '請輸入名稱！' }
        ],
      },
    },
    {
      title: '年齡',
      dataIndex: 'age',
      valueType: 'digit',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'select',
      fieldProps: {
        placeholder: '請選擇性別',
        options: genderInd
      },
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      valueType: 'date',
      fieldProps: {
        format: 'YYYY/MM/DD',
      },
    },
  ]

  return (
    <>
      <h1>EditableProTable</h1>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <Spin spinning={loading}>
          <EditableProTable
            name='editTable'
            columns={columns}
            rowKey='id'
            headerTitle='編輯表格 模擬 API 取得資料'
            form={{
              ignoreRules: false,
            }}
            // 新增按鈕
            recordCreatorProps={{
              newRecordType: 'dataSource',
              record: () => ({
                id: uuidv4()
              }),
              creatorButtonText: '新增資料'
            }}
            // 編輯設定
            editable={{
              type: 'multiple',
              editableKeys: editableKeys,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete]
              },
              onChange: setEditableKeys
            }}
          />
        </Spin>
      </ProForm>
    </>
  )
}

export default MyForm
