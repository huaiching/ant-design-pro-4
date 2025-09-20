import React, { useRef, useState } from 'react'
import { Button, message, Typography } from 'antd'
import { FooterToolbar, ProForm, ProFormInstance } from '@ant-design/pro-components'
import SymptomInputPreview from './Components/SymptomInputPreview'

const optionsData = [
  { code: 'A01', text: '頭暈' },
  { code: 'B02', text: '咳嗽' },
  { code: 'C03', text: '喉嚨痛' },
  { code: 'D04', text: '發燒' },
  { code: 'E05', text: '流鼻水' }
]

const column = [
  { title: '代碼', dataIndex: 'code', valueType: 'text' },
  { title: '文字', dataIndex: 'text', valueType: 'text' },
]

const SelectTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type='primary'
            onClick={async () => {
              formRef.current?.validateFields().then((values) => {
                console.info(formRef.current?.getFieldsValue())
                message.success(`表單提交成功！${JSON.stringify(values)}`)
              })
            }}
            key='save'
          >
            確認
          </Button>
          <Button
            onClick={async () => {
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
      <Typography.Title level={3}>此為自製元件</Typography.Title>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <SymptomInputPreview
          label='症狀'
          name='symptom'
          formRef={formRef}
          column={column}
          optionsData={optionsData}
          colSize={2}
        />
      </ProForm>
    </>
  )
}

export default SelectTable
