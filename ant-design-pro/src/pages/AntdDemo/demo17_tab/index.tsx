import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { Button, Card, Tabs, message } from 'antd';
import Tab1 from './components/Tab1';
import Tab2 from './components/Tab2';
import Tab3 from './components/Tab3';

const { TabPane } = Tabs;

const tabConfig = [
  { key: 'tab1', title: '分頁1', component: Tab1 },
  { key: 'tab2', title: '分頁2', component: Tab2 },
  { key: 'tab3', title: '分頁3', component: Tab3 },
];

const TabExample: React.FC = () => {
  const formRef = useRef<ProFormInstance>(null);
  const [activeTab, setActiveTab] = useState<string>('tab1');

  // 記錄 tab 是否完成驗證
  const [tabCompletion, setTabCompletion] = useState<Record<string, boolean>>({
    tab1: false,
    tab2: false,
    tab3: false,
  });

  // 驗證特定 tab 欄位
  const validateTab = async (tabKey: string): Promise<boolean> => {
    const fields = await formRef.current?.validateFields([
      [tabKey, 'field1'],
      [tabKey, 'field2'],
    ]);
    if (fields) {
      setTabCompletion(prev => ({ ...prev, [tabKey]: true }));
      return true;
    }
    return false;
  };

  const handleTabChange = async (key: string) => {
    try {
      await validateTab(activeTab);
      setActiveTab(key);
    } catch (error) {
      message.error('請先修正當前頁面錯誤');
    }
  };

  const handleSubmit = async () => {
    // 驗證當前 Tab
    try {
      await validateTab(activeTab);
    } catch {
      message.error('請修正當前頁面欄位');
      return;
    }

    // 檢查其他 Tab 是否已完成
    for (const tab of tabConfig) {
      if (tab.key !== activeTab && !tabCompletion[tab.key]) {
        message.error(`請完成 ${tab.title}`);
        return;
      }
    }

    // 全部條件通過，可送出
    try {
      const allValues = await formRef.current?.validateFields();
      console.log('表單送出成功，使用者輸入資料如下：', allValues);
      message.success('表單送出成功');
    } catch {
      message.error('表單驗證錯誤');
    }
  };

  const handlePrevTab = () => {
    const index = tabConfig.findIndex(tab => tab.key === activeTab);
    if (index > 0) setActiveTab(tabConfig[index - 1].key);
  };

  const handleNextTab = async () => {
    try {
      await validateTab(activeTab);
      const index = tabConfig.findIndex(tab => tab.key === activeTab);
      if (index < tabConfig.length - 1) setActiveTab(tabConfig[index + 1].key);
    } catch {
      message.error('請修正當前頁面錯誤');
    }
  };

  return (
    <PageContainer title="表單 Tab 範例" content="這是一個帶有基本資料和多個 Tab 的表單範例">
      <ProForm
        formRef={formRef}
        onFinish={handleSubmit}
        submitter={{
          render: () => [
            <Button key="prev" onClick={handlePrevTab} disabled={activeTab === 'tab1'}>
              上一頁
            </Button>,
            <Button key="next" onClick={handleNextTab} disabled={activeTab === 'tab3'}>
              下一頁
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleSubmit}
            >
              送出
            </Button>,
          ],
        }}
      >
        {/* 基本資料 */}
        <Card title="基本資料">
          <ProFormText 
           name={['basic', 'clientId']} 
           label="申請人ID" 
           rules={[{ required: true, message: '請輸入申請人ID' }]} 
          />
          <ProFormText 
           name={['basic', 'policyNo']} 
           label="保單號碼" 
           rules={[{ required: true, message: '請輸入保單號碼' }]} 
          />
          <ProFormText 
           name={['basic', 'receiveNo']} 
           label="受理號碼" 
           rules={[{ required: true, message: '請輸入受理號碼' }]} 
          />
        </Card>

        <br />

        <Card>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            {tabConfig.map(({ key, title, component: Component }) => (
              <TabPane tab={title} key={key}>
                <Component formRef={formRef} />
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </ProForm>
    </PageContainer>
  );
};

export default TabExample;
