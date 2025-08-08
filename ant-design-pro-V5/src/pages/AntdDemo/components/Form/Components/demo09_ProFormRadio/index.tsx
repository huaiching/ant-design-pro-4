
import React, { useRef } from 'react'
import ProForm, { ProFormInstance, ProFormRadio } from '@ant-design/pro-form'
import { MliFormRow } from '@/common'

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
            options={[
              { label: '男性', value: 'male' },
              { label: '女性', value: 'female' }
            ]}
            rules={[
              { required: true, message: '請選擇性別' }
            ]}
            fieldProps={{
              defaultValue: 'male'

            }}
          />
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
