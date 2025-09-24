import { mircoConfig } from '@mli-csmo/app-common/src/config/mircoConfig'
import { defineConfig } from '@umijs/max'
import { join } from 'path'
import routes from './routes'

const PUBLIC_PATH: string = '/'

export default defineConfig({
  ...mircoConfig,
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
