import { defineConfig } from '@umijs/max'
import { join } from 'path'
import routes from './routes'

import createBuildInfo from './createBuildInfo'

/**
 * @name 使用公開路徑
 * @description 部署時的路徑，如果部署在非根目錄下，需要設定這個
 * @doc https://umijs.org/docs/api/config#publicpath
 */
const PUBLIC_PATH: string = '/'

export default defineConfig({
  mfsu: false,
  /**
   * @name 開啟 hash 模式
   * @description 讓 build 之後的產物包含 hash 字尾。通常用於增量發布和避免瀏覽器載入快取。
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  publicPath: PUBLIC_PATH,
  /**
   * @name 路由的配置，不在路由中引入的檔案不會編譯
   * @description 只支援 path，component，routes，redirect
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name 主題的配置
   * @description 雖然叫主題，但其實只是 less 的變數設定
   * @doc antd 的主題設置 https://ant.design/docs/react/customize-theme-cn
   * @doc umi 的 theme 配置 https://umijs.org/docs/api/config#theme
   */
  theme: {
    'primary-color': '#096DD9',
    'root-entry-name': 'default',
    'font-size-base': '16px'
  },
  /**
   * @name moment 的國際化配置
   * @description 如果對國際化沒有要求，打開之後能減少 js 的包大小
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name 快速熱更新配置
   * @description 一個不錯的熱更新組件，更新時可以保留 state
   */
  fastRefresh: true,
  // 以下都是 max 的插件配置
  /**
   * @name 數據流插件
   * @doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * 一個全局的初始數據流，可以用它在插件之間共享數據
   * @description 可以用來存放一些全局的數據，比如用戶信息，或者一些全局的狀態，全局初始狀態在整個 Umi 專案的最開始創建。
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name layout 插件
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'Mli',
  layout: false,
  /**
   * @name 國際化插件
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    default: 'zh-TW',
    antd: true,
    // 預設true，當為true時，將使用`navigator.language`覆寫預設
    baseNavigator: false
  },
  favicons: [
    '/favicon.ico'
  ],
  qiankun: {
    master: {
      sandbox: {}
    }
  },
  /**
   * @name antd 插件
   * @description 內建了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */

  /**
   * @name 網路請求配置
   * @description 它基於 axios 和 ahooks 的 useRequest 提供了一套統一的網路請求和錯誤處理方案。
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name 權限插件
   * @description 基於 initialState 的權限插件，必須先開啟 initialState
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  /**
   * @name <head> 中額外的 script
   * @description 配置 <head> 中額外的 script
   */
  headScripts: [
    // 解決首次載入時白屏的問題
    { src: join(PUBLIC_PATH, 'scripts/loading.js'), async: true }
  ],
  // pro 插件配置
  presets: ['umi-presets-pro'],
  /**
   * @name 是否開啟 mako
   * @description 使用 mako 极速研發
   * @doc https://umijs.org/docs/api/config#mako
   */

  esbuildMinifyIIFE: true,
  requestRecord: {},
  chainWebpack: (memo, { webpack }) => {
    memo
      .plugin('define')
      .use(webpack.DefinePlugin, [
        {
          'process.env.UI_BUILD_INFO': createBuildInfo()
        }
      ])
      .end()
      .module.rule('ts-in-node_modules')
      .include.clear()
  },
  codeSplitting: {
    jsStrategy: 'granularChunks'
  }
})