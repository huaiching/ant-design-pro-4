import React, { useEffect, useState, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';

// 共用模組
interface TabProps {
  pageCode: string;
  pageDesc: string;
  tabs: {
    key: string;
    title: string;
    component: React.ReactNode;
    authCode: string;
    disabled?: boolean;
  }[];
}

/**
 * 程式 Index 頁面的基本模組
 */
const BaseMainIndex: React.FC<TabProps> = ({ pageCode, pageDesc, tabs }) => {
  const [pageTitle, setPageTitle] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [programTitle, setProgramTitle] = useState<string>('');

  // 設定程式標題
  useEffect(() => {
    const title = `${pageDesc}(${pageCode})`;
    setProgramTitle(title);
  }, [pageCode, pageDesc]);

  // 取得網址列中的 activeKey 或預設為第一個 tab
  const activeKey = useMemo(() => {
    return new URLSearchParams(location.search).get('activeKey') ?? tabs.find((item) => item.authCode)?.key ?? '';
  }, [location.search, tabs]);

  // 設定目前的 activeKey 值
  const [currentActiveKey, setCurrentActiveKey] = useState(activeKey);

  // 當 currentActiveKey 變更時，更新網址列
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('activeKey', currentActiveKey);
    navigate({ search: searchParams.toString() }, { replace: true });
  }, [currentActiveKey, navigate]);

  // 設定頁面標題
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.key === currentActiveKey);
    if (currentTab) {
      setPageTitle(`${programTitle} - ${currentTab.title}`);
    }
  }, [programTitle, currentActiveKey, tabs]);

  return (
    <PageContainer title={pageTitle}>
      <Tabs
        type="card"
        activeKey={currentActiveKey}
        onChange={(key: string) => {
          setCurrentActiveKey(key);
        }}
      >
        {tabs.map((item) => (
          <TabPane tab={item.title} key={item.key} disabled={item.disabled}>
            {item.component}
          </TabPane>
        ))}
      </Tabs>
    </PageContainer>
  );
};

export default BaseMainIndex;
