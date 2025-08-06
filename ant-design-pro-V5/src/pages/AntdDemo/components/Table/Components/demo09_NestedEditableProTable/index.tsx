import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, Card, message, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { EditableProTable, ProColumns } from '@ant-design/pro-table'
import dayjs from 'dayjs'

const NestedEditableProTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<ProFormInstance>()

  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])
  const [coEditableKeys, setCoEditableKeys] = useState<Record<string, React.Key[]>>({})

  // 模擬 API 取得表格資料
  useEffect(() => {
    const data = [
      {
        id: 1,
        policyNo: '100000000001',
        poStsCode: '有效',
        poIssueDate: '114/01/10',
        coList: [
          {
            id: 1,
            coverageNo: 1,
            planCode: 'A001',
            rateScale: '0',
            coStsCode: '有效',
            coIssueDate: '114/01/01'
          },
          {
            id: 2,
            coverageNo: 2,
            planCode: 'A002',
            rateScale: '0',
            coStsCode: '有效',
            coIssueDate: '114/01/01'
          }
        ]
      },
      {
        id: 2,
        policyNo: '100000000002',
        poStsCode: '有效',
        poIssueDate: '113/10/14',
        coList: [
          {
            id: 1,
            coverageNo: 1,
            planCode: 'B001',
            rateScale: '0',
            coStsCode: '有效',
            coIssueDate: '113/10/14'
          },
          {
            id: 2,
            coverageNo: 2,
            planCode: 'B002',
            rateScale: '0',
            coStsCode: '有效',
            coIssueDate: '113/10/14'
          }
        ]
      }
    ]
    // 日期格式轉換
    const chgData = data.map(po => ({
      ...po,
      poIssueDate: dayjs(po.poIssueDate, 'TTT/MM/DD'),
      coList: po.coList.map(co => ({
        ...co,
        coIssueDate: dayjs(co.coIssueDate, 'TTT/MM/DD'),
      }))
    }))
    // 資料設定
    formRef.current?.setFieldsValue({ editTable: chgData })
    // 可編輯資料設定
    setEditableKeys(data.map(item => item.id)); // 初始化外層表格的 editableKeys
    setCoEditableKeys(                           // 初始化內層表格的 editableKeys
      data.reduce((acc, item) => ({
        ...acc,
        [item.id]: item.coList?.map(co => co.id) || [],
      }), {})
    );

  }, [])

  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type='primary'
            onClick={async () => {
              try {
                await formRef.current?.validateFields()
                const editableData = formRef.current?.getFieldValue('editTable')
                console.log('提交資料：', editableData)
                message.success('表單提交成功！')
              } catch (err) {
                message.error('請檢查表單錯誤')
              }
            }}
            key='save'
          >
            確認
          </Button>
          <Button
            onClick={() => {
              message.warning('取消作業')
            }}
          >
            取消
          </Button>
        </FooterToolbar>
      )
    }
  }

  const poColumns: ProColumns<any>[] = [
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60,
    },
    {
      title: '保單號碼',
      dataIndex: 'policyNo',
      valueType: 'text',
    },
    {
      title: '保單狀態',
      dataIndex: 'poStsCode',
      valueType: 'text',
    },
    {
      title: '保單生效日',
      dataIndex: 'poIssueDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD',
      },
    },
  ]

  const coColumns: ProColumns<any>[] = [
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60,
    },
    {
      title: '保障序號',
      dataIndex: 'coverageNo',
      valueType: 'text',
    },
    {
      title: '險種代碼',
      dataIndex: 'planCode',
      valueType: 'text',
    },
    {
      title: '險種版數',
      dataIndex: 'rateScale',
      valueType: 'text',
    },
    {
      title: '保障狀態',
      dataIndex: 'coStsCode',
      valueType: 'text',
    },
    {
      title: '保障生效日',
      dataIndex: 'coIssueDate',
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD',
        style: { width: '100%' }, // 設定輸入框寬度為 100%
      },
    },
  ]

  return (
    <>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <Card style={{width: '100%'}}>
        <Spin spinning={loading}>
          <EditableProTable
            name='editTable'
            columns={poColumns}
            rowKey='id'
            recordCreatorProps={{
              newRecordType: 'dataSource',
              record: () => ({
                id: (Math.random() * 1000000).toFixed(0)
              }),
              creatorButtonText: '新增保單'
            }}
            editable={{
              type: 'multiple',
              editableKeys: editableKeys,
              onChange: setEditableKeys,
              actionRender: (row, config, defaultDoms) => [defaultDoms.delete],
            }}
            expandable={{
              expandedRowRender: (record) => (
                <EditableProTable
                  rowKey='id'
                  columns={coColumns}
                  value={record.coList}
                  recordCreatorProps={{
                    newRecordType: 'dataSource',
                    record: () => ({
                      id: (Math.random() * 1000000).toFixed(0)
                    }),
                    creatorButtonText: '新增保障',
                  }}
                  editable={{
                    type: 'multiple',
                    editableKeys: coEditableKeys[record.id] || [],
                    onChange: (keys) => {
                      setCoEditableKeys((prev) => ({
                        ...prev,
                        [record.id]: keys,
                      }))
                    },
                    actionRender: (row, config, defaultDoms) => [defaultDoms.delete],
                  }}
                />
              ),
            }}
          />
        </Spin>
        </Card>
      </ProForm>
    </>
  )
}

export default NestedEditableProTable
