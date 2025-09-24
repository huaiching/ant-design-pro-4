import { PageContainer } from "@ant-design/pro-components"
import { useState } from "react"
import EditGuardInfo from "./EditGuardInfo"
import EditGuardOperation from "./EditGuardOperation"

const EditGuard: React.FC = () => {
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
      onTabChange={key => setActiveTab(key)}
    >
      {activeTab === 'info' && <EditGuardInfo />}
      {activeTab === 'demo' && <EditGuardOperation />}
    </PageContainer>
  )
}

export default EditGuard