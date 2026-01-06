import defaultSettings from '@/../config/defaultSettings'
import type { Settings as LayoutSettings } from '@ant-design/pro-layout'
import {
  config,
  mergekeyCloakConfig,
  MicroAppProps,
  MliUserInfo
} from '@mli-csmo/app-common'
import { mergeApiPath } from '@mli-csmo/app-model/src/request/pathConfig'
import auth from '@mli-csmo/app-common/src/auth/auth'
import { clearTableSessionStorage, getPathName, MENU_LOCALE_BEGIN, request } from '@mli-csmo/base'
import { FormattedMessage } from 'react-intl'
import type { RunTimeLayoutConfig } from 'umi'
import { formatMessage, history, matchRoutes, setLocale } from 'umi'
// 日期元件格式化 - 支援手動輸入日期不用「/」
import '@/utils/Dayjs/minguoParse'

export const qiankun = {
  async bootstrap() {},
  async mount(props: MicroAppProps) {
    props.onGlobalStateChange((state: any, prev: any) => {
      // state: 变更后的状态; prev 变更前的状态
      setLocale(state.lang, false)
    })
  }
}

export async function getInitialState(): Promise<{
  permissions: Set<any>
  roles: Set<any>
  settings?: Partial<LayoutSettings>
  loading?: boolean
  currentUser?: MliUserInfo
  // 登錄用戶區部
  userArea?: string
}> {
  const { permissions, roles } = auth
  if (!config.mergedEnvConfig) {
    try {
      const configRequest = await request('/config.json', {
        method: 'GET',
        skipErrorHandler: true,
        errorHandler() {}
      })
      mergeApiPath(configRequest)
      mergekeyCloakConfig(configRequest)
      config.microApps.forEach((microApp) => {
        microApp.entry =
          configRequest?.[`${microApp.envVariableName}_CONTENT_PATH`] || microApp.entry
      })
      config.mergedEnvConfig = true
    } catch (e) {
      console.error('Cannot load config environment from server')
    }
  }
  return {
    permissions,
    roles,
    settings: defaultSettings as Partial<LayoutSettings>
  }
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {

  return {
    disableContentMargin: true,
    fixSiderbar: true,
    headerRender: false,
    footerRender: false,
    actionRender: false,
    rightContentRender: false,
    title: document.title,
    onPageChange: () => {
      // const { location } = history
      // // 如果沒有登錄，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath)
      // }
    },
    menuHeaderRender: () => (
      <div className={'menu-title'}>
        <FormattedMessage id="micro.app.demo.title" />
      </div>
    ),
    menuItemRender: (menuItemProps, defaultDom) => {
      if (menuItemProps.isUrl) {
        return defaultDom
      }
      if (menuItemProps.path && location.pathname !== menuItemProps.path) {
        return (
          <a
            onClick={() => {
              clearTableSessionStorage()
              const path = menuItemProps.target || menuItemProps.path || '/'
              history.replace(path)
            }}
          >
            {defaultDom}
          </a>
        )
      }
      return defaultDom
    },
    breadcrumbRender: (routers = []) => [
      {
        path: '/home',
        base: '/',
        breadcrumbName: formatMessage({ id: 'demo.home' })
      },
      ...routers
    ],
    className: 'mirco-app-layout',
    ...initialState?.settings
  }
}

export function onRouteChange({ clientRoutes, location, basename, routes }: { clientRoutes: any; location: any; basename: string; routes: any }) {
  const route = matchRoutes(clientRoutes, location.pathname.replace(basename, ''))?.pop()?.route
  if (route) {
    const pathName = getPathName(route, routes)
    if (pathName !== MENU_LOCALE_BEGIN) {
      document.title = formatMessage({ id: pathName })
    }
  }
}
