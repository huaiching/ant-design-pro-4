/**
 * 第二頁 編輯資料頁面
 * 變數透過 mobx 設定 可以減少透過 props 傳遞的麻煩
 */

import React, { useEffect, useState } from 'react'
import { Button, message, BackTop, Card, Tabs, FloatButton } from 'antd'
import { ProForm, FooterToolbar } from '@ant-design/pro-components'
import { observer } from 'mobx-react'
import basicStore from '../Mobx/basicStore'
import InfoForm from './Components/InfoForm'
import TabContent1 from './Components/TabContent1'
import TabContent2 from './Components/TabContent2'
import { log } from 'console'
import poTableStore from '../Mobx/poTableStore'
import formRefStore from '../Mobx/formRefStore'
import tabRefStore from '../Mobx/tabRefStore'
import TabPane from 'antd/es/tabs/TabPane'
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'

interface Props {
  handleStep: (step: number) => void
}

const Step2Form: React.FC<Props> = ({ handleStep }) => {
  const formRef = formRefStore.getFormRef
  const basicData = basicStore.getBasic

  // TAB 資料設定 //
  // 目前的 tab 標籤
  const [activeTab, setActiveTab] = useState('tab1')
  // tab 狀態: pending=未完成 / valid=完成
  const [tabStatus, setTabStatus] = useState<Record<string, 'pending' | 'valid'>>({
    tab1: 'pending',
    tab2: 'pending'
  })
  // 設定 tab 頁面
  let tabs = [
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
  ]
  // tab 頁面權限控制範例
  // tabs = tabs.filter((tab) => tab.key !== 'tab1')

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
    const valid = await tabRefStore.runTabLeaveFn(activeTab)
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
    const currentIndex = tabs.findIndex(tab => tab.key === activeTab)
    if (currentIndex > 0) {
      const prevKey = tabs[currentIndex - 1].key
      handleTabChange(prevKey)
    }
  }
  // 下一頁 切換事件
  const handleNext = () => {
    const currentIndex = tabs.findIndex(tab => tab.key === activeTab)
    if (currentIndex < tabs.length - 1) {
      const nextKey = tabs[currentIndex + 1].key
      handleTabChange(nextKey)
    }
  }

  // 提交事件
  const handleSubmit = async () => {
    const valid = await tabRefStore.runTabLeaveFn(activeTab)
    if (valid) {
      const updatedStatus: Record<string, 'pending' | 'valid'> = {
        ...tabStatus,
        [activeTab]: 'valid'
      }
      setTabStatus(updatedStatus)

      const allValid = Object.entries(updatedStatus).every(([, status]) => status === 'valid')
      if (allValid) {
        // const values = formRef.current?.getFieldsValue()
        log('basicData', basicData)
        log('tab1', formRef.current?.getFieldValue('tab1'))
        log('tab2', poTableStore.getPoTableList)
        message.success('送出成功')
      } else {
        message.error('尚有未完成的頁籤，請逐一檢查')
      }
    } else {
      message.error('請先完成目前頁籤的欄位')
    }
  }

  return (
    <ProForm
      formRef={formRef}
      submitter={false}
      layout='vertical'
      style={{ padding: 16 }}
    >
      <InfoForm />

      <Tabs
        type='card'
        animated    // 啟用切換動畫
        destroyOnHidden   // 隱藏時銷毀 DOM
        onChange={setActiveTab}
      >
        {tabs.map((item) => (
          <TabPane tab={item.title} key={item.key} />
        ))}
      </Tabs>

      {component}

      <FloatButton
        icon={<VerticalAlignTopOutlined />}
        tooltip='回頂部'
        style={{bottom: 150}}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }} 
      />
      <FloatButton
        icon={<VerticalAlignBottomOutlined />}
        tooltip='到底部'
        style={{bottom: 100}}
        onClick={() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }}
      />

      <FooterToolbar>
        <Button onClick={handlePrevious} disabled={activeTab === firstTab} >上一頁</Button>
        <Button onClick={handleNext} disabled={activeTab === lastTab} >下一頁</Button>
        <Button type="primary" onClick={handleSubmit}>完成</Button>
        <Button danger onClick={() => handleStep(0)}>取消</Button>
      </FooterToolbar>
    </ProForm>
  )
}

export default observer(Step2Form)
