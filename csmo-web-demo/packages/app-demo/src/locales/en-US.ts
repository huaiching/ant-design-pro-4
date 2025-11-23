import home from './en-US/home'
import menu from './en-US/menu'
import insuantdDemored from './en-US/antdDemo'
import { commonLocales } from '@mli-csmo/app-common/src/util/locales/en-US'


export default {
  'micro.app.demo.title': 'demo',
  ...commonLocales,
  ...menu,
    ...insuantdDemored,
  ...home
}
