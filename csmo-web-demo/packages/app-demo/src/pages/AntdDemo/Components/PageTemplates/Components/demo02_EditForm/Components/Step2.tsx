/**
 * 第二頁 編輯資料頁面
 * 變數透過 mobx 設定 可以減少透過 props 傳遞的麻煩
 */

import {
  AppstoreOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons'
import { FooterToolbar, ProForm } from '@ant-design/pro-components'
import { useNavigate } from '@umijs/max'
import { Button, ConfigProvider, FloatButton, message, Modal, Splitter, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { log } from 'console'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import basicStore from '../Mobx/basicStore'
import formRefStore from '../Mobx/formRefStore'
import poTableStore from '../Mobx/poTableStore'
import tabRefStore from '../Mobx/tabRefStore'
import InfoForm from './Components/InfoForm'
import TabContent1 from './Components/TabContent1'
import TabContent2 from './Components/TabContent2'

interface Props {
  handleStep: (step: number) => void
  state?: any
}

const Step2Form: React.FC<Props> = ({ handleStep, state }) => {
  const formRef = formRefStore.getFormRef
  const basicData = basicStore.getBasic
  const navigate = useNavigate()

  // 查詢模式判斷
  const isQuery = formRef.current?.getFieldValue('isQuery')

  // TAB 資料設定 //
  // 目前的 tab 標籤
  const [activeTab, setActiveTab] = useState('tab1')
  // tab 狀態: pending=未完成 / valid=完成
  const [tabStatus, setTabStatus] = useState<Record<string, 'pending' | 'valid'>>({
    tab1: 'pending',
    tab2: 'pending'
  })
  // 設定 tab 頁面
  const [tabs, setTabs] = useState([
    {
      key: 'tab1',
      title: '聯絡資訊',
      component: <TabContent1 />
    },
    {
      key: 'tab2',
      title: '表格資料',
      component: <TabContent2 />
    }
  ])
  // tab 頁面權限控制範例
  setTabs((prevTabs) => prevTabs.filter((tab) => tab.key !== 'tab1'))

  // 設定 第一個tab 與 最後一個tab
  const firstTab = tabs[0].key
  const lastTab = tabs[tabs.length - 1].key
  // 目前的 tab 頁面
  const component = tabs.find((tab) => tab.key === activeTab)?.component

  // tab 切換 回滾到頂部: 透過監聽 tab 標籤來達成目的
  useEffect(() => {
    document.getElementById('tabContent')?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  // 自動觸發初始頁籤的進入事件
  useEffect(() => {
    tabRefStore.runTabEnterFn(activeTab)
  }, [])

  // tab 切換事件
  const handleTabChange = async (key: string) => {
    let valid = false
    if (isQuery) {
      valid = isQuery
    } else {
      valid = await tabRefStore.runTabLeaveFn(activeTab)
    }
    if (valid) {
      setTabStatus((prev) => ({
        ...prev,
        [activeTab]: 'valid'
      }))
      setActiveTab(key)
      // 👉 新增呼叫進入事件
      setTimeout(() => {
        tabRefStore.runTabEnterFn(key)
      }, 0) // setTimeout 避免和狀態更新衝突
    } else {
      message.error('請先完成目前頁籤的欄位')
    }
  }
  // 上一頁 切換事件
  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab)
    if (currentIndex > 0) {
      const prevKey = tabs[currentIndex - 1].key
      handleTabChange(prevKey)
    }
  }
  // 下一頁 切換事件
  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab)
    if (currentIndex < tabs.length - 1) {
      const nextKey = tabs[currentIndex + 1].key
      handleTabChange(nextKey)
    }
  }

  // 提交事件
  const handleSubmit = async () => {
    // 目前頁簽檢核事件，事件設定在各個頁簽中，並透過 Mobx 管理
    const valid = await tabRefStore.runTabLeaveFn(activeTab)
    if (valid) {
      // 通過檢核，更新頁簽狀態
      const updatedStatus: Record<string, 'pending' | 'valid'> = {
        ...tabStatus,
        [activeTab]: 'valid'
      }
      setTabStatus(updatedStatus)
      // 檢查是否所有頁簽都是完成狀態
      const allValid = Object.entries(updatedStatus).every(([, status]) => status === 'valid')
      if (!allValid) {
        message.error('尚有未完成的頁籤，請逐一檢查')
      }
      // 全部檢核皆通過，進行 完成處理
      log('basicData', basicData)
      log('tab1', formRef.current?.getFieldValue('tab1'))
      log('tab2', poTableStore.getPoTableList)
      message.success('送出成功')
    } else {
      message.error('請先完成目前頁籤的欄位')
    }
  }

  return (
    <ProForm formRef={formRef} submitter={false} layout="vertical">
      <Splitter
        layout="vertical" // 垂直分割 (上下分隔)
        style={{
          minHeight: '100vh',
          height: 'auto'
        }}
      >
        {/* 頁簽 */}
        <Splitter.Panel
          defaultSize={120} // 預設寬度
          collapsible={{ start: true, end: true }}
        >
          <InfoForm />
          <br />

          <Tabs
            type="card"
            activeKey={activeTab}
            animated // 啟用切換動畫
            destroyOnHidden // 隱藏時銷毀 DOM
            onChange={handleTabChange}
          >
            {tabs.map((item) => (
              <TabPane tab={item.title} key={item.key} />
            ))}
          </Tabs>
        </Splitter.Panel>

        {/* 內容 */}
        <Splitter.Panel style={{ paddingTop: 20, right: 10 }}>
          <div
            id="tabContent"
            style={{ height: '100%', overflowY: 'auto', paddingLeft: 10, paddingRight: 10 }}
          >
            <ConfigProvider componentDisabled={isQuery}>{component}</ConfigProvider>

            <FloatButton.Group
              shape="square"
              trigger="click"
              style={{ bottom: 100 }}
              placement="top"
              icon={<AppstoreOutlined />}
            >
              <FloatButton
                icon={<VerticalAlignTopOutlined />}
                // tooltip='回頂部'
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  })
                  const target = document.getElementById('tabContent') || window
                  target.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  })
                }}
              />
              <FloatButton
                icon={<VerticalAlignBottomOutlined />}
                // tooltip='到底部'
                onClick={() => {
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                  })
                  const target = document.getElementById('tabContent') || window
                  target.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                  })
                }}
              />
            </FloatButton.Group>
          </div>
        </Splitter.Panel>
      </Splitter>

      <FooterToolbar>
        <Button onClick={handlePrevious} disabled={activeTab === firstTab}>
          上一頁
        </Button>
        <Button onClick={handleNext} disabled={activeTab === lastTab}>
          下一頁
        </Button>
        {!isQuery &&
        <Button type="primary" onClick={handleSubmit}>
          完成
        </Button>        }
        <Button onClick={() => handleStep(0)}>返回</Button>
        <Button
          danger
          onClick={() => {
            Modal.confirm({
              title: '請確認是否 取消編輯？',
              content: '未儲存的修改將會還原。',
              okText: '確定放棄',
              onOk() {
                if (location.pathname.includes('/antdDemo/demo/PageTemplates/Edit')) {
                  navigate('/antdDemo/demo/PageTemplates?activeKey=SearchForm')
                } else if (location.pathname.includes('/antdDemo/demo/PageTemplates/Create')) {
                  navigate('/antdDemo/demo/PageTemplates?activeKey=SearchForm')
                } else if (location.pathname.includes('/antdDemo/demo/PageTemplates/Query')) {
                  navigate('/antdDemo/demo/PageTemplates?activeKey=SearchForm')
                } else {
                  navigate('/antdDemo/demo/PageTemplates?activeKey=EditForm')
                }
              },
              cancelText: '取消'
            })
          }}
        >
          取消
        </Button>
      </FooterToolbar>
    </ProForm>
  )
}

export default observer(Step2Form)
