import { mircoConfig } from '@mli-csmo/app-common/src/config/mircoConfig'
import { defineConfig } from '@umijs/max'
import { join } from 'path'
import routes from './routes'

const PUBLIC_PATH: string = '/'

export default defineConfig({
  ...mircoConfig,
  // ...現有配置...
  chainWebpack(memo) {
    // 添加文件分割規則
    memo.optimization.splitChunks({
      chunks: 'all',
      minSize: 20000,
      maxSize: 500000,
      minChunks: 1,
      cacheGroups: {
        locales: {
          name: 'locales',
          test: /[\\/]locales[\\/].*\.(json|js|ts)$/,
          chunks: 'all',
          priority: 20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    })
  },
  // 開啟構建分析
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888
  },
  mf: {
    name: 'mfHost',
    remotes: [
      // 可按需配置遠程模塊
    ],
    shared: {
      react: { singleton: true },
      'react-dom': { singleton: true }
    }
  },
  publicPath: PUBLIC_PATH,
  /**
   * @name <head> 中額外的 script
   * @description 配置 <head> 中額外的 script
   */
  headScripts: [
    // 解決首次載入時白屏的問題
    { src: join(PUBLIC_PATH, 'scripts/loading.js'), async: true }
  ],
  routes
})
