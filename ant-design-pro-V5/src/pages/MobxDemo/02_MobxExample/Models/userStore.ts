/**
 * 📘 MobX 使用教學 - 使用者資料 Store（欄位可單獨操作）
 *
 * ✅ 功能說明：
 * - setUser(user)：設定整筆使用者資料
 * - initUser()：重設使用者資料為預設值（舊 clearUser）
 * - setName / setAge / setEmail：個別欄位設定
 * - getName / getAge / getEmail：個別欄位取得
 *
 */

import { makeAutoObservable } from 'mobx'

// 使用者資訊型別
export interface UserInfo {
    name: string
    age: number
    email: string
}

class UserStore {
    // 觀察資料
    user: UserInfo = {
        name: '',
        age: 0,
        email: '',
    }

    /**
   * 建構子：
   * 使用 makeAutoObservable 自動處理：
   * - observable：可被觀察的狀態（變數）
   * - action：修改狀態的方法
   * - computed：根據 observable 推導的值（唯讀）
   */
    constructor() {
        makeAutoObservable(this)
    }


    // 設定整筆使用者資料

    // 初始化（重置）使用者資料
    initUser() {
        this.user = {
            name: '',
            age: 0,
            email: '',
        }
    }

    // set 方法
    setUser(user: UserInfo) {
        this.user = user
    }
    
    setName(name: string) {
        this.user.name = name
    }

    setAge(age: number) {
        this.user.age = age
    }

    setEmail(email: string) {
        this.user.email = email
    }

    // get 方法
    get getName() {
        return this.user.name
    }

    get getAge() {
        return this.user.age
    }

    get getEmail() {
        return this.user.email
    }

    get getUser() {
        return this.user
    }
}

// 匯出單例供全站共用
const userStore = new UserStore()
export default userStore
