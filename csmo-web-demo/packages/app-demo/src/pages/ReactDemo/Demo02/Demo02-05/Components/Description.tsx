import React from 'react'
import ArrayIntro from './Components/ArrayIntro'
import ArrayMapForEach from './Components/ArrayMapForEach'
import ArrayMutation from './Components/ArrayMutation'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const Demo: React.FC = () => {

  //主頁主要設定處
  const tabs = [
    {
      key: 'ArrayIntro',
      title: '陣列',
      component: <ArrayIntro />
    },
    {
      key: 'ArrayMapForEach',
      title: '陣列 - map 與 foreach',
      component: <ArrayMapForEach />
    },
    {
      key: 'ArrayMutation',
      title: '陣列 - 數值修改',
      component: <ArrayMutation />
    },
  ]

  return (
    <Tabs
      type='card'
      animated    // 啟用切換動畫
      destroyOnHidden   // 隱藏時銷毀 DOM
    >
      {tabs.map((item) => (
        <TabPane tab={item.title} key={item.key}>
          {item.component}
        </TabPane>
      ))}
    </Tabs>
  )
}

export default Demo
