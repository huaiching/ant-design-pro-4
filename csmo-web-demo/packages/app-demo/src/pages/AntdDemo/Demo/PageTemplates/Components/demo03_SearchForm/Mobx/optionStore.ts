/**
 * 下拉選單的選項設定
 */

import { makeAutoObservable, observable, runInAction } from 'mobx'

class OptionsStore {
  optionsMap = observable.map<string, any[]>()

  constructor() {
    makeAutoObservable(this)
  }

  /**
   * 設定 下拉選單
   * @param key 下拉選單的名稱
   * @param data 下拉選單的資料
   */
  setOptions = (key: string, data: any[]) => {
    this.optionsMap.set(key, data)
  }

  /**
   * 讀取 下拉選單資料
   * @param key 下拉選單的名稱
   * @returns 下拉選單的資料
   */
  getOptions = (key: string): any[] => {
    return this.optionsMap.get(key) || []
  }

  /**
   * 透過 API 設定 下拉選單資料
   * @param key 下拉選單的名稱
   * @param apiFn 取得下拉選單的API請求方法
   */
  async fetchOptions(key: string, apiFn: () => Promise<any[]>) {
    const data = await apiFn()
    runInAction(() => {
      this.setOptions(key, data)
    })
  }
}


const optionsStore = new OptionsStore()
export default optionsStore
