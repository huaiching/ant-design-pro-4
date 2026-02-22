import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { ProFormText, ProFormDatePicker, ProFormInstance, ModalForm } from '@ant-design/pro-components'
import { Button, Space, Typography } from 'antd'
import { MliFormRow } from '@mli-csmo/base'

interface Props {
  mode: 'create' | 'edit'
  initialValues?: any
  onSubmit: (values: any) => void
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

const ModelEdit: React.FC<Props> = ({
  mode,
  initialValues,  // 編輯列的資料
  onSubmit,       // 存檔函式
  open,        // Model 開關變數
  onOpenChange      // 控制 Model 開關的函式
}) => {
  const formRef = useRef<ProFormInstance>()
  const readOnly = mode === 'edit'
  const title = mode === 'edit' ? '編輯保單' : '新增保單'

  useEffect(() => {
    formRef.current?.setFieldsValue(initialValues)
  }, [initialValues])

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <Space>
          <Button
            type='primary'
            onClick={async () => {
              // 取得頁面資料
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
              onSubmit(data) // 更新資料
              formRef.current?.resetFields() // 清空頁面資料
              onOpenChange(false) // 提交後關閉彈窗
            }}
          >
            確認
          </Button>
          <Button
            onClick={() => {
              formRef.current?.resetFields()  // 清空頁面資料
              onOpenChange(false) // 提交後關閉彈窗
            }}
          >
            取消
          </Button>
        </Space>
      )
    }
  }

  return (
    <ModalForm
      grid
      layout='vertical'
      formRef={formRef}
      onOpenChange={onOpenChange}    // 控制 Modal 開啟/關閉狀態的回調
      open={open}                    // Modal 開啟/關閉的綁定狀態
      modalProps={{
        closable: false,          // 關閉右上角 X 按鈕
        maskClosable: false,      // 禁止點擊遮罩關閉
        width: '90%',             // 設定寬度
      }}
      submitter={submitterRender()}
    >
      <Typography.Title level={5}>
        {title}
      </Typography.Title>
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
    </ModalForm>
  )
}

export default ModelEdit
