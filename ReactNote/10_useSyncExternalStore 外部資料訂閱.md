# useSyncExternalStore 外部資料訂閱

useSyncExternalStore 是 React 18 新增的 Hook。

用於 處理外部數據來源的訂閱和同步，類似 Mobx 等狀態管理工具。

## 1. 設定 Store

- 針對 變數 設定 資料型態

- 設定 資料初始值

- 進行 訂閱者 儲存 與 通知事件 設定
  
  ```tsx
  // 儲存 狀態變化時，要通知的訂閱者資訊 (照抄)
  let listeners: Set<() => void> = new Set()
  
  // 發送狀態變化，通知所有訂閱者 (照抄)
  function emitChange(): void {
    listeners.forEach((listener) => listener())
  }
  ```

- 建立 UserStore 類別，包含
  
  - subscribe：訂閱狀態變化
  
  - 針對 變數整體 的 get 和 set 方法
    
    - `set 方法`：最後必須要有 `emitChange()` 才能讓訂閱者知道要更新資料
  
  - 資料初始化方法
  
  - 個別欄位的 get 和 set 方法 (選填)

```tsx
// 設定資料型態
export interface UserInfo {
  name: string
  age: number
  email: string
}

// 設定初始值
let user: UserInfo = {
  name: '',
  age: 0,
  email: '',
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

  // 資料初始化
  init(): void {
    user = {
      name: '',
      age: 0,
      email: '',
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

  setEmail(email: string): void {
    user = { ...user, email }
    emitChange()
  },

  // 獲取個別欄位
  getName(): string {
    return user.name
  },

  getAge(): number {
    return user.age
  },

  getEmail(): string {
    return user.email
  },
}
```

## 2. 使用 useSyncExternalStore

### 2.1. useSyncExternalStore 基本語法

- 第一個參數：訂閱狀態變化

- 第二個參數：客戶端的取值函式

- 第三個參數：伺服器端的取值函式

```tsx
  const user = useSyncExternalStore(
    userStore.subscribe,  // 訂閱
    userStore.getUser,    // 客戶端取值
    userStore.getUser     // 伺服器端取值
  )
```

### 2.1. 資料寫入

- 設定 useSyncExternalStore

- 進行 `資料初始化`，因為 全域變數，所以 必須透過 useEffect 進行資料初始化，否則 會有舊資料無法清除的問題

- 透過 set 方法，進行資料更新

```tsx
import React, { useEffect } from 'react'
import { ProForm, ProFormText, ProFormDigit } from '@ant-design/pro-components'
import { Card, message } from 'antd'
import { useSyncExternalStore } from 'react'
import { UserInfo, userStore } from '../Store/userStore'

const Create: React.FC = () => {
  // 訂閱 user 狀態
  const user = useSyncExternalStore(
    userStore.subscribe,  // 訂閱
    userStore.getUser,    // 客戶端取值
    userStore.getUser     // 伺服器端取值
  )

  useEffect(()=>{
    userStore.init()
  },[])

  return (
    <Card title="輸入使用者資料" bordered={false}>
      <ProForm
        onFinish={async (values: UserInfo) => {
          userStore.setUser(values) // 更新全域 store
          message.success('使用者資料已儲存')
        }}
        initialValues={user} // 使用 store 中的 user 作為表單初始值
      >
        <ProFormText
          name="name"
          label="姓名"
          rules={[{ required: true, message: '請輸入姓名' }]}
        />
        <ProFormDigit
          name="age"
          label="年齡"
          rules={[{ required: true, message: '請輸入年齡' }]}
        />
        <ProFormText
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: '請輸入有效的 Email' }]}
        />
      </ProForm>
    </Card>
  )
}

export default Create
```

### 2.2. 資料讀取

- 設定 useSyncExternalStore

- 因為 set 方法 有包含 `emitChange()`，所以 數值更新時，React 會通知要更新資料

```tsx
import React, { useEffect } from 'react'
import { Card, Descriptions, message } from 'antd'
import { useSyncExternalStore } from 'react'
import { userStore } from '../Store/userStore'

const Display: React.FC = () => {
  // 訂閱 user 狀態
  const user = useSyncExternalStore(
    userStore.subscribe,  // 訂閱
    userStore.getUser,    // 客戶端取值
    userStore.getUser     // 伺服器端取值
  )

  // 當 name 變化時顯示消息
  useEffect(() => {
    return () => {
      message.info('姓名變更了')
    }
  }, [user.name])

  return (
    <Card title="使用者資料預覽" bordered={false}>
      <Descriptions column={1}>
        <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
        <Descriptions.Item label="年齡">{user.age}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default Display
```
