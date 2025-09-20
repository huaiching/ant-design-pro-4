import React, { useState } from 'react'
import Demo01 from './Components/demo01_ProTable'
import Demo02 from './Components/demo02_SearchProTable'
import Demo03 from './Components/demo03_NestedProTable'
import Demo04 from './Components/demo04_ShowRowProTable'
import Demo05 from './Components/demo05_EditProTable'
import Demo06 from './Components/demo06_EditableProTable'
import Demo07 from './Components/demo07_InputEditableProTable'
import Demo08 from './Components/demo08_InputPreviewProTable'
import Demo09 from './Components/demo09_NestedEditableProTable'
import Demo10 from './Components/demo10_DragSortTable'
import Demo11 from './Components/demo11_EditableAmountTable'
import Demo12 from './Components/demo12_CaseSearchTable'
import Demo13 from './Components/demo13_BatchEditablePolicyTable'
import { Splitter, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: '表格(ProTable)',
      component: <Demo01 />
    },
    {
      authCode: '2',
      title: '查詢表格(SearchProTable)',
      component: <Demo02 />
    },
    {
      authCode: '3',
      title: '嵌套表格(NestedProTable)',
      component: <Demo03 />
    },
    {
      authCode: '4',
      title: '選取行顯示明細的表格(ShowRowProTable)',
      component: <Demo04 />
    },
    {
      authCode: '5',
      title: '另開的編輯表格(EditProTable)',
      component: <Demo05 />
    },
    {
      authCode: '6',
      title: '可編輯表格(EditableProTable)',
      component: <Demo06 />
    },
    {
      authCode: '7',
      title: '手動新增的可編輯表格(InputEditableProTable)',
      component: <Demo07 />
    },
    {
      authCode: '8',
      title: '輸入資料顯示於表格(InputPreviewProTable)',
      component: <Demo08 />
    },
    {
      authCode: '9',
      title: '嵌套可編輯表格(NestedEditableProTable)',
      component: <Demo09 />
    },
    {
      authCode: '10',
      title: '拖動排序表格(DragSortTable)',
      component: <Demo10 />
    },
    {
      authCode: '11',
      title: '可編輯金額表格(EditableAmountTable)',
      component: <Demo11 />
    },
    {
      authCode: '12',
      title: '案例搜尋表格(CaseSearchTable)',
      component: <Demo12 />
    },
    {
      authCode: '13',
      title: '批量新增資料表格(BatchEditablePolicyTable)',
      component: <Demo13 />
    }
  ]
  // 目前的 tab 標籤
  const [activeTab, setActiveTab] = useState('1')
  // 目前的 tab 頁面
  const component = tabs.find((tab) => tab.authCode === activeTab)?.component

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
        resizable={false}           // 可調整寬度 (預設即為 true)：全局設定
        collapsible={{ start: true, end: true, showCollapsibleIcon: true }}
      >
        <Tabs
          type='card'
          tabPosition='left'
          animated    // 啟用切換動畫
          destroyOnHidden   // 隱藏時銷毀 DOM
          onChange={setActiveTab}
        >
          {tabs.map((item) => (
            <TabPane tab={item.title} key={item.authCode} />
          ))}
        </Tabs>
      </Splitter.Panel>

      {/* 內容 */}
      <Splitter.Panel style={{paddingLeft: 20}}>
        {component}
      </Splitter.Panel>
    </Splitter>
  )
}

export default AsstManagement
