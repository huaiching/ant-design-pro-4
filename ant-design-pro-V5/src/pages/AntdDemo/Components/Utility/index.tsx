import React, { useEffect } from 'react'
import Demo01 from './Components/demo01_Navigate'
import Demo02 from './Components/demo02_SearchReceiveNo'
import Demo03 from './Components/demo03_xlsx'
import Demo04 from './Components/demo04_EditGuard'
import Demo05 from './Components/demo05_DistributeToData'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { useNavigate, useSearchParams } from '@umijs/max'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()


  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      key: 'Navigate',
      title: '頁面跳轉(Navigate)',
      component: <Demo01 />
    },
    {
      key: 'SearchReceiveNo',
      title: '受理號碼查詢(SearchReceiveNo)',
      component: <Demo02 />
    },
    {
      key: 'xlsx',
      title: 'xlsx 前端excel的匯入匯出',
      component: <Demo03 />
    },
    {
      key: 'EditGuard',
      title: '編輯保護模式(EditGuard)',
      component: <Demo04 />
    },
    {
      key: 'DistributeToData',
      title: '平均分配(DistributeToData)',
      component: <Demo05 />
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

export default AsstManagement
