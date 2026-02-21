import React, { useEffect } from 'react'
import Description from './Description'
import ExampleRender from './ExampleRender'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { useNavigate, useSearchParams } from '@umijs/max'
import ExampleDataSource from './ExampleDataSource'

//asstManagement 主功能名稱
const Demo: React.FC = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  //主頁主要設定處
  const tabs = [
    {
      key: 'Description',
      title: '說明',
      component: <Description />
    },
    {
      key: 'ExampleRender',
      title: '範例 (render)',
      component: <ExampleRender />
    },
    {
      key: 'ExampleDataSource',
      title: '範例 (dataSource)',
      component: <ExampleDataSource />
    },
  ]

  // 取得當前 activeKey，若沒有就預設為第一個 tab 的 key
  const currentActiveKey = searchParams.get('activeKey') || tabs[0].key

  // 首次載入頁面 key 值加載
  useEffect(() => {
    navigate({
      search: `?activeKey=${currentActiveKey}`
    })
  }, [])

  return (
    <Tabs
      type='card'
      animated    // 啟用切換動畫
      destroyOnHidden   // 隱藏時銷毀 DOM
      activeKey={currentActiveKey}
      onChange={(key: string) => {
        navigate({
          search: `?activeKey=${key}`
        })
      }}
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
