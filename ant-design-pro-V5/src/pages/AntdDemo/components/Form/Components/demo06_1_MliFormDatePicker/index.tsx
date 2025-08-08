/**
 * 日期 要使用 MliFormDatePicker 的 相關元件 才能顯示民國年
 * 1. 需要設定 國際化文件，F12 才不會報錯 (label 也必須透過 國際化文件 取得)
 * 2. 國際化文件設定規則
 *    moduleName.columns.columnName: 'label顯示的名稱'
 */

import React, { useRef } from 'react'
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, message } from 'antd'
import { MliFormDatePicker, MliFormDateRangePicker, MliFormRow } from '@/common'

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
                  console.info('formRef', formRef.current?.getFieldsValue())
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
      <h1>MliFormDatePicker</h1>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <MliFormDatePicker
            name='chkDate'
            moduleName='mliFormDate'
            columnName='chkDate'
            // label='選擇日期'
            placeholder='請選擇日期'
            rules={[
              { required: true, message: '日期為必填項' }
            ]}
          />
          <MliFormDatePicker
            name='chkDateYYMM'
            moduleName='mliFormDate'
            columnName='chkDateYYMM'
            // label='選擇月份'
            placeholder='請選擇月份'
            rules={[
              { required: true, message: '日期為必填項' }
            ]}
            fieldProps={{
              picker: 'month'
            }}
          />
          <MliFormDateRangePicker
            name='chkDateRange'
            moduleName='mliFormDate'
            columnName='chkDateRange'
            // label='選擇日期區間'
            rules={[
              { required: true, message: '日期為必填項' }
            ]}
          />
        </MliFormRow>
      </ProForm>
    </>
  )
}
export default MyForm
