import type { Settings as LayoutSettings } from '@ant-design/pro-layout'
import { action, flow, makeObservable, observable, runInAction } from 'mobx'
import { setBasicAuth, setUser } from '@mli-csmo/app-common'

export default class UserInfoStore {
  @observable layoutSettings: Partial<LayoutSettings> = {}
  @observable currentUser = {}
  @observable cmsVersion = {}

  constructor() {
    makeObservable(this)
  }

  @action.bound
  async logout() {
    this.currentUser = {}
    setUser({}, false)
  }

  /**
   *  check用戶是否登錄狀態
   *  保存currentUser
   */
  @action.bound
  async checkUserIsLogin() {
    return this.currentUser
  }

  @action.bound
  async getMliAppVersion() {
    // try {
    //   const versionInfo = await CmsCoreApi.getMliAppVersion()
    //   runInAction(() => {
    //     this.cmsVersion = { ...versionInfo }
    //   })
    // } catch (error) {}
  }

  /**
   * 登錄處理
   * @param user
   * @param password
   * @param autoLogin
   * @returns
   */
  @flow.bound
  *userLogin(user: string, password: string, autoLogin: boolean) {
  }
}
