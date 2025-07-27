import React from 'react'
import Demo01 from './Components/Form'
import Demo02 from './Components/Container'
import Demo03 from './Components/Table'
import Demo04 from './Components/LayoutUi'
import Demo05 from './Components/DataDisplay'
import Demo06 from './Components/Utility'
import { PageContainer } from '@ant-design/pro-components'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //主功能9000代碼
  const pageTitle = '組件測試頁面'

  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: '表單輸入元件(Form)',
      component: <Demo01/>
    },
    {
      authCode: '2',
      title: '表單容器(Container)',
      component: <Demo02/>
    },
    {
      authCode: '3',
      title: '表格(Table)',
      component: <Demo03/>
    },
    {
      authCode: '4',
      title: '佈局與視覺元件(LayoutUi)',
      component: <Demo04/>
    },
    {
      authCode: '5',
      title: '資料顯示元件(DataDisplay)',
      component: <Demo05/>
    },
    {
      authCode: '6',
      title: '工具類與整合範例(Utility)',
      component: <Demo06/>
    },
  ]
  
  return (
    <PageContainer title={pageTitle}>
      <Tabs type='card' size='large'>
        {tabs.map((item) => (
          <TabPane tab={item.title} key={item.authCode}>
            {item.component}
          </TabPane>
        ))}
      </Tabs>
    </PageContainer>
  );
}

export default AsstManagement
