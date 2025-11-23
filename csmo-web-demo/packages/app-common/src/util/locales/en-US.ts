import common from './en-US/common'
import component from './en-US/component'
import microApp from './en-US/microApp'

export const commonLocales = {
  'navBar.lang': 'lang',
  'layout.header.title': 'web-demo',
  ...component,
  ...common,
  ...microApp
}

export default commonLocales
