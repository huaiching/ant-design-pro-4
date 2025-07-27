import React from 'react'
import Demo01 from './Components/demo01_List'
import Demo02 from './Components/demo02_Descriptions'
import { PageContainer } from '@ant-design/pro-components'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //主功能9000代碼
  const pageTitle = '資料顯示元件(DataDisplay)'

  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: '列表(List)',
      component: <Demo01/>
    },
    {
      authCode: '2',
      title: '描述列表(Descriptions)',
      component: <Demo02/>
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
