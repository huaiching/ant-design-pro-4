import React, { useEffect, useState } from 'react'
import Demo01 from './Components/demo01_ProCard'
import Demo02 from './Components/demo02_Notification'
import Demo03 from './Components/demo03_Modal'
import Demo04 from './Components/demo04_PageContainer'
import Demo05 from './Components/demo05_BackTop'
import Demo06 from './Components/demo06_Splitter'
import Demo07 from './Components/demo07_Space'
import Demo08 from './Components/demo08_Flex'
import Demo09 from './Components/demo09_ConfigProvider'
import Demo10 from './Components/demo10_PopoverImage'
import { Splitter, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { useNavigate, useSearchParams } from '@umijs/max'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  //主頁主要設定處
  const tabs = [
    {
      key: 'ProCard',
      title: '卡片(ProCard)',
      component: <Demo01 />
    },
    {
      key: 'Notification',
      title: '通知提醒框(Notification)',
      component: <Demo02 />
    },
    {
      key: 'Modal',
      title: '對話框(Modal)',
      component: <Demo03 />
    },
    {
      key: 'PageContainer',
      title: '頁面容器 與 下拉選單(PageContainer)',
      component: <Demo04 />
    },
    {
      key: 'BackTop',
      title: '返回頂部(BackTop)',
      component: <Demo05 />
    },
    {
      key: 'Splitter',
      title: '分割線(Splitter)',
      component: <Demo06 />
    },
    {
      key: 'Space',
      title: '間距(Space)',
      component: <Demo07 />
    },
    {
      key: 'Flex',
      title: '彈性布局(Flex)',
      component: <Demo08 />
    },
    {
      key: 'ConfigProvider',
      title: '全局布局(ConfigProvider)',
      component: <Demo09 />
    },
    {
      key: 'PopoverImage',
      title: '氣泡框與圖片顯示(PopoverImage)',
      component: <Demo10 />
    }
  ]
  
    // 取得當前 activeKey，若沒有就預設為第一個 tab 的 key
    const currentActiveKey = searchParams.get('activeKey') || tabs[0].key
  
    // 目前的 tab 標籤
    const [activeTab, setActiveTab] = useState('ProCard')
  
    // 首次載入頁面 key 值加載
    useEffect(() => {
      setActiveTab(currentActiveKey)
      navigate({
        search: `?activeKey=${currentActiveKey}`
      })
    }, [])
  
    // 目前的 tab 頁面
    const component = tabs.find((tab) => tab.key === activeTab)?.component
  
    return (
      <Splitter
        layout="horizontal"   // 水平分割 (左右分隔)
        style={{
          minHeight: '100vh',
          height: 'auto'
        }}
      >
        {/* 頁簽 */}
        <Splitter.Panel
          defaultSize={300}   // 預設寬度
          collapsible={{ start: true, end: true }}
        >
          <Tabs
            type='card'
            tabPosition='left'
            animated    // 啟用切換動畫
            destroyOnHidden   // 隱藏時銷毀 DOM
            activeKey={currentActiveKey}
            onChange={(key: string) => {
              setActiveTab(key)
              navigate({
                search: `?activeKey=${key}`
              })
            }}
          >
            {tabs.map((item) => (
              <TabPane tab={item.title} key={item.key} />
            ))}
          </Tabs>
        </Splitter.Panel>
  
        {/* 內容 */}
        <Splitter.Panel style={{ paddingLeft: 20, paddingRight: 10 }}>
          {component}
        </Splitter.Panel>
      </Splitter>
    )
  }
  
  export default AsstManagement
  