import React from 'react'
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
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: '表格(ProTable)',
      component: <Demo01/>
    },
    {
      authCode: '2',
      title: '查詢表格(SearchProTable)',
      component: <Demo02/>
    },
    {
      authCode: '3',
      title: '嵌套表格(NestedProTable)',
      component: <Demo03/>
    },
    {
      authCode: '4',
      title: '選取行顯示明細的表格(ShowRowProTable)',
      component: <Demo04/>
    },
    {
      authCode: '5',
      title: '另開的編輯表格(EditProTable)',
      component: <Demo05/>
    },
    {
      authCode: '6',
      title: '可編輯表格(EditableProTable)',
      component: <Demo06/>
    },
    {
      authCode: '7',
      title: '手動新增的可編輯表格(InputEditableProTable)',
      component: <Demo07/>
    },
    {
      authCode: '8',
      title: '輸入資料顯示於表格(InputPreviewProTable)',
      component: <Demo08/>
    },
    {
      authCode: '9',
      title: '嵌套可編輯表格(NestedEditableProTable)',
      component: <Demo09/>
    },
    {
      authCode: '10',
      title: '拖動排序表格(DragSortTable)',
      component: <Demo10/>
    },
  ]
  
  return (
      <Tabs 
        type='card'
        tabPosition='left'
        animated    // 啟用切換動畫
        destroyOnHidden   // 隱藏時銷毀 DOM
      >
      {tabs.map((item) => (
        <TabPane tab={item.title} key={item.authCode}>
          {item.component}
        </TabPane>
      ))}
    </Tabs>
  )
}

export default AsstManagement
