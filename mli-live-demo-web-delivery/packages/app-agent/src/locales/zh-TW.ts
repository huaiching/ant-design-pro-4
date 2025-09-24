import { commonLocales } from '@mli-csmo/app-common/src/util/locales/zh-TW'
import home from './zh-TW/home'
import menu from './zh-TW/menu'
import agent from './zh-TW/agent'

export default {
  'micro.app.agent.title': '業務員',
  ...commonLocales,
  ...agent,
  ...menu,
  ...home
}
