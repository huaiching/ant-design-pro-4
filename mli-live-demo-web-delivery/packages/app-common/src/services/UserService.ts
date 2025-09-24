import Keycloak, { KeycloakConfig, KeycloakLoginOptions } from 'keycloak-js'
import { config } from '../config/config'
import { MliUserInfo } from 'packages/app-common/src/util/userStorage/storage'

export class KeycloakService {
  keycloak: Keycloak

  constructor(options: KeycloakConfig | string) {
    this.keycloak = new Keycloak(options)
  }

  /**
   * 提供一個方法給子應用同步實例
   * @param keycloak
   */
  refresh(keycloak: Keycloak) {
    this.keycloak = keycloak
  }

  async init() {
    const initResult = await this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
      scope: 'openid profile email'
    })
    return initResult
  }

  async setUserInfo() {

    try {
      const parsed = await this.keycloak.loadUserInfo() as MliUserInfo;
      const userInfo: MliUserInfo = {
        email: parsed?.email,
        username: parsed?.preferred_username
      }
      localStorage.setItem('user', JSON.stringify(userInfo))

      return parsed;
    } catch (e) {
      // console.error('User info error:', e);

      return null;
    }
  }

  async login(options?: KeycloakLoginOptions) {
    return this.keycloak.login(options)
  }

  get isLogin() {
    return !!this.keycloak.token
  }

  get token() {
    return this.keycloak.token
  }

  get userName() {
    return this.keycloak?.tokenParsed?.preferred_username ?? ''
  }

  clearUserInfo() {
    localStorage.removeItem('user')
  }
}

export const userService = new KeycloakService({
  ...config.keyCloakConfig,
  url: config.keyCloakConfig.url + '/auth'
})
