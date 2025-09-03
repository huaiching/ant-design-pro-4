import React, { useRef } from 'react'
import ProForm, { ProFormDatePicker, ProFormDateRangePicker, ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, message, Typography } from 'antd'
import { MliFormRow } from '@mli-csmo/base'
import { log } from 'console'

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
                  log('formRef', formRef.current?.getFieldsValue())
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
      <h1>ProFormDatePicker</h1>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormDatePicker
            name='chkDate'
            label='選擇日期'
            placeholder='請選擇日期'
            rules={[
              { required: true, message: '日期為必填項' }
            ]}
            fieldProps={{
              format: 'TTT/MM/DD',
              inputReadOnly: false,
              onBlur: (e: any) => {
                // 只留下數字
                let value = e.target?.value.replace(/\D/g, '')
                // 規則轉換
                if (value.length < 6) return null
                if (value.length > 7) return null
                if (value.length === 6) value = '0' + value
                const dateStr = value.slice(0,3) + '/' + value.slice(3,5) + '/' + value.slice(5,7)
                // 轉換為 日期格式
                const date = dayjs(dateStr, 'TTT/MM/DD')
                // 非日期格式 回傳空白
                if (!date.isValid()) return null
                // 更新資料
                formRef.current?.setFieldsValue({
                  chkDate: date
                })
              }
            }}
          />
          <ProFormDatePicker.Month
            name='chkDateYYMM'
            label='選擇月份'
            placeholder='請選擇月份'
            rules={[
              { required: true, message: '日期為必填項' }
            ]}
            fieldProps={{
              format: 'TTT/MM'
            }}
          />
          <ProFormDateRangePicker
            name='chkDateRange'
            label='選擇日期區間'
            rules={[
              { required: true, message: '日期為必填項' }
            ]}
            fieldProps={{
              format: 'TTT/MM/DD'
            }}
          />
        </MliFormRow>
        <Typography.Text type='danger'>
          日期格式 fieldProps.format 設定為 'TTT/MM/DD' (民國年)。
        </Typography.Text>
      </ProForm>
    </>
  )
}
export default MyForm
