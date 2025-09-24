import { commonLocales } from '@mli-csmo/app-common/src/util/locales/en-US'
import demo from './en-US/demo'
import home from './en-US/home'
import menu from './en-US/menu'


export default {
  'micro.app.demo.title': 'Exhibit',
  ...commonLocales,
  ...menu,
  ...demo,
  ...home
}
