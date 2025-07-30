import React from 'react'
import Demo01 from './Components/demo01_SearchProTable'
import Demo02 from './Components/demo02_NestedProTable'
import Demo03 from './Components/demo03_ShowRowProTable'
import Demo04 from './Components/demo04_EditProTable'
import Demo05 from './Components/demo05_EditableProTable'
import Demo06 from './Components/demo06_InputEditableProTable'
import Demo07 from './Components/demo07_InputPreviewProTable'
import { PageContainer } from '@ant-design/pro-components'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //主功能9000代碼
  const pageTitle = '表格(Table)'

  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: '查詢表格(SearchProTable)',
      component: <Demo01/>
    },
    {
      authCode: '2',
      title: '嵌套表格(NestedProTable)',
      component: <Demo02/>
    },
    {
      authCode: '3',
      title: '選取行顯示明細的表格(ShowRowProTable)',
      component: <Demo03/>
    },
    {
      authCode: '4',
      title: '另開的編輯表格(EditProTable)',
      component: <Demo04/>
    },
    {
      authCode: '5',
      title: '可編輯表格(EditableProTable)',
      component: <Demo05/>
    },
    {
      authCode: '6',
      title: '手動新增的可編輯表格(InputEditableProTable)',
      component: <Demo06/>
    },
    {
      authCode: '7',
      title: '輸入資料顯示於表格(InputPreviewProTable)',
      component: <Demo07/>
    },
  ]
  
  return (
      <Tabs 
        type='card'
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
