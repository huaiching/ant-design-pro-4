/**
 * 第一頁 與 第二頁 info 的 資料變數
 */

import { makeAutoObservable } from 'mobx'

// 使用者資訊型別
export interface BasicInfo {
    policyNo: string
    receiveNo: string
    receiveDate: string
    chgDate: string
    chgType: string
}

class BasicStore {
    // 觀察資料
    basic: BasicInfo = {
        policyNo: '',
        receiveNo: '',
        receiveDate: '',
        chgDate: '',
        chgType: '',
    }

    constructor() {
        makeAutoObservable(this)
    }
    
    // 初始化（重置）使用者資料
    initBasic() {
        this.basic = {
            policyNo: '',
            receiveNo: '',
            receiveDate: '',
            chgDate: '',
            chgType: '',
        }
    }

    // set 方法
    setBasic(basic: BasicInfo) {
        this.basic = basic
    }
    // get 方法
    get getBasic() {
        return this.basic
    }
}

// 匯出單例供全站共用
const basicStore = new BasicStore()
export default basicStore
