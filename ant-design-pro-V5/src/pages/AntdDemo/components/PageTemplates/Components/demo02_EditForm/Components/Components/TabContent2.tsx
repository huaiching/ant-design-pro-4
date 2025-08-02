import React from 'react'
import { ProFormText, ProFormInstance } from '@ant-design/pro-components'
import { observer } from 'mobx-react'
import formRefStore from '../../Mobx/formRefStore'

const TabContent2: React.FC = () => {
  // const formRef = formRefStore.getFormRef

  return (
    <>
          <ProFormText
            name={['tab2', 'addrss']}
            label='地址'
            rules={[{ required: true }]} />
          <ProFormText
            name={['tab2', 'phone']}
            label='電話'
            rules={[{ required: true }]} />
      <div style={{ height: '1000px' }}>長內容區域...</div>
    </>
  )
}

export default observer(TabContent2)
