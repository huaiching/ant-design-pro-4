import React, { useRef } from 'react'
import ProForm, { ProFormDatePicker, ProFormDateRangePicker, ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, List, message, Typography } from 'antd'
import { MliFormRow } from '@mli-csmo/base'
import { log } from 'console'
import { parseRocDate, parseRocDateMonth } from '@/utils/rocDateUtils'

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
                // 日期格式化
                const date = parseRocDate(e.target?.value)
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
              format: 'TTT/MM',
              onBlur: (e: any) => {
                // 日期格式化
                const date = parseRocDateMonth(e.target?.value)
                // 更新資料
                formRef.current?.setFieldsValue({
                  chkDateYYMM: date
                })
              }
            }}
          />
          <ProFormDateRangePicker
            name='chkDateRange'
            label='選擇日期區間'
            rules={[
              { required: true, message: '日期為必填項' }
            ]}
            fieldProps={{
              format: 'TTT/MM/DD',
              onBlur: (e: any) => {
                const root = e.target?.closest('.ant-picker-range')
                if (!root) return

                // 抓兩個 input 的原始字串
                const inputs = root.querySelectorAll('input')
                const startRaw = inputs?.[0]?.value ?? ''
                const endRaw = inputs?.[1]?.value ?? ''

                // 日期格式化
                const start = parseRocDate(startRaw)
                const end = parseRocDate(endRaw)

                // 回寫到表單
                formRef.current?.setFieldsValue({
                  chkDateRange: [start, end]
                })
              }
            }}
          />
        </MliFormRow>
        <List
          size='small'
          dataSource={[
            '1. Date: 日期格式 fieldProps.format 設定為 \'TTT/MM/DD\' (民國年)。',
            '2. 前端日期資料 (string) 要轉換為 dayjs 物件時，請使用 dayjs(XXX, \'TTT/MM/DD\') 進行格式轉換。',
            '3. 導出數據時，要使用 dayjs(XXX).format(\'TTT/MM/DD\') 來將 日期 轉換為 string',
          ]}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </ProForm>
    </>
  )
}
export default MyForm
