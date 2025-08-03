/**
 * 頁面事件的 mobx 設定，為了讓父元件可以使用
 */

import { makeAutoObservable } from 'mobx'

class TabRefStore {
  tabLeaveFns = new Map<string, () => Promise<boolean>>() // 返回true允許切換，false阻止切換

  constructor() {
    makeAutoObservable(this)
  }

  setTabLeaveFn(key: string, fn: () => Promise<boolean>) {
    this.tabLeaveFns.set(key, fn)
  }

  removeTabLeaveFn(key: string) {
    this.tabLeaveFns.delete(key)
  }

  async runTabLeaveFn(key: string) {
    const fn = this.tabLeaveFns.get(key)
    if (fn) {
      return await fn()
    }
    return true
  }
}

const tabRefStore = new TabRefStore()
export default tabRefStore
