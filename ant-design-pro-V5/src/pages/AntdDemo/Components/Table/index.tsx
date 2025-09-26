import React, { useEffect, useState } from 'react'
import Demo01 from './Components/demo01_ProTable'
import Demo02 from './Components/demo02_SearchProTable'
import Demo03 from './Components/demo03_NestedProTable'
import Demo04 from './Components/demo04_ShowRowProTable'
import Demo05 from './Components/demo05_EditProTable'
import Demo06 from './Components/demo06_EditableProTable'
import Demo07 from './Components/demo07_InputEditableProTable'
import Demo08 from './Components/demo08_NestedEditableProTable'
import Demo09 from './Components/demo09_DragSortTable'
import Demo10 from './Components/demo10_EditableAmountTable'
import Demo11 from './Components/demo11_CaseSearchTable'
import Demo12 from './Components/demo12_BatchEditablePolicyTable'
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
      key: 'ProTable',
      title: '表格(ProTable)',
      component: <Demo01 />
    },
    {
      key: 'SearchProTable',
      title: '查詢表格(SearchProTable)',
      component: <Demo02 />
    },
    {
      key: 'NestedProTable',
      title: '嵌套表格(NestedProTable)',
      component: <Demo03 />
    },
    {
      key: 'ShowRowProTable',
      title: '選取行顯示明細的表格(ShowRowProTable)',
      component: <Demo04 />
    },
    {
      key: 'EditProTable',
      title: '另開的編輯表格(EditProTable)',
      component: <Demo05 />
    },
    {
      key: 'EditableProTable',
      title: '可編輯表格(EditableProTable)',
      component: <Demo06 />
    },
    {
      key: 'InputEditableProTable',
      title: '手動新增的可編輯表格(InputEditableProTable)',
      component: <Demo07 />
    },
    {
      key: 'NestedEditableProTable',
      title: '嵌套可編輯表格(NestedEditableProTable)',
      component: <Demo08 />
    },
    {
      key: 'DragSortTable',
      title: '拖動排序表格(DragSortTable)',
      component: <Demo09 />
    },
    {
      key: 'EditableAmountTable',
      title: '可編輯金額表格(EditableAmountTable)',
      component: <Demo10 />
    },
    {
      key: 'CaseSearchTable',
      title: '案例搜尋表格(CaseSearchTable)',
      component: <Demo11 />
    },
    {
      key: 'BatchEditablePolicyTable',
      title: '批量新增資料表格(BatchEditablePolicyTable)',
      component: <Demo12 />
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

  // 目前的 tab 標籤
  const [activeTab, setActiveTab] = useState('ProTable')
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
