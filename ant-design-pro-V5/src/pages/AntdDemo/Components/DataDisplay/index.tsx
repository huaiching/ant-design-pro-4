import React, { useEffect } from 'react'
import Demo01 from './Components/demo01_List'
import Demo02 from './Components/demo02_Descriptions'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { useNavigate, useSearchParams } from '@umijs/max'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  //主頁主要設定處
  const tabs = [
    {
      key: 'List',
      title: '列表(List)',
      component: <Demo01 />
    },
    {
      key: 'Descriptions',
      title: '描述列表(Descriptions)',
      component: <Demo02 />
    }
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
      // animated    // 啟用切換動畫
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

export default AsstManagement
