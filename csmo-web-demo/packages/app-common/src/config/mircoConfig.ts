import type { ProLayoutProps } from '@ant-design/pro-components'

const { REACT_APP_ENV, NODE_ENV } = process.env

const isProdEnv = NODE_ENV === 'production'

export const layoutDefaultSettings: ProLayoutProps & {
  pwa?: boolean
  logo?: string
} = {
  locale: 'zh-TW',
  navTheme: 'light',
  contentWidth: 'Fluid',
  // siderWidth: 220,
  pwa: false
}

export const mircoConfig: any = {
  model: {},
  initialState: {},
  hash: true,
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    // siderWidth: 220,
    ...layoutDefaultSettings
  },
  /**
   * @name 國際化插件
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    default: 'zh-TW',
    antd: true,
    baseNavigator: false
  },
  access: {},
  theme: {
    'primary-color': '#096DD9',
    'root-entry-name': 'default',
    'font-size-base': '16px'
  },
  title: 'Mli',
  manifest: {
    basePath: '/'
  },
  fastRefresh: true,
  // pro 插件配置
  presets: ['umi-presets-pro'],
  esbuildMinifyIIFE: true,
  requestRecord: {},
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false
  },
  qiankun: {
    slave: {}
  },
  codeSplitting: {
    jsStrategy: 'granularChunks'
  },
  mako: isProdEnv ? false : {}
}
