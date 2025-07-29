import React, { useEffect } from 'react'
import Demo01 from './Components/Form'
import Demo02 from './Components/Container'
import Demo03 from './Components/Table'
import Demo04 from './Components/LayoutUi'
import Demo05 from './Components/DataDisplay'
import Demo06 from './Components/Utility'
// import Demo07 from './Components/Test'
import Demo07 from './Components/PageTemplates'
import { PageContainer } from '@ant-design/pro-components'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { useNavigate, useSearchParams } from 'umi';

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //主功能9000代碼
  const pageTitle = '組件測試頁面'
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  

  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      key: 'Form',
      title: '表單輸入元件(Form)',
      component: <Demo01/>
    },
    {
      authCode: '2',
      key: 'Container',
      title: '表單容器(Container)',
      component: <Demo02/>
    },
    {
      authCode: '3',
      key: 'Table',
      title: '表格(Table)',
      component: <Demo03/>
    },
    {
      authCode: '4',
      key: 'LayoutUi',
      title: '佈局與視覺元件(LayoutUi)',
      component: <Demo04/>
    },
    {
      authCode: '5',
      key: 'DataDisplay',
      title: '資料顯示元件(DataDisplay)',
      component: <Demo05/>
    },
    {
      authCode: '6',
      key: 'Utility',
      title: '工具類與整合範例(Utility)',
      component: <Demo06/>
    },
    {
      authCode: '7',
      key: 'PageTemplates',
      title: '頁面樣板(PageTemplates)',
      component: <Demo07/>
    },
  ]
  
  // 取得當前 activeKey，若沒有就預設為第一個 tab 的 key
  const currentActiveKey = searchParams.get('activeKey') || tabs[0].key;
  
  // 首次載入頁面 key 值加載
  useEffect(() => {
    navigate({
      search: `?activeKey=${currentActiveKey}`,
    });
  }, [])
  
  return (
    <PageContainer title={pageTitle}>
      <Tabs 
        type='card' size='large' 
        activeKey={currentActiveKey}
        onChange={(key: string) => {
          navigate({
            search: `?activeKey=${key}`,
          });
        }}
      >
        {tabs.map((item) => (
          <TabPane tab={item.title} key={item.key}>
            {item.component}
          </TabPane>
        ))}
      </Tabs>
    </PageContainer>
  );
}

export default AsstManagement
