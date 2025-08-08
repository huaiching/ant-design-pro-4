import MliFormRow from '@/common/components/form/MliFormRow'
import ProCard from '@ant-design/pro-card'
import { ProFormText } from '@ant-design/pro-form'
import React from 'react'

const Step1: React.FC = (formRef) => {
  return (
    <ProCard title='客戶基本資料'>
      <MliFormRow>
        <ProFormText
          name='clientId'
          label='身份證字號'
          rules={[
            {
              required: true,
              message: '必填項',
            },
          ]}
        />
        <ProFormText
          name='name'
          label='姓名'
          rules={[
            {
              required: true,
              message: '必填項',
            },
          ]}
        />
      </MliFormRow>
    </ProCard>
  )
}

export default Step1
