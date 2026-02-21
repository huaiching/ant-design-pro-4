/**
 * tab2 的 ProTable 資料變數
 */

import { makeAutoObservable } from 'mobx'

// 定義保單資料型別
export interface PoTable {
  policyNo: string        // 保單號碼
  poStsCode: string       // 保單狀態代碼
  basicPlanCode: string   // 主約險種代碼
  basicRateScale: string  // 主約險種版數
  poIssueDate?: string    // 保單生效日（可選）
  o1Name?: string         // 要保人姓名（可選）
  i1Name?: string         // 被保人姓名（可選）
  address?: string        // 地址（可選）
  phone?: string          // 電話（可選）
  eMail?: string          // 電子郵件（可選）
}

// MobX 儲存庫：用於集中管理保單列表狀態
class Tab2Store {
  // 保單清單（observable 狀態）
  poTableList: PoTable[] = []

  constructor() {
    // 將所有成員標記為可觀察與可自動綁定的方法
    makeAutoObservable(this)
  }

  /**
   * 初始化保單清單（通常在頁面切換或重設時使用）
   */
  init() {
    this.poTableList = []
  }

  /**
   * 一次性設定整個保單清單
   * @param list 傳入的保單資料陣列
   */
  setPoTableList(list: PoTable[]) {
    this.poTableList = list
  }

  /**
   * 新增一筆保單資料到列表中
   * @param po 新增的保單物件
   */
  addPoTable(po: PoTable) {
    this.poTableList.push(po)
  }

  /**
   * 根據保單號碼更新保單內容
   * @param updated 更新後的保單物件
   */
  updatePoTable(updated: PoTable) {
    const index = this.poTableList.findIndex(po => po.policyNo === updated.policyNo)
    if (index !== -1) {
      // 使用索引直接更新，確保觸發 observable
      this.poTableList[index] = updated
    }
  }

  /**
   * 取得目前所有保單資料（作為 getter，可供 React 組件存取）
   */
  get getPoTableList() {
    return this.poTableList
  }
}

// 匯出單例供全應用共用
const tab2Store = new Tab2Store()
export default tab2Store
