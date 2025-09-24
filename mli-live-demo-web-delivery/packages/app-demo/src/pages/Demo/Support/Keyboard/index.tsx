import { PageContainer } from '@ant-design/pro-components'
import { useState } from 'react'
import KeyboardOperationInfomation from './Information'
import Operation from './Operation'

const KeyboardOperation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('info')

  return (
    <PageContainer
      tabList={[
        {
          tab: '說明',
          key: 'info'
        },
        {
          tab: '操作示範',
          key: 'op'
        }
      ]}
      tabActiveKey={activeTab}
      onTabChange={key => setActiveTab(key)}
    >
      {activeTab === 'info' && <KeyboardOperationInfomation />}
      {activeTab === 'op' && <Operation />}
    </PageContainer>
  )
}

export default KeyboardOperation