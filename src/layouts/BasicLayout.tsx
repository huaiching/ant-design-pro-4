/**
 * Ant Design Pro v4 使用 `@ant-design/pro-layout` 來處理佈局。
 *
 * @see 你可以查看組件API：https://github.com/ant-design/ant-design-pro-layout
 */
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef } from 'react';
import type { Dispatch } from 'umi';
import { Link, useIntl, connect, history } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import type { ConnectState } from '@/models/connect';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.svg';

// 無權限訪問時顯示的頁面
const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

// 定義 BasicLayout 的 props 類型
export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;  // 麵包屑名稱映射
  route: ProLayoutProps['route'] & {
    authority: string[];  // 路由權限
  };
  settings: Settings;  // 佈局設置
  dispatch: Dispatch;  // dispatch 方法
} & ProLayoutProps;

// 定義 BasicLayout 上下文類型
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

/** 使用 Authorized 檢查所有菜單項的權限 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

// 預設的頁腳內容
// const defaultFooterDom = (
//   <DefaultFooter
//     copyright={`${new Date().getFullYear()} Produced by Ant Group Experience Technology Department`}
//     links={[
//       {
//         key: 'Ant Design Pro',
//         title: 'Ant Design Pro',
//         href: 'https://pro.ant.design',
//         blankTarget: true,
//       },
//       {
//         key: 'github',
//         title: <GithubOutlined />,
//         href: 'https://github.com/ant-design/ant-design-pro',
//         blankTarget: true,
//       },
//       {
//         key: 'Ant Design',
//         title: 'Ant Design',
//         href: 'https://ant.design',
//         blankTarget: true,
//       },
//     ]}
//   />
// );

// 基礎佈局組件
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  // 使用 useRef 來保存菜單數據
  const menuDataRef = useRef<MenuDataItem[]>([]);

  // 組件掛載時獲取當前用戶信息
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  /** 處理菜單折疊事件 */
  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  // 獲取當前路由的權限信息
  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );

  const { formatMessage } = useIntl();

  return (
    <ProLayout
      logo={logo}  // 設置 logo
      formatMessage={formatMessage}  // 設置國際化格式化方法
      headerRender={false}  // 完全隱藏頂部Header
      // menuHeaderRender={false}  // 隱藏菜單頭部(logo和標題)
      // collapsedButtonRender={false}  // 隱藏摺疊按鈕
      {...props}
      {...settings}
      onCollapse={handleMenuCollapse}  // 折疊菜單的回調
      onMenuHeaderClick={() => history.push('/')}  // 點擊菜單頭部的回調
      // 自定義菜單項渲染
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      // 自定義麵包屑渲染
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({ id: 'menu.home' }),  // 首頁麵包屑
        },
        ...routers,
      ]}
      // 自定義麵包屑項渲染
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      // 頁腳渲染
      // footerRender={() => {
      //   if (settings.footerRender || settings.footerRender === undefined) {
      //     return defaultFooterDom;
      //   }
      //   return null;
      // }}
      menuDataRender={menuDataRender}  // 菜單數據渲染
      rightContentRender={() => <RightContent />}  // 右側內容渲染
      // 菜單數據處理後的回調
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
      // 水印設置
      // waterMarkProps={{
      //   content: 'Ant Design Pro',
      //   fontColor: 'rgba(24,144,255,0.15)',
      // }}
    >
      {/* 檢查權限，無權限時顯示 noMatch */}
      <Authorized authority={authorized!.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

// 使用 connect 連接 redux
export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,  // 獲取折疊狀態
  settings,  // 獲取設置
}))(BasicLayout);