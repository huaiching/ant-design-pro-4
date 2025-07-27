import React from 'react'
import { ProFormText, ProFormInstance } from '@ant-design/pro-components'

interface Props {
  formRef: React.RefObject<ProFormInstance | undefined>
}

const TabContent2: React.FC<Props> = ({ formRef }) => {
  return (
    <>
      <ProFormText name='tab2.address' label='地址' rules={[{ required: true }]} />
      <ProFormText name='tab2.phone' label='電話' rules={[{ required: true }]} />
      <div style={{ height: '1000px' }}>長內容區域...</div>
    </>
  )
}

export default TabContent2
