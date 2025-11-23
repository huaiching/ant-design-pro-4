/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  config,
  LookupApi,
  mergekeyCloakConfig,
  MliUserInfo,
  userService
} from '@mli-csmo/app-common'
import { mergeApiPath } from '@mli-csmo/app-model/src/request/pathConfig'
import auth from '@mli-csmo/app-common/src/auth/auth'
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

export const qiankun = async () => {
  if (!config.mergedEnvConfig) {
    try {
      const configRequest = await request('/config.json', {
        method: 'GET',
        errorHandler() {}
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
      console.error('Cannot load config environment from server')
    }
  }

  return {
    apps: config.microApps,
    routes: config.microApps
  }
}
