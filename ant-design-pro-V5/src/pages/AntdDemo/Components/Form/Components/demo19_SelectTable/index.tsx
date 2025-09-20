import React, { useState } from 'react'
import { Button, message, Typography } from 'antd'
import { FooterToolbar } from '@ant-design/pro-components'
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

const InputPreviewProTable: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{ code: string; text: string }[]>([])

  return (
    <>
      <Typography.Title level={3}>此為自製元件</Typography.Title>
      <SymptomInputPreview
        label='症狀'
        name='symptom'
        column={column}
        optionsData={optionsData}
        onChange={(data: any) => setSelectedOptions(data)}
      />

      <FooterToolbar>
        <Button
          type="primary"
          onClick={() => {
            console.info('送出的資料', selectedOptions)
            message.success('表單提交成功！')
          }}
        >
          確認
        </Button>
        <Button
          onClick={() => {
            message.warning('取消作業')
          }}
        >
          取消
        </Button>
      </FooterToolbar>
    </>
  )
}

export default InputPreviewProTable
