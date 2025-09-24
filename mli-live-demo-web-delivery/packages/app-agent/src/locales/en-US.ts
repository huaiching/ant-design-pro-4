import { commonLocales } from '@mli-csmo/app-common/src/util/locales/en-US'
import agent from './en-US/agent'
import home from './en-US/home'
import menu from './en-US/menu'

export default {
  'micro.app.agent.title': 'Agent',
  ...commonLocales,
  ...agent,
  ...menu,
  ...home
}
