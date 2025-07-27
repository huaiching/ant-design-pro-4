import React from 'react'
import Demo01 from './Components/demo01_ModalForm'
import Demo02 from './Components/demo02_DrawerForm'
import Demo03 from './Components/demo03_StepsForm'
import { PageContainer } from '@ant-design/pro-components'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //主功能9000代碼
  const pageTitle = '表單容器(Container)'

  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: '浮層表單(彈窗式)(ModalForm)',
      component: <Demo01/>
    },
    {
      authCode: '2',
      title: '浮層表單(抽屜式)(DrawerForm)',
      component: <Demo02/>
    },
    {
      authCode: '3',
      title: '分布表單(StepsForm)',
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
  );
}

export default AsstManagement
