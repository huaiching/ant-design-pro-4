import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormDigit, ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, Input, InputNumber, message, Select, Space, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [currency, setCurrency] = useState('TWD')

  useEffect(() => {
    formRef.current?.setFieldValue('currency',currency)
  }, [currency])

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
                console.info(formRef.current?.getFieldValue('currency'))
                console.info(formRef.current?.getFieldsValue())
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
    <Select defaultValue='TWD' onChange={setCurrency}>
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
            colSize={1}
            fieldProps={{
              max: 100,
              min: 0,
              step: currency === 'TWD' ? 1 : 0.01,      // 每次改變的數值
              precision: currency === 'TWD' ? 0 : 2,    // 數值經度
              addonBefore: selectBefore,    // 前置標籤
              prefix: '$',                  // 前置文字
              suffix: '元',                  // 後置文字
              addonAfter: '整'               // 後置標籤
            }}
            rules={[
              { required: true, message: '必填' }
            ]}
          />

          <MliFormCol colSize={1}>
            <ProForm.Item label="比例" style={{ marginBottom: 0 }}>
              <Space.Compact>
                <ProForm.Item
                  name="numerator"
                  noStyle
                  rules={[{ required: true, message: '請輸入分子' }]}
                >
                  <InputNumber placeholder="分子" />
                </ProForm.Item>
                <Input
                  readOnly
                  value="/"
                  style={{ width: 30 }}
                />
                <ProForm.Item
                  name="denominator"
                  noStyle
                  rules={[{ required: true, message: '請輸入分母' }]}
                >
                  <InputNumber placeholder="分母" />
                </ProForm.Item>
              </Space.Compact>
            </ProForm.Item>
          </MliFormCol>
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
