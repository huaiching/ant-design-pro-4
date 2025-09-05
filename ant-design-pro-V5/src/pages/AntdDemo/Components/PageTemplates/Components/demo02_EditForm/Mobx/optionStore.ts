/**
 * 下拉選單的選項設定
 */

import { makeAutoObservable, observable, runInAction } from 'mobx'

class OptionsStore {
  optionsMap = observable.map<string, any[]>()

  constructor() {
    makeAutoObservable(this)
  }

  setOptions = (key: string, data: any[]) => {
    this.optionsMap.set(key, data)
  }

  getOptions = (key: string): any[] => {
    return this.optionsMap.get(key) || []
  }

  async fetchOptions(key: string, apiFn: () => Promise<any[]>) {
    const data = await apiFn()
    runInAction(() => {
      this.setOptions(key, data)
    })
  }
}


const optionsStore = new OptionsStore()
export default optionsStore
