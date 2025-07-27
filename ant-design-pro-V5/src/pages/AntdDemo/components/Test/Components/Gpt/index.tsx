import React, { useRef, useState } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormInstance,
} from '@ant-design/pro-components';
import { Card, Tabs, Button, message, BackTop } from 'antd';
import type { TabsProps } from 'antd';

const InfoForm = () => (
  <Card title="基本資訊">
    <p>這裡是頁面基本資訊展示區域</p>
    <p>可以顯示用戶資訊、系統狀態等</p>
  </Card>
);

const TabContent1 = () => (
  <>
    <ProFormText name="tab1.address" label="地址" rules={[{ required: true }]} />
    <ProFormText name="tab1.phone" label="電話" rules={[{ required: true }]} />
    <div style={{ height: '1000px' }}>長內容區域...</div>
  </>
);

const TabContent2 = () => (
  <>
    <ProFormText name="tab2.address" label="地址" rules={[{ required: true }]} />
    <ProFormText name="tab2.phone" label="電話" rules={[{ required: true }]} />
    <div style={{ height: '1000px' }}>長內容區域...</div>
  </>
);

const TabbedFormPage: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [activeTab, setActiveTab] = useState('tab1');

  // 儲存各個 tab 的狀態（'pending' | 'valid'）
  const [tabStatus, setTabStatus] = useState<Record<string, 'pending' | 'valid'>>({
    tab1: 'pending',
    tab2: 'pending',
  });

  const tabs: TabsProps['items'] = [
    {
      key: 'tab1',
      label: '聯絡資訊',
      children: <TabContent1 />,
    },
    {
      key: 'tab2',
      label: '其他資訊',
      children: <TabContent2 />,
    },
  ];

  const handleTabChange = async (key: string) => {
    // 驗證當前表單
    const valid = await formRef.current?.validateFields();
    // 驗證成功 將 更新狀態 與 切換頁簽
    if (valid) {
      // 更新狀態為 valid
      setTabStatus((prev) => ({
        ...prev,
        [activeTab]: 'valid',
      }));
      // 切換到新 tab
      setActiveTab(key);
    } else {
      message.error('請先完成目前頁籤的欄位');
    }
  };

  const handleFinish = async () => {
    // 驗證當前表單
    const valid = await formRef.current?.validateFields();
    // 驗證成功 將 更新狀態
    if (valid) {
      // 更新狀態為 valid
      const updatedStatus: Record<string, 'pending' | 'valid'> = {
        ...tabStatus,
        [activeTab]: 'valid',
      };
      setTabStatus(updatedStatus)
      // 檢查所有 tab 狀態
      const allValid = Object.entries(updatedStatus)
        .filter(([key, status]) => key !== activeTab && status === 'valid')
      if (allValid) {
        // 如果所有 tab 都有效，則可以進行提交
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
      <InfoForm />

      <Card
        style={{ marginTop: 16, position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}
        tabList={tabs.map(({ key, label }) => ({ key, tab: label }))}
        activeTabKey={activeTab}
        onTabChange={handleTabChange}
      >
        <div style={{ maxHeight: 400, overflowY: 'auto', padding: 8 }}>
          {tabs.find((tab) => tab.key === activeTab)?.children}
        </div>
      </Card>

      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={handleFinish}>提交</Button>
      </div>

      <BackTop visibilityHeight={100} />
    </ProForm>
  );
}
export default TabbedFormPage;
