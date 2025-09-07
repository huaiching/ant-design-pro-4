
import React, { useRef } from 'react'
import ProForm, { ProFormInstance, ProFormRadio } from '@ant-design/pro-form'
import { MliFormRow } from '@mli-csmo/base'
import { Input } from 'antd'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const sex = formRef.current?.getFieldValue('sex')

  const sexOption = [
    { value: 'male', label: '男性' },
    { value: 'female', label: '女性' }
  ]

  const statusOption = [
    { label: '分析', value: 'analysis' },
    { label: '開發', value: 'development' },
    { label: '測試', value: 'testing' },
    { label: '上線', value: 'production' }
  ]

  return (
    <>
      <h1>ProFormRadio.Group</h1>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={false}
      >
        <MliFormRow>
          <ProFormRadio.Group
            name='sex'
            label='選擇性別'
            // 選項清單: label=顯示文字, value=值
            options={sexOption}
            rules={[
              { required: true, message: '請選擇性別' }
            ]}
            fieldProps={{
              defaultValue: 'male'   // 預設值

            }}
          />
          <ProFormRadio.Group
            name='status'
            label='狀態'
            options={statusOption}
            rules={[
              { required: true, message: '請選擇狀態' }
            ]}
            fieldProps={{
              defaultValue: 'disabled', // 預設值
              optionType: 'button',     // 使用 按鈕樣式
              buttonStyle: 'solid'      // 按鈕樣式 選中為 實心
            }}
          />
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
