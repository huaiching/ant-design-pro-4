import React from 'react'
import Demo01 from './Components/demo01_Navigate'
import Demo02 from './Components/demo02_SearchReceiveNo'
import Demo03 from './Components/demo03_xlsx'
import { PageContainer } from '@ant-design/pro-components'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //主功能9000代碼
  const pageTitle = '工具類與整合範例(Utility)'

  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: '頁面跳轉(Navigate)',
      component: <Demo01/>
    },
    {
      authCode: '2',
      title: '受理號碼查詢(SearchReceiveNo)',
      component: <Demo02/>
    },
    {
      authCode: '3',
      title: 'xlsx 前端excel的匯入匯出',
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
