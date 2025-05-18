import React, { useEffect, useState, useMemo } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Tabs } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import TabPane from '@ant-design/pro-card/lib/components/TabPane'

// 共用模組
interface TabProps {
  pageCode: string
  pageDesc: string
  tabs: { key: string; title: string; component: React.ReactNode; authCode: string; disabled?: boolean }[]
}
/**
 * 程式 Index 頁面的基本模組
 * @param pageCode  頁面代碼
 * @param pageDesc  頁面中文
 * @param tabs  頁簽設定: authCode=序號 / key=代碼 / title=名稱 / component=分頁子模組
 * @returns
 */
const BaseMainIndex: React.FC<TabProps> = ({ pageCode, pageDesc, tabs }) => {
  const [pageTitle, setPageTitle] = useState('')
  const location = useLocation()
  const history = useHistory()
  const [programTitle, setProgramTitle] = useState<string>('')

  // 設定程式標題
  useEffect(() => {
    const title = `${pageDesc}(${pageCode})`
    setProgramTitle(title)
  }, [pageCode, pageDesc])

  // 設定 activeKey 及首次進入頁面的 activeKey 的值
  const activeKey = useMemo(
    () =>
      new URLSearchParams(location.search).get('activeKey') ??
      tabs.find((item) => item.authCode)?.key,
    [location, tabs]
  )

  // 設定目前的 activeKey 值
  const [currentActiveKey, setCurrentActiveKey] = useState(activeKey)

  // 首次載入頁面 key 值加載
  useEffect(() => {
    // 改變 URL 中的 activeKey
    history.push({
      search: `?activeKey=${currentActiveKey}`,
    })
  }, [currentActiveKey, history])

  // 設定頁面標題
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.key === currentActiveKey)
    if (currentTab) {
      setPageTitle(`${programTitle} - ${currentTab.title}`)
    }
  }, [programTitle, currentActiveKey, pageCode, tabs])

  return (
    <PageContainer title={pageTitle}>
      <Tabs
        type="card"
        activeKey={currentActiveKey}
        onChange={(key: string) => {
          history.push({
            search: `?activeKey=${key}`,
          })
          setCurrentActiveKey(key)
        }}
      >
        {tabs.map((item) => (
          <TabPane tab={item.title} key={item.key} disabled={item.disabled}>
            {item.component}
          </TabPane>
        ))}
      </Tabs>
    </PageContainer>
  )
}

export default BaseMainIndex
