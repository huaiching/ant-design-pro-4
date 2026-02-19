/**
 * 資料變數
 */

import { makeAutoObservable } from "mobx"

// 定義保單資料型別
export interface props {
  sampleText: string    // 示範輸入
}

class SubEditStore {
  data: props = {
    sampleText: ''
  }

  constructor() {
    makeAutoObservable(this)
  }

  // 資料初始化: 主頁面 初次載入時，執行此方法來清空資料
  init() {
    this.data = {
      sampleText: ''
    }
  }

  // 從 API 讀取資料: 主頁面 初次載入時，執行此方法來讀取資料
  readData() {
    // 這邊先寫死，實際上要 透過 API 抓取後端資料
    const data = {
      sampleText: '示範輸入'
    }
    this.data = data
  }

  setData(data: props) {
    this.data = data
  }

  get getData() {
    return this.data
  }

}
const subEditStore = new SubEditStore()
export default subEditStore
