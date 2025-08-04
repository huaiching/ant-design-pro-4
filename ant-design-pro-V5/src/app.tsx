import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import React from 'react';
import {
  AvatarDropdown,
  AvatarName,
  Footer,
  Question,
  SelectLang,
} from '@/components';
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import '@ant-design/v5-patch-for-react-19';
import MliLogo from '@/assets/logo.png'
import '@/utils/minguoDatePicker'

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (_error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (
    ![loginPath, '/user/register', '/user/register-result'].includes(
      location.pathname,
    )
  ) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}
// ProLayout 支持的 API 文檔：https://procomponents.ant.design/components/layout
// 導出 RunTimeLayoutConfig 類型的佈局配置函數，用於動態配置 ProLayout
export const layout: RunTimeLayoutConfig = ({
  // initialState：初始狀態，包含當前用戶信息、設置等
  initialState,
  // setInitialState：用於更新初始狀態的函數
  setInitialState,
}) => {
  return {
    logo: MliLogo,
    // actionsRender：自定義右上角的操作按鈕區域
    actionsRender: () => [
      // 渲染一個問號按鈕（通常用於幫助或文檔入口）
      <Question key="doc" />,
      // 渲染語言選擇下拉框，用於切換語言
      <SelectLang key="SelectLang" />,
    ],
    // avatarProps：配置右上角用戶頭像的屬性
    // avatarProps: {
    //   // 頭像圖片來源，從 initialState.currentUser.avatar 獲取
    //   src: initialState?.currentUser?.avatar,
    //   // 頭像旁顯示的標題，使用自定義的 AvatarName 組件
    //   title: <AvatarName />,
    //   // 自定義頭像渲染邏輯，將頭像包裹在 AvatarDropdown 組件中
    //   render: (_, avatarChildren) => {
    //     return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
    //   },
    // },
    // footerRender：自定義頁腳渲染，返回 Footer 組件
    // footerRender: () => <Footer 。>,。
    // onPageChange：頁面切換時的回調函數
    onPageChange: () => {
      // 獲取當前路由信息
      const { location } = history;
      // 如果用戶未登錄（initialState.currentUser 為空）且當前頁面不是登錄頁
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        // 重定向到登錄頁面
        history.push(loginPath);
      }
    },
    // bgLayoutImgList：配置背景圖片列表，顯示在佈局背景中
    bgLayoutImgList: [
      {
        // 第一張背景圖片的 URL
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        // 圖片左邊距 85px
        left: 85,
        // 圖片底部距離 100px
        bottom: 100,
        // 圖片高度 303px
        height: '303px',
      },
      {
        // 第二張背景圖片的 URL
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        // 圖片底部距離 -68px（超出底部，部分不可見）
        bottom: -68,
        // 圖片右邊距 -45px（超出右邊，部分不可見）
        right: -45,
        // 圖片高度 303px
        height: '303px',
      },
      {
        // 第三張背景圖片的 URL
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        // 圖片底部對齊佈局底部
        bottom: 0,
        // 圖片左邊對齊佈局左邊
        left: 0,
        // 圖片寬度 331px
        width: '331px',
      },
    ],
    // links：配置側邊欄底部的鏈接，僅在開發環境（isDev）下顯示
    // links: isDev
    //   ? [
    //       // OpenAPI 文檔鏈接，點擊後在新窗口打開
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //     ]
    //   : [], // 生產環境下不顯示任何鏈接
    // menuHeaderRender：設置為 undefined，表示使用默認的側邊欄頭部渲染（通常是 logo 和標題）
    menuHeaderRender: undefined,
    // unAccessible：自定義 403 無權訪問頁面（當前被註釋掉）
    // unAccessible: <div>unAccessible</div>,
    // childrenRender：自定義子組件的渲染邏輯
    childrenRender: (children) => {
      // 如果 initialState.loading 為 true，顯示加載頁面（當前被註釋掉）
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {/* 渲染子組件（頁面內容） */}
          {children}
          {/* 僅在開發環境下顯示設置抽屜 */}
          {/* {isDev && (
            <SettingDrawer
              // 禁用 URL 參數控制設置
              disableUrlParams
              // 啟用暗色主題切換
              enableDarkTheme
              // 傳遞當前設置狀態
              settings={initialState?.settings}
              // 當設置改變時，更新 initialState 中的 settings
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )} */}
        </>
      );
    },
    // 將 initialState.settings 中的配置展開，應用到 ProLayout
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  baseURL: 'https://proapi.azurewebsites.net',
  ...errorConfig,
};
