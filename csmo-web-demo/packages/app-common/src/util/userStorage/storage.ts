import Cookies from 'js-cookie'
import { omit } from 'lodash'
import { userService } from '../../services/UserService'

export type MliUserInfo = {
  // 英文名
  firstName?: string
  // 英文姓
  lastName?: string
  // 密碼
  password?: string
  // 通訊處代碼
  departmentCode?: string
  deptArea?: string
  // 暱稱
  nickname?: string
  id?: string
  // 通訊處
  office?: string
  version?: number
  // 郵件
  email?: string
  // 用戶名
  username?: string
  [key: string]: any
}

const userKey = 'user'
const authorizationKey = 'Authorization'

export const loginModeKey = 'login_mode'

export enum LoginMode {
  BasicAuth = 'BasicAuth',
  SSO = 'SSO'
}

export const setBasicAuth = (username: string, password: string, autoLogin?: boolean) => {
  const authString = window.btoa(`${username}:${password}`)
  if (autoLogin) {
    localStorage.setItem(authorizationKey, authString)
  } else {
    Cookies.set(authorizationKey, authString)
  }
}

export const getBasicAuth = () => {
  if (process.env.NODE_ENV === 'development') {
    // qa:qa
    return Cookies.get(authorizationKey) || localStorage.getItem(authorizationKey) || 'cWE6cWE='
  }
  return Cookies.get(authorizationKey) || localStorage.getItem(authorizationKey) || null
}

export const clearBasicAuth = () => {
  Cookies.remove(authorizationKey)
  sessionStorage.removeItem(authorizationKey)
  localStorage.removeItem(authorizationKey)
}

export const clearUser = () => {
  Cookies.remove(userKey)
  sessionStorage.removeItem(userKey)
  localStorage.removeItem(userKey)
}

/**
 * for m1 模擬用戶token
 * @param user
 * @returns
 */
export const setUser = (user: MliUserInfo, autoLogin?: boolean) => {
  if (!user) return
  const storageUser = omit(user, 'password')
  if (autoLogin) {
    localStorage.setItem(userKey, JSON.stringify(storageUser))
  } else {
    Cookies.set(userKey, JSON.stringify(storageUser))
  }
}

export const getUser = (): MliUserInfo | null => {
  const currentUser = Cookies.get(userKey) || localStorage.getItem(userKey) || null
  try {
    return currentUser ? JSON.parse(currentUser) : null
  } catch (error) {
    return null
  }
}

export const logoutUser = () => {
  clearUser()
  clearBasicAuth()
}

export const isSSOLogin = () => localStorage.getItem(loginModeKey) === 'SSO'

export const clearLoginInfo = () => {
  try {
    logoutUser()
    if (isSSOLogin()) {
      userService?.keycloak?.clearToken()
    }
  } catch (error) {
    console.error('clear user info --- error', error)
  } finally {
    if (userService.keycloak.token) {
      userService.keycloak.token = undefined
    }
  }
}
