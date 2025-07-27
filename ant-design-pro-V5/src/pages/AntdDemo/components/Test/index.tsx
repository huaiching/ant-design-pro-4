import React from 'react'
import Demo01 from './Components/Gpt'
import Demo02 from './Components/DP'
import Demo03 from './Components/Grok'
import { PageContainer } from '@ant-design/pro-components'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //主功能9000代碼
  const pageTitle = '測試用(Test)'

  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: 'Gpt',
      component: <Demo01/>
    },
    {
      authCode: '2',
      title: 'DP',
      component: <Demo02/>
    },
    {
      authCode: '3',
      title: 'Grok',
      component: <Demo03/>
    },
  ]
  
  return (
    <Tabs type='card'>
      {tabs.map((item) => (
        <TabPane tab={item.title} key={item.authCode}>
          {item.component}
        </TabPane>
      ))}
    </Tabs>
)
}

export default AsstManagement
