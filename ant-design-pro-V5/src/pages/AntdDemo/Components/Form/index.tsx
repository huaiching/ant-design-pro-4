import React from 'react'
import Demo01 from './Components/demo01_MliFormRow'
import Demo02 from './Components/demo02_ProFormText'
import Demo03 from './Components/demo03_ProFormTextArea'
import Demo04 from './Components/demo04_ProFormDigit'
import Demo05 from './Components/demo05_ProFormSelect'
import Demo06 from './Components/demo06_ProFormCascader'
import Demo07 from './Components/demo07_ProFormTreeSelect'
import Demo08_1 from './Components/demo08_1_MliFormDatePicker'
import Demo08_2 from './Components/demo08_2_ProFormDatePicker'
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
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {

  //設定tabs 頁面元件
  //主頁主要設定處
  const tabs = [
    {
      authCode: '1',
      title: '布局(MliFormRow)',
      component: <Demo01/>
    },
    {
      authCode: '2',
      title: '單行文本輸入(ProFormText)',
      component: <Demo02/>
    },
    {
      authCode: '3',
      title: '多行文本輸入(ProFormTextArea)',
      component: <Demo03/>
    },
    {
      authCode: '4',
      title: '數字輸入(ProFormDigit)',
      component: <Demo04/>
    },
    {
      authCode: '5',
      title: '下拉選擇框(ProFormSelect)',
      component: <Demo05/>
    },
    {
      authCode: '6',
      title: '級聯選擇框(ProFormCascader)',
      component: <Demo06/>
    },
    {
      authCode: '7',
      title: '樹狀選擇框(ProFormTreeSelect)',
      component: <Demo07/>
    },
    {
      authCode: '8.1',
      title: '日期選擇(MliFormDatePicker)',
      component: <Demo08_1/>
    },
    {
      authCode: '8.2',
      title: '日期選擇(ProFormDatePicker)',
      component: <Demo08_2/>
    },
    {
      authCode: '9',
      title: '時間選擇(ProFormTimePicker)',
      component: <Demo09/>
    },
    {
      authCode: '10',
      title: '開關控件(ProFormSwitch)',
      component: <Demo10/>
    },
    {
      authCode: '11',
      title: '單選框(ProFormRadio)',
      component: <Demo11/>
    },
    {
      authCode: '12',
      title: '多選框(ProFormCheckbox)',
      component: <Demo12/>
    },
    {
      authCode: '13',
      title: '文件上傳(ProFormUploadButton)',
      component: <Demo13/>
    },
    {
      authCode: '14',
      title: '群組(ProFormGroup)',
      component: <Demo14/>
    },
    {
      authCode: '15',
      title: '欄位容器(ProFormitem)',
      component: <Demo15/>
    },
    {
      authCode: '16',
      title: '自動填入(AutoComplete)',
      component: <Demo16/>
    },
    {
      authCode: '17',
      title: '結構清單(ProFormList)',
      component: <Demo17/>
    },
    {
      authCode: '18',
      title: '案件流程(CaseFlow)',
      component: <Demo18/>
    },
    {
      authCode: '19',
      title: '下拉表單輸入表格(MultiSelectTable)',
      component: <Demo19/>
    },
    {
      authCode: '20',
      title: '文字樣式(Typography)',
      component: <Demo20/>
    }
  ]

  return (
      <Tabs
        type='card'
        tabPosition='left'
        // animated    // 啟用切換動畫
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
