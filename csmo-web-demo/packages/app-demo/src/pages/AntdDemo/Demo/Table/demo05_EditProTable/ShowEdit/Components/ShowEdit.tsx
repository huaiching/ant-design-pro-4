import React, { useEffect, useRef } from 'react'
import { ProForm, ProFormText, ProFormDatePicker, ProCard, ProFormInstance } from '@ant-design/pro-components'
import { Button, Space, Typography } from 'antd'
import { MliFormRow } from '@mli-csmo/base'

interface Props {
  mode: 'create' | 'edit'
  initialValues?: any
  onSubmit: (values: any) => void
  onCancel?: () => void
}

const ShowEdit: React.FC<Props> = ({
  mode,
  initialValues, // 編輯列的資料
  onSubmit, // 存檔函式
  onCancel  // 取消函式
}) => {
  const formRef = useRef<ProFormInstance>()
  const readOnly = mode === 'edit'
  const title = mode === 'edit' ? '編輯保單' : '新增保單'

  useEffect(() => {
    formRef.current?.setFieldsValue(initialValues)
  }, [])

  return (
    <div>
      <Typography.Title level={5}>
        {title}
        <Space style={{ paddingLeft: 20 }}>
          <Button size='small' color='green' variant="solid"
            onClick={() => {
              const form = formRef.current?.getFieldsValue()
              const data = {
                ...initialValues,
                policyNo: form?.policyNo,
                poStsCode: form?.poStsCode,
                basicPlanCode: form?.basicPlanCode,
                basicRateScale: form?.basicRateScale,
                poIssueDate: form?.poIssueDate,
                o1Name: form?.o1Name,
                i1Name: form?.i1Name,
                address: form?.address,
                phone: form?.phone,
                eMail: form?.eMail
              }
              onSubmit(data)
            }}>
            存檔
          </Button>
          <Button size='small' onClick={onCancel}>
            取消
          </Button>
        </Space>
      </Typography.Title>

      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={false}
      >
        <MliFormRow gutter={8}>
          <ProFormText
            name='policyNo'
            label='保單號碼'
            disabled={readOnly}
          />
          <ProFormText
            name='poStsCode'
            label='保單狀態'
          />
          <ProFormText
            name='basicPlanCode'
            label='主約險種代碼'
          />
          <ProFormText
            name='basicRateScale'
            label='主約險種版數'
          />
          <ProFormDatePicker
            name='poIssueDate'
            label='保單生效日'
            fieldProps={{
              format: 'TTT/MM/DD',
              style: { width: '100%' },
            }}
          />
          <ProFormText
            name='o1Name'
            label='要保人姓名'
          />
          <ProFormText
            name='i1Name'
            label='被保人姓名'
          />
          <ProFormText
            name='address'
            label='通訊地址'
          />
          <ProFormText
            name='phone'
            label='行動電話'
          />
          <ProFormText
            name='eMail'
            label='E-mail'
          />
        </MliFormRow>
      </ProForm>
    </div>
  )
}

export default ShowEdit
