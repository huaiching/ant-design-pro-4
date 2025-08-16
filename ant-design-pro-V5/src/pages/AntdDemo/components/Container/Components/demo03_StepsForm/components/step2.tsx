import { MliFormRow } from '@mli-csmo/base'
import ProCard from '@ant-design/pro-card'
import { ProFormText } from '@ant-design/pro-form'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Step2: React.FC = (formRef) => {
  return (
    <ProCard title='客戶住址'>
      <MliFormRow>
        <ProFormText
          name='address'
          label='聯絡地址'
          rules={[
            {
              required: true,
              message: '必填項'
            }
          ]}
        />
      </MliFormRow>
    </ProCard>
  )
}

export default Step2
