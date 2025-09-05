import { MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormDigit, ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, message, Select, Typography } from 'antd'
import React, { useRef } from 'react'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

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

  const selectBefore = (
    <Select defaultValue='TWD'>
      <Select.Option value='TWD'> 新台幣 </Select.Option>
      <Select.Option value='USD'> 美元 </Select.Option>
    </Select>
  )

  return (
    <>
      <Typography.Title level={3}>ProFormDigit</Typography.Title>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormDigit
            name='amt'
            label='工本費'
            tooltip='這是收據的工本費'
            placeholder='請輸入工本費'
            fieldProps={{
              max: 100,
              min: 0,
              step: 0.01,
              precision: 2,
              addonBefore: selectBefore,
              addonAfter: '元'
            }}
            rules={[
              {
                  required: true,
                  message: '必填'
              },
              {
                whitespace: true
              }
            ]}
          />
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
