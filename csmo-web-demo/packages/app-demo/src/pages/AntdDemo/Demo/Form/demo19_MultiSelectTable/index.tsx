import { FooterToolbar, PageContainer, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import { Button, message } from 'antd'
import React, { useEffect, useRef } from 'react'
import MultiSelectTable from './Components/MultiSelectTable'
import MultiSelectEditTable from './Components/MultiSelectEditTable'
import { log } from 'console'
import { debounce } from 'lodash'

// 模擬數據
let data = {}

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


const columnEdit = [
  { title: '代碼', dataIndex: 'code', valueType: 'text', readonly: true },
  { title: '文字', dataIndex: 'text', valueType: 'text', readonly: true },
  {
    title: '處方', dataIndex: 'prescription', valueType: 'select', fieldProps: {
      options: [
        { label: 'A 吃藥', value: 'A' },
        { label: 'B 打針', value: 'B' },
        { label: 'C 住院', value: 'C' },
      ]
    },
    formItemProps: {
      rules: [{ required: true, message: '不可空白' }]
    },
  }
]

const SelectTable: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  useEffect(() => {
    // 預設帶入表單資料
    formRef.current?.setFieldsValue({
      ...data,
    })
  }, [])

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type="primary"
            onClick={async () => {
              log('表單數據', formRef.current?.getFieldsValue())
              formRef.current?.validateFields().then(() => {
                message.success('表單提交成功！')
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

  // 表單值變更處理，使用 debounce 限制觸發頻率
  const handleValueChange = debounce(() => {
    // 取得表單變更資料
    const values = formRef.current?.getFieldsValue()
    data = {
      ...values
    }
  }, 300)

  const validateMaxThree = async (value: any[]) => {
    if (value && value.length > 3) {
      return Promise.reject('最多只能選擇 3 筆資料')
    }
    return Promise.resolve()
  }

  return (
    <PageContainer>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={submitterRender()}
        onValuesChange={handleValueChange}
        style={{ width: '100%' }}
      >
        <MliFormRow gutter={8} style={{ width: '100%' }}>
          <MliFormCol colSize={4 / 3}>
            <MultiSelectTable
              label="無編輯表格"
              name="symptom1"
              formRef={formRef}
              column={column}
              optionsData={optionsData}
              required
              // buttonType
              validator={validateMaxThree}
              onChange={(value) => {
                message.info('資料筆數：' + value.length)
              }}
            />
          </MliFormCol>
          <MliFormCol colSize={2}>
            <MultiSelectEditTable
              label="有編輯表格"
              name="symptomEdit1"
              formRef={formRef}
              column={columnEdit}
              optionsData={optionsData}
              required
              // buttonType
              validator={validateMaxThree}
              onChange={(value) => {
                message.info('資料筆數：' + value.length)
              }}
            />
          </MliFormCol>
        </MliFormRow>
        <MliFormRow gutter={8} style={{ width: '100%' }}>
          <MliFormCol colSize={4 / 3}>
            <MultiSelectTable
              label="無編輯表格 (按鈕樣式)"
              name="symptom2"
              formRef={formRef}
              column={column}
              optionsData={optionsData}
              required
              buttonType
              validator={validateMaxThree}
              onChange={(value) => {
                message.info('資料筆數：' + value.length)
              }}
            />
          </MliFormCol>
          <MliFormCol colSize={2}>
            <MultiSelectEditTable
              label="有編輯表格 (按鈕樣式)"
              name="symptomEdit2"
              formRef={formRef}
              column={columnEdit}
              optionsData={optionsData}
              required
              buttonType
              validator={validateMaxThree}
              onChange={(value) => {
                message.info('資料筆數：' + value.length)
              }}
            />
          </MliFormCol>
        </MliFormRow>
      </ProForm>
    </PageContainer>
  )
}

export default SelectTable
