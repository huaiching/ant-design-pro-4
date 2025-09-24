import { PageContainer } from '@ant-design/pro-components'
import { useState } from 'react'
import DateInfo from './DateInfo'
import DateFunction from './DateFunction'
import DateView from './DateView'

const MliDateTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('info')

  return (
    <PageContainer
      tabList={[
        {
          tab: '說明',
          key: 'info'
        },
        {
          tab: '日期函數',
          key: 'function'
        },
        {
          tab: '日期欄位',
          key: 'view'
        }
      ]}
      tabActiveKey={activeTab}
      onTabChange={key => setActiveTab(key)}
    >
      {activeTab === 'info' && <DateInfo />}
      {activeTab === 'function' && <DateFunction />}
      {activeTab === 'view' && <DateView />}
    </PageContainer>
  )
}

export default MliDateTable