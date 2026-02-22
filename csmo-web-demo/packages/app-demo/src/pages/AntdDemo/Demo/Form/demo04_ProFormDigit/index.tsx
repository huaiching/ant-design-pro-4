import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormDigit, ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Button, Input, InputNumber, message, Select, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { log } from 'console'
import { debounce } from 'lodash'
import { currencyProps, currencySelectProps, separatorProps } from '@/utils/FieldUtil/DigitUtil'

// 模擬數據
let data = {}

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [currency, setCurrency] = useState('TWD')

  useEffect(() => {
    // 預設帶入表單資料
    formRef.current?.setFieldsValue({
      ...data,
    })
  }, [])

  useEffect(() => {
    formRef.current?.setFieldValue('currency', currency)
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
                log('表單數據', data)
                formRef.current?.validateFields().then(() => {
                  message.success('表單提交成功！')
                })
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

  // 表單值變更處理，使用 debounce 限制觸發頻率
  const handleValueChange = debounce(() => {
    // 取得表單變更資料
    const values = formRef.current?.getFieldsValue()
    data = {
      ...values
    }
  }, 300)

  const selectBefore = (
    <Select defaultValue='TWD' onChange={setCurrency}>
      <Select.Option value='TWD'> 新台幣 </Select.Option>
      <Select.Option value='USD'> 美元 </Select.Option>
    </Select>
  )

  return (
    <PageContainer>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
        onValuesChange={handleValueChange}
      >
        <MliFormRow>
          <ProFormDigit
            name='faceAmt'
            label='保額'
            placeholder='保額'
            colSize={1}
            fieldProps={{
              max: 1000000,
              min: 0,
              ...separatorProps,      // 千分位格式化
              ...currencyProps(currency),  // 幣別精度設定
              ...currencySelectProps(currency, setCurrency),  // 幣別選擇器
            }}
            rules={[
              { required: true, message: '必填' }
            ]}
          />
          <ProFormDigit
            name='amt'
            label='工本費'
            tooltip='這是收據的工本費'
            placeholder='請輸入工本費'
            colSize={1}
            fieldProps={{
              max: 1000,
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
            <ProForm.Item label="比例" required>
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
    </PageContainer>
  )
}

export default MyForm
