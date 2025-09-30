import { FooterToolbar, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import { Button, message, Typography } from 'antd'
import React, { useRef } from 'react'
import MultiSelectTable from './Components/MultiSelectTable'

const optionsData = [
  { code: 'A01', text: '頭暈' },
  { code: 'B02', text: '咳嗽' },
  { code: 'C03', text: '喉嚨痛' },
  { code: 'D04', text: '發燒' },
  { code: 'E05', text: '流鼻水' }
]

const column = [
  { title: '代碼', dataIndex: 'code', valueType: 'text' },
  { title: '文字', dataIndex: 'text', valueType: 'text' }
]

const SelectTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type="primary"
            onClick={async () => {
              formRef.current?.validateFields().then((values) => {
                console.info(formRef.current?.getFieldsValue())
              })
            }}
            key="save"
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

  const validateMaxThree = async (value: any[]) => {
    if (value && value.length > 3) {
      return '最多只能選擇 3 筆資料'
    }
    return null
  }

  return (
    <>
      <Typography.Title level={3}>此為自製元件</Typography.Title>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={submitterRender()}
        style={{ width: '100%' }}
      >
        <MliFormRow gutter={8} style={{ width: '100%' }}>
          <MliFormCol colSize={4 / 3}>
            <MultiSelectTable
              label="症狀"
              name="symptom"
              formRef={formRef}
              column={column}
              optionsData={optionsData}
              required
              validator={validateMaxThree}
              onChange={(value)=>{
                message.info('資料筆數：' + value.length)
              }}
            />
          </MliFormCol>
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default SelectTable
