import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { Button, Tabs, message } from 'antd';
import Tab1 from './components/StepOne';
import Tab2 from './components/StepTwo';
import Tab3 from './components/StepThree';

const { TabPane } = Tabs;

const TabExample: React.FC = () => {
  const formRef = useRef<ProFormInstance>(null);
  const [activeTab, setActiveTab] = useState<string>('tab1');

  // 表單提交處理
  const handleSubmit = async () => {
    try {
      const values = await formRef.current?.validateFields();
      console.log('Form Values:', values);
      message.success('表單數據已輸出至控制台');
    } catch (error) {
      message.error('表單驗證失敗');
    }
  };

  // 切換 Tab 並觸發驗證
  const handleTabChange = (key: string) => {
    formRef.current?.validateFields().then(() => {
      setActiveTab(key);
    }).catch(() => {
      message.error('請先修正當前頁面表單錯誤');
    });
  };

  // 上一頁
  const handlePrevTab = () => {
    const tabs = ['tab1', 'tab2', 'tab3'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      handleTabChange(tabs[currentIndex - 1]);
    }
  };

  // 下一頁
  const handleNextTab = () => {
    const tabs = ['tab1', 'tab2', 'tab3'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      handleTabChange(tabs[currentIndex + 1]);
    }
  };

  return (
    <PageContainer
      title="表單 Tab 範例"
      content="這是一個帶有基本資料和多個 Tab 的表單範例"
    >
      <ProForm
        formRef={formRef}
        onFinish={handleSubmit}
        submitter={{
          render: () => [
            <Button
              key="prev"
              onClick={handlePrevTab}
              disabled={activeTab === 'tab1'}
            >
              上一頁
            </Button>,
            <Button
              key="next"
              onClick={handleNextTab}
              disabled={activeTab === 'tab3'}
            >
              下一頁
            </Button>,
            <Button key="submit" type="primary" onClick={handleSubmit}>
              送出
            </Button>,
          ],
        }}
      >
        {/* 上區：基本資料 */}
        <div style={{ background: '#fff', padding: 24, marginBottom: 24 }}>
          <h3>基本資料</h3>
          <ProFormText
            name="name"
            label="姓名"
            rules={[{ required: true, message: '請輸入姓名' }]}
          />
          <ProFormText
            name="email"
            label="電子郵件"
            rules={[{ required: true, message: '請輸入電子郵件' }]}
          />
        </div>

        {/* 下區：Tabs */}
        <div style={{ background: '#fff', padding: 24 }}>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="分頁1" key="tab1">
              <Tab1 formRef={formRef} />
            </TabPane>
            <TabPane tab="分頁2" key="tab2">
              <Tab2 formRef={formRef} />
            </TabPane>
            <TabPane tab="分頁3" key="tab3">
              <Tab3 formRef={formRef} />
            </TabPane>
          </Tabs>
        </div>
      </ProForm>
    </PageContainer>
  );
};

export default TabExample;