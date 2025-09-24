import { commonLocales } from '@mli-csmo/app-common/src/util/locales/en-US'
import home from './en-US/home'
import integrationquery from './en-US/integrationquery'
import menu from './en-US/menu'
import pagecontent from './en-US/pagecontent'

export default {
  'micro.app.claim.title': 'Claim Info',
  ...commonLocales,
  ...menu,
  ...integrationquery,
  ...home,
  ...pagecontent
}
