import { PageContainer } from '@ant-design/pro-components'
import { useState } from 'react'
import Information from './Information'
import Operation from '../Keyboard/Operation'

const MouseOperation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('info')
  return (
    <PageContainer
      tabList={[
        {
          tab: '說明',
          key: 'info'
        },
        {
          tab: '示範',
          key: 'demo'
        }
      ]}
      tabActiveKey={activeTab}
      onTabChange={(key) => setActiveTab(key)}
    >
      {activeTab === 'info' && <Information />}
      {activeTab === 'demo' && <Operation />}
    </PageContainer>
  )
}

export default MouseOperation