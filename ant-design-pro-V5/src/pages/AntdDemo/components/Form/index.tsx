import React from 'react'
import Demo01 from './Components/demo01_MliFormRow'
import Demo02 from './Components/demo02_ProFormText'
import Demo03 from './Components/demo03_ProFormTextArea'
import Demo04 from './Components/demo04_ProFormDigit'
import Demo05 from './Components/demo05_ProFormSelect'
import Demo06 from './Components/demo06_ProFormDatePicker'
import Demo07 from './Components/demo07_ProFormTimePicker'
import Demo08 from './Components/demo08_ProFormSwitch'
import Demo09 from './Components/demo09_ProFormRadio'
import Demo10 from './Components/demo10_ProFormCheckbox'
import Demo11 from './Components/demo11_ProFormUploadButton'
import Demo12 from './Components/demo12_ProFormGroup'
import Demo13 from './Components/demo13_AutoComplete'
import Demo14 from './Components/demo14_ProFormList'
import { PageContainer } from '@ant-design/pro-components'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

//asstManagement 主功能名稱
const AsstManagement: React.FC = () => {
  //主功能9000代碼
  const pageTitle = '表單輸入元件(Form)'

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
      title: '日期選擇(ProFormDatePicker)',
      component: <Demo06/>
    },
    {
      authCode: '7',
      title: '時間選擇(ProFormTimePicker)',
      component: <Demo07/>
    },
    {
      authCode: '8',
      title: '開關控件(ProFormSwitch)',
      component: <Demo08/>
    },
    {
      authCode: '9',
      title: '單選框(ProFormRadio)',
      component: <Demo09/>
    },
    {
      authCode: '10',
      title: '多選框(ProFormCheckbox)',
      component: <Demo10/>
    },
    {
      authCode: '11',
      title: '文件上傳(ProFormUploadButton)',
      component: <Demo11/>
    },
    {
      authCode: '12',
      title: '群組(ProFormGroup)',
      component: <Demo12/>
    },
    {
      authCode: '13',
      title: '自動填入(AutoComplete)',
      component: <Demo13/>
    },
    {
      authCode: '14',
      title: '結構清單(ProFormList)',
      component: <Demo14/>
    },
  ]
  
  return (
  <Tabs type='card' tabPosition='left'>
    {tabs.map((item) => (
      <TabPane tab={item.title} key={item.authCode}>
        {item.component}
      </TabPane>
    ))}
  </Tabs>
  );
}

export default AsstManagement
