import React from 'react'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { PageContainer } from '@ant-design/pro-components'
import Main from './Main'
import Mobx from './Mobx'
import Sub from './Sub'

//asstManagement 主功能名稱
const Demo: React.FC = () => {

  //主頁主要設定處
  const tabs = [
    {
      key: 'Main',
      title: '主頁面',
      component: <Main />
    },
    {
      key: 'Mobx',
      title: 'Mobx',
      component: <Mobx />
    },
    {
      key: 'Sub',
      title: '子頁面',
      component: <Sub />
    },
  ]

  return (
    <PageContainer 
      header={{
        title: false,
        ghost: true
      }}
    >
      <Tabs
        type='card'
        destroyOnHidden   // 隱藏時銷毀 DOM
      >
        {tabs.map((item) => (
          <TabPane tab={item.title} key={item.key}>
            {item.component}
          </TabPane>
        ))}
      </Tabs>
    </PageContainer>
  )
}

export default Demo
