import React, { useEffect } from 'react'
import Demo01 from './Components/demo01_ModalForm'
import Demo02 from './Components/demo02_DrawerForm'
import Demo03 from './Components/demo03_StepsForm'
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
      key: 'ModalForm',
      title: '浮層表單(彈窗式)(ModalForm)',
      component: <Demo01 />
    },
    {
      key: 'DrawerForm',
      title: '浮層表單(抽屜式)(DrawerForm)',
      component: <Demo02 />
    },
    {
      key: 'StepsForm',
      title: '分布表單(StepsForm)',
      component: <Demo03 />
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
