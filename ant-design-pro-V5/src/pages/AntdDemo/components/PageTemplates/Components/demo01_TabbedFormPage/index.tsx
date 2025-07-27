// TabbedFormPage/index.tsx
import React, { useRef, useState } from 'react';
import {
  FooterToolbar,
  ProCard,
  ProForm,
  ProFormInstance,
} from '@ant-design/pro-components';
import { Card, Tabs, Button, message, BackTop } from 'antd';
import type { TabsProps } from 'antd';
import InfoForm from './Components/InfoForm';
import TabContent1 from './Components/TabContent1';
import TabContent2 from './Components/TabContent2';

const TabbedFormPage: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [activeTab, setActiveTab] = useState('tab1');

  const [tabStatus, setTabStatus] = useState<Record<string, 'pending' | 'valid'>>({
    tab1: 'pending',
    tab2: 'pending',
  });

  const tabs: TabsProps['items'] = [
    {
      key: 'tab1',
      label: '聯絡資訊',
      children: <TabContent1 formRef={formRef} />,
    },
    {
      key: 'tab2',
      label: '其他資訊',
      children: <TabContent2 formRef={formRef} />,
    },
  ];

  const handleTabChange = async (key: string) => {
    const valid = await formRef.current?.validateFields();
    if (valid) {
      setTabStatus((prev) => ({
        ...prev,
        [activeTab]: 'valid',
      }));
      setActiveTab(key);
    } else {
      message.error('請先完成目前頁籤的欄位');
    }
  };

  const handleFinish = async () => {
    const valid = await formRef.current?.validateFields();
    if (valid) {
      const updatedStatus: Record<string, 'pending' | 'valid'> = {
        ...tabStatus,
        [activeTab]: 'valid',
      };
      setTabStatus(updatedStatus);

      const allValid = Object.entries(updatedStatus).every(([, status]) => status === 'valid');
      if (allValid) {
        const values = formRef.current?.getFieldsValue();
        console.log('✅ 當前表單資料:', values);
        message.success('送出成功');
      } else {
        message.error('尚有未完成的頁籤，請逐一檢查');
      }
    } else {
      message.error('請先完成目前頁籤的欄位');
    }
  };

  return (
    <ProForm
      formRef={formRef}
      submitter={false}
      layout="vertical"
      style={{ padding: 16 }}
    >
      <InfoForm formRef={formRef} />

      <Card
        style={{
          marginTop: 16,             // 卡片頂部與上方元素保持16px間距
          position: 'sticky',        // 使卡片在滾動時固定於視窗頂部（吸頂效果）
          top: 0,                    // sticky定位距離視窗頂端0像素
          zIndex: 1,                 // 堆疊順序，確保卡片在其他元素上方顯示
          background: 'transparent', // 背景透明，達到幽靈卡片視覺效果
          boxShadow: 'none',         // 取消陰影，讓卡片外觀更扁平
          border: 'none',            // 移除卡片邊框
          marginLeft: -24,           // 往左負外距24px，抵銷外層容器通常的24px padding，讓卡片內容貼齊左側
          marginRight: -24,          // 同理，若需要兩側貼齊，也往右負外距24px
        }}
        styles={{
          body: {
            padding: 12              // 卡片內容區域內邊距12px，讓內容不緊貼邊緣
          }
        }}
        tabList={tabs.map(({ key, label }) => ({ key, tab: label }))} // 卡片標籤頁配置，key和標籤文字
        activeTabKey={activeTab}                                      // 目前激活的標籤key，用以控制內容顯示
        onTabChange={handleTabChange}                                 // 標籤切換時呼叫的函式，切換activeTab狀態
      >
        <div id='tabContent' style={{ maxHeight: 800, overflowY: 'auto', padding: 8 }}>
          {tabs.find((tab) => tab.key === activeTab)?.children}
          
      <BackTop
        target={() => document.getElementById('tabContent') || window}
        visibilityHeight={100}
        style={{
          position: 'fixed',
          right: 60,
          bottom: 100,
        }}
      />
        </div>
      </Card>

      <FooterToolbar>
        <Button type="primary" onClick={handleFinish}>提交</Button>
      </FooterToolbar>

    </ProForm>
  );
}

export default TabbedFormPage;
