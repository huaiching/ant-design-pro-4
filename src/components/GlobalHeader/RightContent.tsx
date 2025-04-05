import { Tooltip, Tag } from 'antd';
import type { Settings as ProSettings } from '@ant-design/pro-layout';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import type { ConnectProps } from 'umi';
import { connect, SelectLang } from 'umi';
import type { ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';  // 頭像下拉組件
import HeaderSearch from '../HeaderSearch';  // 頭部搜索組件
import styles from './index.less';  // 樣式文件

// 定義 GlobalHeaderRight 組件的 props 類型
export type GlobalHeaderRightProps = {
  theme?: ProSettings['navTheme'] | 'realDark';  // 主題設置，可選暗色主題
} & Partial<ConnectProps> &  // 可選的 Umi connect props
  Partial<ProSettings>;  // 可選的 ProLayout 設置

// 環境標籤顏色配置
const ENVTagColor = {
  dev: 'orange',  // 開發環境 - 橙色
  test: 'green',  // 測試環境 - 綠色
  pre: '#87d068',  // 預發布環境 - 淺綠色
};

// 全局頭部右側組件
const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout } = props;
  let className = styles.right;  // 基礎樣式類名

  // 如果是暗色主題且頂部佈局，添加暗色樣式
  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>      
      {/* 用戶頭像下拉組件 */}
      <Avatar />
      
      {/* 環境標籤顯示 */}
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      
      {/* 語言選擇組件 */}
      <SelectLang className={styles.action} />
    </div>
  );
};

// 使用 connect 連接 redux，獲取主題和佈局設置
export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,  // 導航主題
  layout: settings.layout,  // 佈局方式
}))(GlobalHeaderRight);