
import React, { useRef } from 'react'
import ProForm, { ProFormInstance, ProFormTimePicker } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, message } from 'antd'
import { MliFormRow } from '@mli-csmo/base'

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

  return (
    <>
      <h1>ProFormTimePicker</h1>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormTimePicker
            name='time'
            label='選擇時間'
            placeholder='請選擇時間'
            rules={[
              { required: true, message: '時間為必填項' }
            ]}
            fieldProps={{
              format: 'HH時mm分ss秒'
            }}
          />
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
