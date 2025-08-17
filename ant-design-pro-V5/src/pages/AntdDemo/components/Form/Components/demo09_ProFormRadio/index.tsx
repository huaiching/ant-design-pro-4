
import React, { useRef } from 'react'
import ProForm, { ProFormInstance, ProFormRadio } from '@ant-design/pro-form'
import { MliFormRow } from '@mli-csmo/base'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

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
            name='gender'
            label='選擇性別'
            // 選項清單: label=顯示文字, value=值
            options={[
              { label: '男性', value: 'male' },
              { label: '女性', value: 'female' }
            ]}
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
            options={[
              { label: '啟用', value: 'enabled' },
              { label: '停用', value: 'disabled' }
            ]}
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
