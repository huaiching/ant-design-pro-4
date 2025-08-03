/**
 * TabRefStore - 管理頁面中的 tab 切換事件（如離開前檢查）用的 MobX 儲存庫。
 * 允許各個頁籤子元件註冊「離開前處理函式」，供父元件在切換頁籤時統一調用。
 */

import { makeAutoObservable } from 'mobx'

class TabRefStore {
  /**
   * 儲存各 tab 的離開前處理函式
   * key: tab 對應的唯一識別字串（如 tab key）
   * value: 回傳 Promise<boolean> 的 async function
   *   - true：允許切換
   *   - false：阻止切換
   */
  tabLeaveFns = new Map<string, () => Promise<boolean>>()

  constructor() {
    makeAutoObservable(this)
  }

  /**
   * 註冊指定 tab 的離開前處理函式
   * @param key 唯一識別 tab 的 key
   * @param fn 非同步處理函式，需回傳 boolean 值（包裝在 Promise 中）
   */
  setTabLeaveFn(key: string, fn: () => Promise<boolean>) {
    this.tabLeaveFns.set(key, fn)
  }

  /**
   * 移除指定 tab 的離開前處理函式
   * @param key tab 的 key
   */
  removeTabLeaveFn(key: string) {
    this.tabLeaveFns.delete(key)
  }

  /**
   * 執行指定 tab 的離開前處理函式
   * @param key tab 的 key
   * @returns 若有註冊函式則執行其結果；若無，預設回傳 true（允許切換）
   */
  async runTabLeaveFn(key: string): Promise<boolean> {
    const fn = this.tabLeaveFns.get(key)
    if (fn) {
      try {
        return await fn()
      } catch (error) {
        console.error(`執行 tab(${key}) 的離開處理函式時發生錯誤`, error)
        return false
      }
    }
    return true
  }
}

// 匯出單例供使用
const tabRefStore = new TabRefStore()
export default tabRefStore
