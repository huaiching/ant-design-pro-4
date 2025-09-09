import React from 'react'
import Demo01 from './Components/demo01_Navigate'
import Demo02 from './Components/demo02_SearchReceiveNo'
import Demo03 from './Components/demo03_xlsx'
import Demo04 from './Components/demo04_editGuard'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {

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
    {
      authCode: '4',
      title: '編輯保護模式(editGuard)',
      component: <Demo04/>
    }
  ]

  return (
    <Tabs
      type='card'
      animated    // 啟用切換動畫
      destroyOnHidden   // 隱藏時銷毀 DOM
    >
      {tabs.map((item) => (
        <TabPane tab={item.title} key={item.authCode}>
          {item.component}
        </TabPane>
      ))}
    </Tabs>
)
}

export default AsstManagement
