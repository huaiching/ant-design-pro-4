/**
 * 第二頁 編輯資料頁面
 * 變數透過 mobx 設定 可以減少透過 props 傳遞的麻煩
 */

import React, { useEffect, useRef, useState } from 'react'
import { Button, message, TabsProps, BackTop, Card } from 'antd'
import { ProForm, FooterToolbar, ProFormInstance } from '@ant-design/pro-components'
import { observer } from 'mobx-react'
import basicStore from '../Mobx/basicStore'
import InfoForm from './Components/InfoForm'
import TabContent1 from './Components/TabContent1'
import TabContent2 from './Components/TabContent2'
import { log } from 'console'
import poTableStore from '../Mobx/poTableStore'
import formRefStore from '../Mobx/formRefStore'

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
    tab2: 'pending',
  })
  // 設定 tab 頁面
  const tabs: TabsProps['items'] = [
    {
      key: 'tab1',
      label: '聯絡資訊',
      children: <TabContent1 />,
    },
    {
      key: 'tab2',
      label: '表格資料',
      children: <TabContent2 />,
    },
  ]
  // tab 切換 回滾到頂部: 透過監聽 tab 標籤來達成目的
  useEffect(() => {
    document.getElementById('tabContent')?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])
  // tab 切換事件
  const handleTabChange = async (key: string) => {
    const valid = await formRef.current?.validateFields()
    if (valid) {
      setTabStatus((prev) => ({
        ...prev,
        [activeTab]: 'valid',
      }))
      setActiveTab(key)
    } else {
      message.error('請先完成目前頁籤的欄位')
    }
  }

  // 提交事件
  const handleSubmit = async () => {
    const valid = await formRef.current?.validateFields()
    if (valid) {
      const updatedStatus: Record<string, 'pending' | 'valid'> = {
        ...tabStatus,
        [activeTab]: 'valid',
      }
      setTabStatus(updatedStatus)

      const allValid = Object.entries(updatedStatus).every(([, status]) => status === 'valid')
      if (allValid) {
        const values = formRef.current?.getFieldsValue()
        log('basicData',basicData)
        log('tab1',formRef.current?.getFieldValue('tab1'))
        log('tab2',poTableStore.getPoTableList)
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
      <InfoForm/>

      <Card
        style={{
          marginTop: 16,             // 卡片頂部與上方元素保持16px間距
          position: 'sticky',        // 使卡片在滾動時固定於視窗頂部（吸頂效果）
          top: 0,                    // sticky定位距離視窗頂端0像素
          zIndex: 1,                 // 堆疊順序，確保卡片在其他元素上方顯示
          background: 'transparent', // 背景透明，達到幽靈卡片視覺效果
          boxShadow: 'none',         // 取消陰影，讓卡片外觀更扁平
          border: 'none',            // 移除卡片邊框
          marginLeft: -24,           // 往左負外距24px，抵銷外層容器通常的24px padding，讓卡片內容貼齊左側
          marginRight: -24,          // 同理，若需要兩側貼齊，也往右負外距24px
        }}
        styles={{
          body: {
            padding: 12              // 卡片內容區域內邊距12px，讓內容不緊貼邊緣
          }
        }}
        tabList={tabs.map(({ key, label }) => ({ key, tab: label }))} // 卡片標籤頁配置，key和標籤文字
        activeTabKey={activeTab}                                      // 目前激活的標籤key，用以控制內容顯示
        onTabChange={handleTabChange}                                 // 標籤切換時呼叫的函式，切換activeTab狀態
      >
        <div id='tabContent' style={{ maxHeight: 800, overflowY: 'auto', padding: 8 }}>
          {tabs.find((tab) => tab.key === activeTab)?.children}

          <BackTop
            target={() => document.getElementById('tabContent') || window}
            visibilityHeight={100}
            style={{
              position: 'fixed',
              right: 60,
              bottom: 100,
            }}
          />
        </div>
      </Card>

      <FooterToolbar>
        <Button type="primary" onClick={handleSubmit}>完成</Button>
        <Button danger onClick={() => handleStep(0)}>取消</Button>
      </FooterToolbar>
    </ProForm>
  )
}

export default observer(Step2Form)
