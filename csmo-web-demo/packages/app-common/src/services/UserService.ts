import Keycloak, { KeycloakConfig, KeycloakLoginOptions } from 'keycloak-js'
import { config } from '../config/config'

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
      pkceMethod: 'S256'
    })
    return initResult
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
}

export const userService = new KeycloakService({
  ...config.keyCloakConfig,
  url: config.keyCloakConfig.url + '/auth'
})
