import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs, Form, Button, message, BackTop } from 'antd';
import type { TabsProps, FormInstance } from 'antd';

const { TabPane } = Tabs;

const InfoSection: React.FC = () => {
  return (
    <Card title="資訊區塊" style={{ marginBottom: 24 }}>
      <p>這裡顯示重要的資訊內容</p>
      <p>可以放置統計數據、摘要或其他關鍵資訊</p>
    </Card>
  );
};

const Tab1Content: React.FC<{ form: FormInstance }> = ({ form }) => {
  return (
    <Form form={form} layout="vertical" name="tab1Form">
      <Form.Item
        name="field1"
        label="欄位1"
        rules={[{ required: true, message: '請輸入欄位1' }]}
      >
        <input placeholder="請輸入內容" />
      </Form.Item>
      <Form.Item
        name="field2"
        label="欄位2"
        rules={[{ required: true, message: '請輸入欄位2' }]}
      >
        <input placeholder="請輸入內容" />
      </Form.Item>
    </Form>
  );
};

const Tab2Content: React.FC<{ form: FormInstance }> = ({ form }) => {
  return (
    <Form form={form} layout="vertical" name="tab2Form">
      <Form.Item
        name="field3"
        label="欄位3"
        rules={[{ required: true, message: '請輸入欄位3' }]}
      >
        <input placeholder="請輸入內容" />
      </Form.Item>
      <Form.Item
        name="field4"
        label="欄位4"
        rules={[{ required: true, message: '請輸入欄位4' }]}
      >
        <input placeholder="請輸入內容" />
      </Form.Item>
    </Form>
  );
};

const Tab3Content: React.FC<{ form: FormInstance }> = ({ form }) => {
  return (
    <Form form={form} layout="vertical" name="tab3Form">
      <Form.Item
        name="field5"
        label="欄位5"
        rules={[{ required: true, message: '請輸入欄位5' }]}
      >
        <input placeholder="請輸入內容" />
      </Form.Item>
      <Form.Item
        name="field6"
        label="欄位6"
        rules={[{ required: true, message: '請輸入欄位6' }]}
      >
        <input placeholder="請輸入內容" />
      </Form.Item>
    </Form>
  );
};

const MultiTabFormPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const formRef = useRef<FormInstance>(null);
  const [form] = Form.useForm();

  // 初始化表單值
  useEffect(() => {
    form.setFieldsValue({
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
    });
  }, [form]);

  const handleTabChange = (key: string) => {
    // 切換tab前驗證當前tab
    form.validateFields()
      .then(() => {
        setActiveTab(key);
      })
      .catch((error) => {
        console.log('驗證錯誤:', error);
        message.error('請完成當前頁面的必填欄位');
      });
  };

  const handleSubmit = () => {
    // 驗證所有tab
    form.validateFields()
      .then((values) => {
        console.log('所有表單數據:', values);
        setFormValues(values);
        message.success('提交成功！請查看控制台輸出');
      })
      .catch((error) => {
        console.log('驗證錯誤:', error);
        message.error('請完成所有必填欄位');
      });
  };

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
      children: <Tab1Content form={form} />,
    },
    {
      key: '2',
      label: 'Tab 2',
      children: <Tab2Content form={form} />,
    },
    {
      key: '3',
      label: 'Tab 3',
      children: <Tab3Content form={form} />,
    },
  ];

  return (
    <PageContainer>
      <InfoSection />
      
      <Card
        title="表單編輯區"
        extra={
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
        }
      >
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          tabPosition="top"
          style={{ height: 'calc(100vh - 300px)', overflow: 'auto' }}
        >
          {tabItems.map(item => (
            <TabPane tab={item.label} key={item.key}>
              <div style={{ padding: '16px 0', overflowY: 'auto', maxHeight: 'calc(100vh - 400px)' }}>
                {item.children}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </Card>
      
      <BackTop visibilityHeight={100} />
    </PageContainer>
  );
};

export default MultiTabFormPage;