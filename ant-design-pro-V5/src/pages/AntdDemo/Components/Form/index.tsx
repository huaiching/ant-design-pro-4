import React, { useEffect, useState } from 'react'
import Demo01 from './Components/demo01_MliFormRow'
import Demo02 from './Components/demo02_ProFormText'
import Demo03 from './Components/demo03_ProFormTextArea'
import Demo04 from './Components/demo04_ProFormDigit'
import Demo05 from './Components/demo05_ProFormSelect'
import Demo06 from './Components/demo06_ProFormCascader'
import Demo07 from './Components/demo07_ProFormTreeSelect'
import Demo08 from './Components/demo08_ProFormDatePicker'
import Demo09 from './Components/demo09_ProFormTimePicker'
import Demo10 from './Components/demo10_ProFormSwitch'
import Demo11 from './Components/demo11_ProFormRadio'
import Demo12 from './Components/demo12_ProFormCheckbox'
import Demo13 from './Components/demo13_ProFormUploadButton'
import Demo14 from './Components/demo14_ProFormGroup'
import Demo15 from './Components/demo15_ProFormItem'
import Demo16 from './Components/demo16_AutoComplete'
import Demo17 from './Components/demo17_ProFormList'
import Demo18 from './Components/demo18_CaseFolw'
import Demo19 from './Components/demo19_MultiSelectTable'
import Demo20 from './Components/demo20_Typography'
import Demo21 from './Components/demo21_FloatButton'
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
      key: 'MliFormRow',
      title: '布局(MliFormRow)',
      component: <Demo01 />
    },
    {
      key: 'ProFormText',
      title: '單行文本輸入(ProFormText)',
      component: <Demo02 />
    },
    {
      key: 'ProFormTextArea',
      title: '多行文本輸入(ProFormTextArea)',
      component: <Demo03 />
    },
    {
      key: 'ProFormDigit',
      title: '數字輸入(ProFormDigit)',
      component: <Demo04 />
    },
    {
      key: 'ProFormSelect',
      title: '下拉選擇框(ProFormSelect)',
      component: <Demo05 />
    },
    {
      key: 'ProFormCascader',
      title: '級聯選擇框(ProFormCascader)',
      component: <Demo06 />
    },
    {
      key: 'ProFormTreeSelect',
      title: '樹狀選擇框(ProFormTreeSelect)',
      component: <Demo07 />
    },
    {
      key: 'ProFormDatePicker',
      title: '日期選擇(ProFormDatePicker)',
      component: <Demo08 />
    },
    {
      key: 'ProFormTimePicker',
      title: '時間選擇(ProFormTimePicker)',
      component: <Demo09 />
    },
    {
      key: 'ProFormSwitch',
      title: '開關控件(ProFormSwitch)',
      component: <Demo10 />
    },
    {
      key: 'ProFormRadio',
      title: '單選框(ProFormRadio)',
      component: <Demo11 />
    },
    {
      key: 'ProFormCheckbox',
      title: '多選框(ProFormCheckbox)',
      component: <Demo12 />
    },
    {
      key: 'ProFormUploadButton',
      title: '文件上傳(ProFormUploadButton)',
      component: <Demo13 />
    },
    {
      key: 'ProFormGroup',
      title: '群組(ProFormGroup)',
      component: <Demo14 />
    },
    {
      key: 'ProFormitem',
      title: '欄位容器(ProFormitem)',
      component: <Demo15 />
    },
    {
      key: 'AutoComplete',
      title: '自動填入(AutoComplete)',
      component: <Demo16 />
    },
    {
      key: 'ProFormList',
      title: '結構清單(ProFormList)',
      component: <Demo17 />
    },
    {
      key: 'CaseFlow',
      title: '案件流程(CaseFlow)',
      component: <Demo18 />
    },
    {
      key: 'MultiSelectTable',
      title: '下拉表單輸入表格(MultiSelectTable)',
      component: <Demo19 />
    },
    {
      key: 'Typography',
      title: '文字樣式(Typography)',
      component: <Demo20 />
    },
    {
      key: 'FloatButton',
      title: '懸浮按鈕(FloatButton)',
      component: <Demo21 />
    }
  ]

  // 取得當前 activeKey，若沒有就預設為第一個 tab 的 key
  const currentActiveKey = searchParams.get('activeKey') || tabs[0].key

  // 目前的 tab 標籤
  const [activeTab, setActiveTab] = useState('MliFormRow')
  
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
        defaultSize={350}   // 預設寬度
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

