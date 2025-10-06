// store.ts
// 這是一個簡單的外部狀態（store）實作範例
// 主要用途是：讓多個 React 元件透過 useSyncExternalStore 同步資料變化

type Listener = () => void // 監聽函式類型，當資料變動時會被呼叫

class Store {
  // === 1️⃣ 狀態保存區 ===
  private data: string = '' // 用來保存目前的資料
  private listeners = new Set<Listener>() // 保存所有監聽者（React 元件）

  // === 2️⃣ React 用的 "快照" 函式 ===
  // React 每次 render 會呼叫 getSnapshot，拿到最新的資料
  getSnapshot = () => this.data

  // === 3️⃣ React 用的 "訂閱" 函式 ===
  // React 會呼叫 subscribe 來監聽資料變化
  // 當外部資料有更新時，會觸發所有監聽者重新 render
  subscribe = (listener: Listener) => {
    this.listeners.add(listener) // 加入監聽
    return () => this.listeners.delete(listener) // 回傳取消監聽的函式
  }

  // === 4️⃣ 更新狀態的函式 ===
  // 當外部要更新資料時，呼叫這個方法
  // 並通知所有已訂閱的 React 元件
  setData = (value: string) => {
    this.data = value // 更新內部資料
    this.listeners.forEach((l) => l()) // 通知所有監聽者重新 render
  }
}

// === 5️⃣ 導出 store 實例 ===
// React 各個元件可以直接 import 這個 store 使用
export const store = new Store()
