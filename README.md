# Ant Design Pro 4 練習專案

本專案為基於 [Ant Design Pro v4](https://github.com/ant-design/ant-design-pro) 的練習專案，旨在熟悉 React 框架與 Ant Design Pro 中台前端解決方案的整合與使用。



# 安裝依賴
yarn install

# 啟動開發伺服器
``node <  16`` : yarn start 

``node >= 16`` : yarn start:new

啟動後預設網址為： http://localhost:8000

# 刪除依賴
yarn clean

# 主題與佈局設定
主題與佈局相關設定可於 `config/config.ts` 或 `src/defaultSettings.ts` 中調整：
```
export default {
  navTheme: 'dark', // 導覽列主題：'dark' | 'light'
  primaryColor: '#1890FF', // 主色
  layout: 'sidemenu', // 佈局方式：'sidemenu' | 'topmenu'
  contentWidth: 'Fluid', // 內容寬度：'Fixed' | 'Fluid'
  fixedHeader: false, // 固定頁首
  fixSiderbar: false, // 固定側邊欄
};
```
