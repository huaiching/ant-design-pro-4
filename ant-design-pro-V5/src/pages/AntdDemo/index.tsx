import React from 'react'
import Demo0 from './components/demo0_MliFormRow'
import Demo1 from './components/demo1_ProFormText'
import Demo2 from './components/demo2_ProFormTextArea'
import Demo3 from './components/demo3_ProFormDigit'
import Demo4 from './components/demo4_ProFormSelect'
import Demo5 from './components/demo5_ProFormDatePicker'
import Demo6 from './components/demo6_ProFormTimePicker'
import Demo7 from './components/demo7_ProFormSwitch'
import Demo8 from './components/demo8_ProFormRadio'
import Demo9 from './components/demo9_ProFormCheckbox'
import Demo10 from './components/demo10_ProFormUploadButton'
import Demo11 from './components/demo11_SearchProTable'
import Demo12 from './components/demo12_NestedProTable'
import Demo13 from './components/demo13_EditableMliTable'
import Demo14 from './components/demo14_ModalForm'
import Demo15 from './components/demo15_DrawerForm'
import Demo16 from './components/demo16_ProCard'
import Demo17 from './components/demo17_StepsForm'
import Demo18 from './components/demo18_Notification'
import Demo19 from './components/demo19_Modal'
import Demo20 from './components/demo20_List'
import Demo21 from './components/demo21_PageContainer'
import Demo22 from './components/demo22_xlsx'
import Demo23 from './components/demo23_test'
import Demo24 from './components/demo24_test_StepsForm'
import Demo25 from './components/demo25_tab'
import Demo26 from './components/demo26_ProFormGroup'
import Demo27 from './components/demo27_AutoComplete'
import Demo28 from './components/demo28_ProFormList'
import Demo29 from './components/demo29_BackTop'
import Demo30 from './components/demo30_Descriptions'
import Demo31 from './components/demo31_Navigate'
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
      authCode: '0',
      key: 'MliFormRow',
      title: '布局',
      component: <Demo0/>
    },
    {
      authCode: '1',
      key: 'ProFormText',
      title: '單行文本輸入',
      // disabled: true,
      component: <Demo1/>
    },
    {
      authCode: '2',
      key: 'ProFormTextArea',
      title: '多行文本輸入',
      component: <Demo2/>
    },
    {
      authCode: '3',
      key: 'ProFormDigit',
      title: '數字輸入',
      component: <Demo3/>
    },
    {
      authCode: '4',
      key: 'ProFormSelect',
      title: '下拉選擇框',
      component: <Demo4/>
    },
    {
      authCode: '5',
      key: 'ProFormDatePicker',
      title: '日期選擇',
      component: <Demo5/>
    },
    {
      authCode: '6',
      key: 'ProFormTimePicker',
      title: '時間選擇',
      component: <Demo6/>
    },
    {
      authCode: '7',
      key: 'ProFormSwitch',
      title: '開關控件',
      component: <Demo7/>
    },
    {
      authCode: '8',
      key: 'ProFormRadio',
      title: '單選框',
      component: <Demo8/>
    },
    {
      authCode: '9',
      key: 'ProFormCheckbox',
      title: '多選框',
      component: <Demo9/>
    },
    {
      authCode: '10',
      key: 'ProFormUploadButton',
      title: '文件上傳',
      component: <Demo10/>
    },
    {
      authCode: '11',
      key: 'SearchProTable',
      title: '查詢表格',
      component: <Demo11/>
    },
    {
      authCode: '12',
      key: 'NestedProTable',
      title: '嵌套表格',
      component: <Demo12/>
    },
    {
      authCode: '13',
      key: 'EditableMliTable',
      title: '可編輯表格',
      component: <Demo13/>
    },
    {
      authCode: '14',
      key: 'ModalForm',
      title: '浮層表單(彈窗式)',
      component: <Demo14/>
    },
    {
      authCode: '15',
      key: 'DrawerForm',
      title: '浮層表單(抽屜式)',
      component: <Demo15/>
    },
    {
      authCode: '16',
      key: 'ProCard',
      title: '卡片',
      component: <Demo16/>
    },
    {
      authCode: '17',
      key: 'StepsForm',
      title: '分布表單',
      component: <Demo17/>
    },
    {
      authCode: '18',
      key: 'Notification',
      title: '通知提醒框',
      component: <Demo18/>
    },
    {
      authCode: '19',
      key: 'Modal',
      title: '對話框 (確認訊息)',
      component: <Demo19/>
    },
    {
      authCode: '20',
      key: 'List',
      title: '列表',
      component: <Demo20/>
    },
    {
      authCode: '21',
      key: 'PageContainer',
      title: '頁面容器 與 下拉選單',
      component: <Demo21/>
    },
    {
      authCode: '22',
      key: 'Xlsx',
      title: 'xlsx 前端excel的匯入匯出',
      component: <Demo22/>
    },
    {
      authCode: '23',
      key: 'Test',
      title: '進階應用測試',
      component: <Demo23/>
    },
    {
      authCode: '24',
      key: 'StepsFormTest',
      title: '分布表單模組化測試',
      component: <Demo24/>
    },
    {
      authCode: '25',
      key: 'Tab',
      title: '表單 Tab',
      component: <Demo25/>
    },
    {
      authCode: '26',
      key: 'ProFormGroup',
      title: 'ProFormGroup',
      component: <Demo26/>
    },
    {
      authCode: '27',
      key: 'AutoComplete',
      title: '自動填入',
      component: <Demo27/>
    },
    {
      authCode: '28',
      key: 'ProFormList',
      title: 'ProFormList',
      component: <Demo28/>
    },
    {
      authCode: '29',
      key: 'BackTop',
      title: 'BackTop',
      component: <Demo29/>
    },
    {
      authCode: '30',
      key: 'Descriptions',
      title: '描述列表',
      component: <Demo30/>
    },
    {
      authCode: '31',
      key: 'Navigate',
      title: '頁面跳轉',
      component: <Demo31/>
    },
  ]
  
  return (
    <PageContainer title={pageTitle}>
      <Tabs
        type="card"
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
