import React, { useRef, useState } from 'react';
import { Button, Card, Tabs, Form, message, Space } from 'antd';
import type { FormInstance } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import styles from './index.less';

// 上區資訊顯示組件
const InfoSection: React.FC = () => {
  return (
    <Card title="基本資訊" style={{ marginBottom: 16 }}>
      <p>這裡是頁面基本資訊展示區域</p>
      <p>可以顯示用戶資訊、系統狀態等</p>
    </Card>
  );
};

// Tab1 表單內容
const Tab1Content: React.FC<{ form: FormInstance }> = ({ form }) => {
  return (
    <div className={styles.tabContent}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '請輸入姓名' }]}
        >
          <input />
        </Form.Item>
        <Form.Item
          name="email"
          label="電子郵件"
          rules={[{ required: true, message: '請輸入電子郵件' }, { type: 'email', message: '請輸入有效電子郵件' }]}
        >
          <input />
        </Form.Item>
      </Form>
    </div>
  );
};

// Tab2 表單內容
const Tab2Content: React.FC<{ form: FormInstance }> = ({ form }) => {
  return (
    <div className={styles.tabContent}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="address"
          label="地址"
          rules={[{ required: true, message: '請輸入地址' }]}
        >
          <input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="電話"
          rules={[{ required: true, message: '請輸入電話' }]}
        >
          <input />
        </Form.Item>
      </Form>
    </div>
  );
};

// 主頁面組件
const PageModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('1');
  const formRef = useRef<FormInstance>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 處理 Tab 切換並檢核當前表單
  const handleTabChange = async (key: string) => {
    try {
      await formRef.current?.validateFields();
      setActiveTab(key);
    } catch (error) {
      message.error('請先完成當前表單的必填項');
    }
  };

  // 提交表單
  const handleSubmit = async () => {
    try {
      const values = await formRef.current?.validateFields();
      console.log('全部表單數據:', values);
      message.success('提交成功！請查看控制台');
    } catch (error) {
      message.error('請確保所有表單項都已正確填寫');
    }
  };

  // 回到頂部
  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      {/* 上區：資訊顯示 */}
      <InfoSection />

      {/* 下區：Tabs 和表單 */}
      <Card>
        <Form ref={formRef} layout="vertical">
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            tabBarExtraContent={
              <Space>
                <Button type="primary" onClick={handleSubmit}>
                  提交
                </Button>
                <Button icon={<ArrowUpOutlined />} onClick={scrollToTop}>
                  回到頂部
                </Button>
              </Space>
            }
          >
            <Tabs.TabPane tab="基本資料" key="1">
              <div ref={contentRef} className={styles.scrollableContent}>
                <Tab1Content form={formRef.current!} />
                {/* 模擬長內容 */}
                <div style={{ height: '1000px' }}>長內容區域...</div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="聯繫方式" key="2">
              <div ref={contentRef} className={styles.scrollableContent}>
                <Tab2Content form={formRef.current!} />
                {/* 模擬長內容 */}
                <div style={{ height: '1000px' }}>長內容區域...</div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </Card>
    </div>
  );
};

export default PageModule;