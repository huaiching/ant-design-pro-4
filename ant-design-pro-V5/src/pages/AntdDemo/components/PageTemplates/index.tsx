import React from 'react'
import Demo01 from './Components/demo01_TabbedFormPage'
import Demo02 from './Components/demo02_Worklist'
import Demo03 from './Components/demo03_ChangeForm'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //主功能9000代碼
  const pageTitle = '頁面樣板(PageTemplates)'

  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: '樣板 1(TabbedFormPage)',
      component: <Demo01/>
    },
    {
      authCode: '2',
      title: '樣板 2(Worklist)',
      component: <Demo02/>
    },
    {
      authCode: '3',
      title: '樣板 3(ChangeForm)',
      component: <Demo03/>
    },
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
