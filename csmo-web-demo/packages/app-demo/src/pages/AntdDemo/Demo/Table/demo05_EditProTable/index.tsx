import React from 'react'
import ShowEdit from './ShowEdit'
import ModelEdit from './ModelEdit'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { PageContainer, ProForm } from '@ant-design/pro-components'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //主頁主要設定處
  const tabs = [
    {
      key: 'ShowEdit',
      title: '下方顯示編輯(ShowEdit)',
      component: <ShowEdit />
    },
    {
      key: 'ModelEdit',
      title: '浮層表單編輯(ModelEdit)',
      component: <ModelEdit />
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
          animated    // 啟用切換動畫
          destroyOnHidden   // 隱藏時銷毀 DOM
        >
          {tabs.map((item) => (
            <TabPane tab={item.title} key={item.key}>
              {item.component}
            </TabPane>
          ))}
        </Tabs>
      </ProForm>
    </PageContainer >
  )
}

export default AsstManagement
