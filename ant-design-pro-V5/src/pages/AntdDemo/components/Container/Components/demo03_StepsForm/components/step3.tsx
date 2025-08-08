import ProCard from '@ant-design/pro-card'
import { ProFormText } from '@ant-design/pro-form'
import { MliFormRow } from '@/common'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Step1: React.FC = (formRef) => {
  return (
    <ProCard title='客戶電話'>
      <MliFormRow>
        <ProFormText
          name='phone'
          label='連絡電話'
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

export default Step1
