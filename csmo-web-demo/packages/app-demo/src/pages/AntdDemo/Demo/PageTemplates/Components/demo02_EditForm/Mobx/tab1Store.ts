/**
 * tab1 的 資料變數
 */

import { makeAutoObservable } from "mobx"

// 定義保單資料型別
export interface props {
  address: string    // 地址
  phone: string     // 電話
}

class Tab1Store {
  tab1: props = {
    address: '',
    phone: ''
  }

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    this.tab1 = {
      address: '',
      phone: ''
    }
  }

  setTab1(data: props) {
    this.tab1 = data
  }

  get getTab1() {
    return this.tab1
  }

}
const tab1Store = new Tab1Store()
export default tab1Store
