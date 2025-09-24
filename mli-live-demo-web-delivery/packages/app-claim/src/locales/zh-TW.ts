import { commonLocales } from '@mli-csmo/app-common/src/util/locales/zh-TW'
import home from './zh-TW/home'
import integrationquery from './zh-TW/integrationquery'
import menu from './zh-TW/menu'
import pagecontent from './zh-TW/pagecontent'

export default {
  'micro.app.claim.title': '理賠資訊',
  ...commonLocales,
  ...menu,
  ...home,
  ...integrationquery,
  ...pagecontent
}
