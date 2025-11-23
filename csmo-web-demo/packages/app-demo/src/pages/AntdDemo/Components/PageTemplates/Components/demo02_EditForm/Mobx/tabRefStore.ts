/**
 * TabRefStore - 管理頁面中的 tab 切換事件（如離開前檢查）用的 MobX 儲存庫。
 * 允許各個頁籤子元件註冊「離開前處理函式」，供父元件在切換頁籤時統一調用。
 * 使用方式:
 * 1. 各頁簽 於 useEffect 中 透過 setTabLeaveFn 註冊事件
 * 2. 父元件 於 切換事件中 透過 await tabRefStore.runTabLeaveFn(key) 觸發檢核
 */
// tabRefStore.ts
import { makeAutoObservable } from 'mobx'

class TabRefStore {
  tabLeaveFns = new Map<string, () => Promise<boolean>>()
  tabEnterFns = new Map<string, () => void>() // 👉 新增 tab 進入時的事件

  constructor() {
    makeAutoObservable(this)
  }

  setTabLeaveFn(key: string, fn: () => Promise<boolean>) {
    this.tabLeaveFns.set(key, fn)
  }

  setTabEnterFn(key: string, fn: () => void) {
    this.tabEnterFns.set(key, fn)
  }

  async runTabLeaveFn(key: string) {
    const fn = this.tabLeaveFns.get(key)
    if (fn) return await fn()
    return true
  }

  runTabEnterFn(key: string) {
    const fn = this.tabEnterFns.get(key)
    fn?.()
  }
}

const tabRefStore = new TabRefStore()
export default tabRefStore
