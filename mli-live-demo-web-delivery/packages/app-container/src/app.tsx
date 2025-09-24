/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  config,
  mergekeyCloakConfig,
  MliUserInfo,
  userService
} from '@mli-csmo/app-common'
import auth from '@mli-csmo/app-common/src/auth/auth'
import { mergeApiPath } from '@mli-csmo/app-model/src/request/pathConfig'
import Keycloak from 'keycloak-js'
import { useState } from 'react'
import { request } from 'umi'

export async function getInitialState() {
  const { permissions, roles } = auth
  return {
    permissions,
    roles,
    ...config
  }
}

export const useQiankunStateForSlave = () => {
  const [currentUser, setCurrentUser] = useState<MliUserInfo | undefined>(undefined)

  return {
    currentUser,
    setCurrentUser
  }
}

// 初始化 SegmentKey
let previousSegmentKey = ''

export function onRouteChange({ location }: { location: any }) {
  // 切分 segment，取前四層
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const key = pathSegments.slice(0, 4).join('/')

  // 如果前四層路徑變化了 => 清空 
  if (previousSegmentKey && previousSegmentKey !== key) {
    sessionStorage.clear()
  }

  // 更新結果
  previousSegmentKey = key
}

export const qiankun = async () => {
  if (!config.mergedEnvConfig) {
    try {
      const configRequest = await request('/config.json', {
        method: 'GET',
        errorHandler() { }
      })
      mergeApiPath(configRequest)
      mergekeyCloakConfig(configRequest)

      userService.refresh(new Keycloak(config.keyCloakConfig))
      config.microApps.forEach((microApp, index) => {
        microApp.entry =
          configRequest?.[`${microApp.envVariableName}_CONTENT_PATH`] || microApp.entry
      })
      config.mergedEnvConfig = true
    } catch (e) {
      // console.error('Cannot load config environment from server')
    }
  }

  const initResult = await userService.init()

  if (!initResult) {
    userService.clearUserInfo()
  }

  await userService.setUserInfo()

  let userInfosList: any = []
  config.microApps.forEach((item) => {
    item.props = {
      keycloakRef: userService.keycloak,
      userInfosList
    }
  })

  return {
    apps: config.microApps,
    routes: config.microApps
  }
}
