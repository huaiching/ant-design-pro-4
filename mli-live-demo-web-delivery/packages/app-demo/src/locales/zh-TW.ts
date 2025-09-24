import { commonLocales } from '@mli-csmo/app-common/src/util/locales/zh-TW'
import demo from './zh-TW/demo'
import home from './zh-TW/home'
import menu from './zh-TW/menu'

export default {
  'micro.app.demo.title': '展示',
  ...commonLocales,
  ...menu,
  ...home,
  ...demo
}
