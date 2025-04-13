import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};
const proSettings: DefaultSettings = {
  navTheme: 'light', 
  // 導覽列主題
  // 可選值：
  // - 'light'：亮色（預設）
  // - 'dark'：暗色
  // - 'realDark'：極暗（需搭配 dark 模式）

  primaryColor: '#fa541c',
  // 主色系（可自訂 HEX 色碼）
  // 官方預設色有：
  // - '#1890ff'（拂曉藍）
  // - '#f5222d'（薄暮）
  // - '#fa541c'（火山）
  // - '#faad14'（日暮）
  // - '#13c2c2'（明青）
  // - '#52c41a'（極光綠）
  // - '#2f54eb'（極客藍）
  // - '#722ed1'（酱紫）

  layout: 'side',
  // 佈局方式
  // 可選值：
  // - 'side'：側邊選單（預設）
  // - 'top'：頂部選單
  // - 'mix'：混合佈局（頂部+側邊）

  contentWidth: 'Fluid',
  // 內容區寬度（僅在 layout 為 'top' 或 'mix' 時有作用）
  // 可選值：
  // - 'Fluid'：流動寬度（隨畫面變動）
  // - 'Fixed'：固定寬度（一般為 1200px）

  fixedHeader: false,
  // 是否固定頁首
  // 可選值：
  // - true：固定
  // - false：不固定（預設）

  fixSiderbar: true,
  // 是否固定側邊欄（僅適用於 layout 為 'side' 或 'mix'）
  // 可選值：
  // - true：固定（預設）
  // - false：不固定

  colorWeak: false,
  // 是否開啟色弱模式
  // 可選值：
  // - true：啟用（高對比模式）
  // - false：關閉（預設）

  title: '三商美邦人壽',
  // 系統標題，會顯示在瀏覽器標籤與頁面標題區域

  pwa: false,
  // 是否啟用 PWA（漸進式網頁應用程式）
  // 可選值：
  // - true：啟用
  // - false：關閉（預設）

  iconfontUrl: '',
  // 自訂 IconFont 圖示字型的 URL
  // 可使用 https://www.iconfont.cn 上傳生成
};



export type { DefaultSettings };

export default proSettings;
