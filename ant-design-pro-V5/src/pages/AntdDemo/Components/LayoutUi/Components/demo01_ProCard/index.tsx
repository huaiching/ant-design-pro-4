import ProCard from '@ant-design/pro-card'
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { Button, ConfigProvider, message, Segmented, Space, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FooterToolbar } from '@ant-design/pro-layout'
import { MliFormRow } from '@mli-csmo/base'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const editOption = [
  { value: 'edit', icon: <CheckOutlined /> },
  { value: 'disabled', icon: <CloseOutlined /> }
]

const InsurancePolicyCard: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [poEdit, setPoEdit] = useState<string>('disabled')

  useEffect(() => {
    formRef.current?.setFieldsValue({
      policyNo: '1234567890',
      poStsCode: '42'
    })
  }, [])

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type='primary'
            onClick={async () => {
              formRef.current?.validateFields().then(() => {
                // 確認按鈕 點擊後 要進行的 API 操作
                message.success('表單提交成功！')
                console.info('formRef', formRef.current?.getFieldsValue())
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

  return (
    <ProForm
      grid
      layout='vertical'
      formRef={formRef}
      submitter={submitterRender()}
    >
      <ProCard
        // title='保單資訊'
        title={
          <Space wrap align="center">
            <Segmented
              value={poEdit}
              options={editOption}
              onChange={(value)=>{
                setPoEdit(value)
                message.info('按了'+value)
              }}
              size='large'
              shape="round"
            />
            <Typography.Title level={4}>保單資訊</Typography.Title>
          </Space>
        }
        type='inner'
        size='small'
        headerBordered      // 有 分隔線
        collapsible         // 有 摺疊
        defaultCollapsed    // 預設 折疊
        extra={
          <Typography.Text>extra</Typography.Text>
        }
      >
        <ConfigProvider componentDisabled={poEdit !== 'edit'}>
          <MliFormRow>
            <ProFormText
              name='policyNo'
              label='保單號碼'
            />
            <ProFormText
              name='poStsCode'
              label='保單狀態'
            />
          </MliFormRow>
        </ConfigProvider>
      </ProCard>
    </ProForm>
  )
}

export default InsurancePolicyCard
