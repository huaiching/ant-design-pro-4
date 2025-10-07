/**
 * 📘 User Store 使用 useSyncExternalStore
 * - setUser：設定整筆使用者資料
 * - initUser：重設使用者資料為預設值
 * - setName ...：個別欄位設定
 * - getName ...：個別欄位取得
 * - getUser：取得完整使用者資料
 * - subscribe：訂閱狀態變化
 * 
 * 注意事項：
 * - set方法 最後都要有 emitChange() 才能通知訂閱者要更新資訊
 */

export interface UserInfo {
  name: string
  age: number
  address: string
  calcDate: string
}

// 設定初始值
let user: UserInfo = {
  name: '',
  age: 0,
  address: '',
  calcDate: ''
}

// 儲存 狀態變化時，要通知的訂閱者資訊 (照抄)
let listeners: Set<() => void> = new Set()

// 發送狀態變化，通知所有訂閱者 (照抄)
function emitChange(): void {
  listeners.forEach((listener) => listener())
}

// User Store
export const userStore = {
  // 訂閱狀態變化，供 useSyncExternalStore 使用 (照抄)
  subscribe(listener: () => void): () => void {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },

  // 資料初始化方法
  init(): void {
    user = {
      name: '',
      age: 0,
      address: '',
      calcDate: ''
    }
    emitChange()
  },

  // 完整資料 (選填)
  setUser(newUser: UserInfo): void {
    user = { ...user, ...newUser }
    emitChange()
  },

  getUser(): UserInfo {
    return user
  },

  // 設定個別欄位 (選填)
  setName(name: string): void {
    user = { ...user, name }
    emitChange()
  },

  setAge(age: number): void {
    user = { ...user, age }
    emitChange()
  },

  setAddress(address: string): void {
    user = { ...user, address }
    emitChange()
  },
  
  setCalcDate(calcDate: string): void {
    user = { ...user, calcDate }
    emitChange()
  },

  // 獲取個別欄位
  getName(): string {
    return user.name
  },

  getAge(): number {
    return user.age
  },

  getAddress(): string {
    return user.address
  },

  getCalcDate(): string {
    return user.calcDate
  },
}