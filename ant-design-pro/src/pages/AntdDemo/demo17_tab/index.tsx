import React, { useRef, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormInstance, ProFormText, ProFormGroup, ProFormSelect, ProFormItem } from '@ant-design/pro-form';
import { AutoComplete, BackTop, Button, Col, Layout, Tabs, message } from 'antd';
import Tab1 from './components/Tab1';
import Tab2 from './components/Tab2';
import Tab3 from './components/Tab3';
import Card1 from './components/Card1';
import MliFormRow from '@/common/components/form/MliFormRow';
import ProCard from '@ant-design/pro-card';
import { Content, Header } from 'antd/lib/layout/layout';

const { TabPane } = Tabs;

const tabConfig = [
  { key: 'tab1', title: '分頁1', component: Tab1 },
  { key: 'tab2', title: '分頁2', component: Tab2 },
  { key: 'tab3', title: '分頁3', component: Tab3 },
];

// Taiwanese counties for the dropdown
const countyOptions = [
  { label: '臺北市', value: '臺北市' },
  { label: '新北市', value: '新北市' },
  { label: '桃園市', value: '桃園市' },
  { label: '臺中市', value: '臺中市' },
  { label: '臺南市', value: '臺南市' },
  { label: '高雄市', value: '高雄市' },
  { label: '基隆市', value: '基隆市' },
  { label: '新竹市', value: '新竹市' },
  { label: '嘉義市', value: '嘉義市' },
  { label: '新竹縣', value: '新竹縣' },
  { label: '苗栗縣', value: '苗栗縣' },
  { label: '彰化縣', value: '彰化縣' },
  { label: '南投縣', value: '南投縣' },
  { label: '雲林縣', value: '雲林縣' },
  { label: '嘉義縣', value: '嘉義縣' },
  { label: '屏東縣', value: '屏東縣' },
  { label: '宜蘭縣', value: '宜蘭縣' },
  { label: '花蓮縣', value: '花蓮縣' },
  { label: '臺東縣', value: '臺東縣' },
  { label: '澎湖縣', value: '澎湖縣' },
  { label: '金門縣', value: '金門縣' },
  { label: '連江縣', value: '連江縣' },
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

  const ActiveComponent = tabConfig.find(item => item.key === activeTab)?.component;

  return (
      <>
      <PageContainer title="表單 Tab 範例" style={{ width: '100%' }} />
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        onFinish={handleSubmit}
        submitter={{
          render: () => (
            <FooterToolbar>
              <Button key="prev" onClick={handlePrevTab} disabled={activeTab === 'tab1'}>
                上一頁
              </Button>
              <Button key="next" onClick={handleNextTab} disabled={activeTab === 'tab3'}>
                下一頁
              </Button>
              <Button
                key="submit"
                type="primary"
                onClick={handleSubmit}
              >
                送出
              </Button>
            </FooterToolbar>
          )
        }}
      >
        {/* <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            position: 'fixed', // 固定在頁面頂部
            top: 0, // 頂部對齊
            width: '100%', // 寬度佔滿頁面
            height: '50vh', // 高度為視口高度的 50%
            zIndex: 1000, // 確保層級高於其他內容
            // padding: 0, // 移除預設內邊距
            // paddingLeft: 4, // 左邊距
            // paddingTop: 25, // 上邊距
            // margin: 0, // 移除外邊距
            backgroundColor: '#f0f2f5', // 設置透明底色
          }}
        > */}
        {/* 基本資料 */}
        <ProCard ghost style={{ width: '100%' }}>
          <MliFormRow>
            <ProFormText
              name={['basic', 'clientId']}
              label="申請人ID"
              rules={[{ required: true, message: '請輸入申請人ID' }]}
              fieldProps={{
                onBlur: async (e) => {
                  const clientId = e.target.value;
                  if (clientId) {
                    // 模擬 API 呼叫以獲取申請人姓名
                    const names = await new Promise<string>((resolve) => {
                      setTimeout(() => resolve('張三'), 1000); // 模擬延遲
                    });
                    formRef.current?.setFieldsValue({
                      basic: { names }
                    });
                  }
                }
              }}
            />
            <ProFormText
              name={['basic', 'names']}
              label="申請人姓名"
              disabled
              readonly
            />
          </MliFormRow>
          <MliFormRow>
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
          </MliFormRow>
          <MliFormRow>
            <ProFormGroup title="地址資訊" titleStyle={{ fontWeight: 'normal' }}>
              <ProFormSelect
                name={['basic', 'address', 'county']}
                placeholder="請選擇縣市"
                rules={[{ required: true, message: '請選擇縣市' }]}
                width="sm"
                colProps={{ span: 8 }}
                options={countyOptions}
                showSearch
              />
              <ProFormText
                name={['basic', 'address', 'district']}
                placeholder="請輸入區"
                rules={[{ required: true, message: '請輸入區' }]}
                width="sm"
                colProps={{ span: 8 }}
              />
              <ProFormText
                name={['basic', 'address', 'road']}
                placeholder="請輸入路段"
                rules={[{ required: true, message: '請輸入路段' }]}
                width="md"
                colProps={{ span: 8 }}
              />
            </ProFormGroup>
          </MliFormRow>
          <MliFormRow>
            <Col span={3}>
              <ProFormItem
                name={['basic', 'customInput']}
                label="偏好飲料"
                rules={[{ required: true, message: '請輸入或選擇飲料' }]}
              >
                <AutoComplete
                  placeholder="請輸入或選擇飲料"
                  options={[
                    { label: '紅茶', value: '1' },
                    { label: '綠茶', value: '2' },
                    { label: '咖啡', value: '3' },
                  ]}
                  allowClear
                />
              </ProFormItem>
            </Col>
          </MliFormRow>
        </ProCard>

        {/* 分頁1 */}
        <Card1 formRef={formRef} />
        {/* </Header> */}

 
        {/* <Content
          style={{
            marginTop: '50vh', // 從視口高度 50% 處開始，避免被 Header 遮擋
            height: '50vh', // 高度為視口高度的 50%
            padding: '0 16px', // 左右邊距 16px
          }}
        > */}
        {/* Tab 分頁 */}
        <ProCard ghost style={{ width: '100%' }}>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            {tabConfig.map(({ key, title }) => (
              <TabPane tab={title} key={key} />
            ))}
          </Tabs>
        </ProCard>

        {/* 動態載入的 Tab 內容 */}
        <ProCard ghost style={{ width: '100%' }}>
          {ActiveComponent && <ActiveComponent formRef={formRef} />}
        </ProCard>
        {/* </Content>
        </Layout> */}
      </ProForm>
      <BackTop/>
      </>
  );
};

export default TabExample;