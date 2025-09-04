import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import React from 'react';
import { Footer, Question, SelectLang } from '@/components';
import defaultSettings from '../config/defaultSettings';
import MliLogo from '@/assets/logo.png';
import '@ant-design/v5-patch-for-react-19';
import '@/utils/minguoDatePicker';

/**
 * 初始化狀態（不再檢查登入）
 */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
}> {
  return {
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

/**
 * ProLayout 配置
 */
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    logo: MliLogo,
    actionsRender: () => [
      <Question key="doc" />,
      <SelectLang key="SelectLang" />,
    ],
    menuHeaderRender: undefined,
    childrenRender: (children) => {
      return <>{children}</>;
    },
    footerRender: () => <Footer />,
    ...initialState?.settings,
  };
};

/**
 * 請求配置（移除登入攔截）
 */
export const request: RequestConfig = {
  // 這裡可以換成你自己的 API baseURL
  baseURL: 'https://proapi.azurewebsites.net',
};
