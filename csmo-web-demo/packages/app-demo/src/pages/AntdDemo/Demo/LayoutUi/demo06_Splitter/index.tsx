import React from 'react'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import Demo01 from './Components/01_horizontal'
import Demo02 from './Components/02_vertical'
import Demo03 from './Components/03_nesting'
import { PageContainer, ProForm } from '@ant-design/pro-components'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {

  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: '橫向分割線(Horizontal Splitter)',
      component: <Demo01 />
    },
    {
      authCode: '2',
      title: '縱向分割線(Vertical Splitter)',
      component: <Demo02 />
    },
    {
      authCode: '3',
      title: '嵌套分割線(Nesting Splitter)',
      component: <Demo03 />
    }
  ]

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm submitter={false} layout="vertical">
        <Tabs
          type='card'
          tabPosition='left'
          animated    // 啟用切換動畫
          destroyOnHidden   // 隱藏時銷毀 DOM
        >
          {tabs.map((item) => (
            <TabPane tab={item.title} key={item.authCode}>
              {item.component}
            </TabPane>
          ))}
        </Tabs>
      </ProForm>
    </PageContainer >
  )
}

export default AsstManagement
