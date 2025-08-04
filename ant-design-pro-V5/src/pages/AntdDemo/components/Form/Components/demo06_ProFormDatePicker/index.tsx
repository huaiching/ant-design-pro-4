import React, { useEffect, useRef } from 'react'
import ProForm, { ProFormDatePicker, ProFormDateRangePicker, ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, message } from 'antd'
import MliFormRow from '@/common/components/form/MliFormRow'

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
                formRef.current?.validateFields().then(values => {
                  // 確認按鈕 點擊後 要進行的 API 操作
                  console.log('formRef', formRef.current?.getFieldsValue())
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
              { required: true, message: '日期為必填項' },
            ]}
            fieldProps={{
              format: 'TTT/MM/DD',
              inputReadOnly: false
            }}
          />
          <ProFormDatePicker.Month
            name='chkDateYYMM'
            label='選擇月份'
            placeholder='請選擇月份'
            rules={[
              { required: true, message: '日期為必填項' },
            ]}
            fieldProps={{
              format: 'TTT/MM',
            }}
          />
          <ProFormDateRangePicker
            name='chkDateRange'
            label='選擇日期區間'
            rules={[
              { required: true, message: '日期為必填項' },
            ]}
            fieldProps={{
              format: 'TTT/MM/DD',
            }}
          />
        </MliFormRow>
      </ProForm>
    </>
  )
}
export default MyForm
