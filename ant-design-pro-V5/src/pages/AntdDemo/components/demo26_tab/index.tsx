import React, { useRef, useState } from 'react'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { Button, Tabs, message } from 'antd'
import Tab1 from './components/Tab1'
import Tab2 from './components/Tab2'
import Tab3 from './components/Tab3'
import Card1 from './components/Card1'
import ProCard from '@ant-design/pro-card'
import MliFormRow from '@/common/components/form/MliFormRow'

const { TabPane } = Tabs

const tabConfig = [
  { key: 'tab1', title: '分頁1', component: Tab1 },
  { key: 'tab2', title: '分頁2', component: Tab2 },
  { key: 'tab3', title: '分頁3', component: Tab3 }
]

const TabExample: React.FC = () => {
  // 資料變數
  const formRef = useRef<ProFormInstance>(null)
  // tab 焦點
  const [activeTab, setActiveTab] = useState<string>('tab1')
  // 紀錄 tab 要檢核的欄位
  const [tabFieldMap, setTabFieldMap] = useState<Record<string, string[][]>>({})

  // 記錄 tab 是否完成驗證
  const [tabCompletion, setTabCompletion] = useState<Record<string, boolean>>({
    tab1: false,
    tab2: false,
    tab3: false
  })

  // 驗證特定 tab 欄位
  // const validateTab = async (tabKey: string): Promise<boolean> => {
  //   const fields = await formRef.current?.validateFields([
  //     [tabKey, 'field1'],
  //     [tabKey, 'field2']
  //   ])
  //   if (fields) {
  //     setTabCompletion(prev => ({ ...prev, [tabKey]: true }))
  //     return true
  //   }
  //   return false
  // }

  const validateTab = async (tabKey: string): Promise<boolean> => {
    const fields = tabFieldMap[tabKey]
    console.log('fields：', fields)
    if (!fields) return true

    try {
      await formRef.current?.validateFields(fields)
      setTabCompletion(prev => ({ ...prev, [tabKey]: true }))
      return true
    } catch {
      return false
    }
  }

  // 子元件 編輯 檢核欄位
  const setTabFields = (tabKey: string, fields: string[][]) => {
    setTabFieldMap(prev => ({
      ...prev,
      [tabKey]: fields
    }))
  }

  const handleTabChange = async (key: string) => {
    try {
      await validateTab(activeTab)
      setActiveTab(key)
    } catch (error) {
      message.error('請先修正當前頁面錯誤')
    }
  }

  const handleSubmit = async () => {
    // 驗證當前 Tab
    try {
      await validateTab(activeTab)
    } catch {
      message.error('請修正當前頁面欄位')
      return
    }

    // 檢查其他 Tab 是否已完成
    for (const tab of tabConfig) {
      if (tab.key !== activeTab && !tabCompletion[tab.key]) {
        message.error(`請完成 ${tab.title}`)
        return
      }
    }

    // 全部條件通過，可送出
    try {
      const allValues = await formRef.current?.validateFields()
      console.log('表單送出成功，使用者輸入資料如下：', allValues)
      message.success('表單送出成功')
    } catch {
      message.error('表單驗證錯誤')
    }
  }

  const handlePrevTab = () => {
    const index = tabConfig.findIndex(tab => tab.key === activeTab)
    if (index > 0) setActiveTab(tabConfig[index - 1].key)
  }

  const handleNextTab = async () => {
    try {
      await validateTab(activeTab)
      const index = tabConfig.findIndex(tab => tab.key === activeTab)
      if (index < tabConfig.length - 1) setActiveTab(tabConfig[index + 1].key)
    } catch {
      message.error('請修正當前頁面錯誤')
    }
  }

  return (
    <PageContainer title="理賠測試" >
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        onFinish={handleSubmit}
        submitter={{
          render: () => (
            <FooterToolbar>
              <Button key="prev" onClick={handlePrevTab} disabled={activeTab === 'tab1'}>
                上一頁
              </Button>
              <Button key="next" onClick={handleNextTab} disabled={activeTab === 'tab3'}>
                下一頁
              </Button>
              <Button
                key="submit"
                type="primary"
                onClick={handleSubmit}
              >
                送出
              </Button>
            </FooterToolbar>
          )
        }}
      >
        {/* 基本資料 */}
        <ProCard title="基本資料" type='inner' style={{ width: '100%' }}>
          <MliFormRow>
            <ProFormText
              name={['basic', 'clientId']}
              label="申請人ID"
              rules={[{ required: true, message: '請輸入申請人ID' }]}
              fieldProps={{
                onBlur: async (e) => {
                  const clientId = e.target.value
                  if (clientId) {
                    // 模擬 API 呼叫以獲取申請人姓名
                    const names = await new Promise<string>((resolve) => {
                      setTimeout(() => resolve('張三'), 1000) // 模擬延遲
                    })
                    formRef.current?.setFieldsValue({
                      basic: { names }
                    })
                  }
                }
              }}
            />
          <ProFormText
            name={['basic', 'names']}
            label="申請人姓名"
            disabled
            readonly
          />
          </MliFormRow>
          <MliFormRow>
            <ProFormText
              name={['basic', 'policyNo']}
              label="保單號碼"
              rules={[{ required: true, message: '請輸入保單號碼' }]}
            />
            <ProFormText
              name={['basic', 'receiveNo']}
              label="受理號碼"
              rules={[{ required: true, message: '請輸入受理號碼' }]}
            />
          </MliFormRow>
        </ProCard>

        {/* 分頁1 */}
        <Card1 formRef={formRef} />

        {/* Tab 分頁 */}
        <ProCard  type='inner' style={{ width: '100%' }}>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            {tabConfig.map(({ key, title, component: Component }) => (
              <TabPane tab={title} key={key}>
                <Component formRef={formRef} setTabFields={setTabFields} />
              </TabPane>
            ))}
          </Tabs>
        </ProCard>
      </ProForm>
    </PageContainer>
  )
}

export default TabExample
