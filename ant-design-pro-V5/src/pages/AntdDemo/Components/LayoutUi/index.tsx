import React from 'react'
import Demo01 from './Components/demo01_ProCard'
import Demo02 from './Components/demo02_Notification'
import Demo03 from './Components/demo03_Modal'
import Demo04 from './Components/demo04_PageContainer'
import Demo05 from './Components/demo05_BackTop'
import Demo06 from './Components/demo06_Splitter'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {

  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: '卡片(ProCard)',
      component: <Demo01/>
    },
    {
      authCode: '2',
      title: '通知提醒框(Notification)',
      component: <Demo02/>
    },
    {
      authCode: '3',
      title: '對話框(Modal)',
      component: <Demo03/>
    },
    {
      authCode: '4',
      title: '頁面容器 與 下拉選單(PageContainer)',
      component: <Demo04/>
      },
      {
        authCode: '5',
        title: '返回頂部(BackTop)',
        component: <Demo05/>
    },
    {
      authCode: '6',
      title: '分割線(Splitter)',
      component: <Demo06/>
    }
  ]

  return (
      <Tabs
        type='card'
        // animated    // 啟用切換動畫
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
