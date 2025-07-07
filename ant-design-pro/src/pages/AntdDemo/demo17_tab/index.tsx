import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { Button, Card, Tabs, message } from 'antd';
import Tab1 from './components/Tab1';
import Tab2 from './components/Tab2';
import Tab3 from './components/Tab3';

const { TabPane } = Tabs;

// 定義 Tab 配置
const tabConfig = [
  {
    key: 'tab1',
    title: '分頁1',
    component: Tab1,
  },
  {
    key: 'tab2',
    title: '分頁2',
    component: Tab2,
  },
  {
    key: 'tab3',
    title: '分頁3',
    component: Tab3,
  },
];

const TabExample: React.FC = () => {
  const formRef = useRef<ProFormInstance>(null);
  const [activeTab, setActiveTab] = useState<string>(tabConfig[0].key);

  // 表單提交處理
  const handleSubmit = async () => {
    try {
      const values = await formRef.current?.validateFields();
      console.log('表單數據:', values);
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
    const currentIndex = tabConfig.findIndex(tab => tab.key === activeTab);
    if (currentIndex > 0) {
      handleTabChange(tabConfig[currentIndex - 1].key);
    }
  };

  // 下一頁
  const handleNextTab = () => {
    const currentIndex = tabConfig.findIndex(tab => tab.key === activeTab);
    if (currentIndex < tabConfig.length - 1) {
      handleTabChange(tabConfig[currentIndex + 1].key);
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
              disabled={activeTab === tabConfig[0].key}
            >
              上一頁
            </Button>,
            <Button
              key="next"
              onClick={handleNextTab}
              disabled={activeTab === tabConfig[tabConfig.length - 1].key}
            >
              下一頁
            </Button>,
            <Button key="submit" type="primary" onClick={handleSubmit}>
              送出
            </Button>,
          ],
        }}
      >
        {/* 基本資料區 */}
        <Card>
          <h3>基本資料</h3>
          <ProFormText
            name={['basic', 'name']}
            label="姓名"
            rules={[{ required: true, message: '請輸入姓名' }]}
          />
          <ProFormText
            name={['basic', 'email']}
            label="電子郵件"
            rules={[{ required: true, message: '請輸入電子郵件' }]}
          />
        </Card>
        <br />

        {/* Tab 區 */}
        <Card>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            {tabConfig.map(({ key, title, component: Component }) => (
              <TabPane tab={title} key={key}>
                <Component formRef={formRef} />
              </TabPane>
            ))}
          </Tabs>
        </Card>
        <br />
      </ProForm>
    </PageContainer>
  );
};

export default TabExample;