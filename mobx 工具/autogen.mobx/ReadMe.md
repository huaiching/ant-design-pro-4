# 📘 MobX Store Generator 使用說明

## 📦 專案簡介
這是一個 **簡易 Mobx 檔案生成專案**，
啟動後會自動依照 `mobx-config.json` 設定檔產生 **MobX Store TypeScript 檔案**，  
檔案會輸出到 `src/main/resources/mobx` 資料夾中。

---

## 📂 專案結構
```
src
 └─ main
     ├─ java
     │   └─ com.mli.autogen.mobx
     │        ├─ MobxGeneratorApplication.java  // 啟動程式
     │        ├─ service
     │        │     └─ MobxGenerateService.java // 核心生成邏輯
     │        └─ util
     │              └─ MobxStoreGenerator.java  // MobX Store 生成工具
     └─ resources
         ├─ mobx/               // 生成檔案存放位置
         └─ mobx-config.json    // 使用者設定檔
```

---

## ⚙️ 安裝與使用

### 1️⃣ 建立 `mobx-config.json`
在 `src/main/resources` 中建立 `mobx-config.json`，格式如下：

```json
[
  {
    "interfaceName": "UserInfo",
    "fields": {
      "name": "string",
      "age": "number",
      "email": "string"
    },
    "comments": {
      "name": "使用者名稱",
      "age": "使用者年齡",
      "email": "電子郵件"
    }
  }
]
```

#### 自動生成規則
- `storeName` 會自動設定為 `{interfaceName}Store`
- `instanceName` 會自動設定為 `{interfaceName}` 的 camelCase 形式 + `Store`
    - 例如 `interfaceName = UserInfo` → `storeName = UserInfoStore`、`instanceName = userInfoStore`

#### 設定說明
| 欄位           | 說明 |
|----------------|------|
| `interfaceName` | TypeScript 介面名稱（必填） |
| `fields`        | 欄位名稱與 TypeScript 型別（必填） |
| `comments`      | 欄位中文註解（選填） |

---

### 2️⃣ 啟動專案
```bash
mvn spring-boot:run
```
或直接執行：
```bash
java -jar target/mobxgenerator-1.0.0.jar
```

---

### 3️⃣ 查看生成檔案
啟動後會自動生成 TypeScript 檔案於：
```
src/main/resources/mobx/{StoreName}.ts
```

例如：
```
src/main/resources/mobx/UserInfoStore.ts
```

---

## 📌 生成檔案範例
輸入設定檔：
```json
{
  "interfaceName": "UserInfo",
  "fields": {
    "name": "string",
    "age": "number"
  }
}
```

生成結果（節錄）：
```ts
import { makeAutoObservable } from 'mobx'

export interface UserInfo {
    name: string
    age: number
}

class UserInfoStore {
    userInfo: UserInfo = {
        name: '',
        age: 0
    }

    constructor() {
        makeAutoObservable(this)
    }

    setUserInfo(userInfo: UserInfo) { this.userInfo = userInfo }
    setName(name: string) { this.userInfo.name = name }
    setAge(age: number) { this.userInfo.age = age }

    get getUserInfo() { return this.userInfo }
    get getName() { return this.userInfo.name }
    get getAge() { return this.userInfo.age }
}

const userInfoStore = new UserInfoStore()
export default userInfoStore
```

---

## 🔹 注意事項
- 不依賴 **Jackson**、**Gson** 等外部 JSON 解析工具
- `mobx-config.json` 必須符合指定格式
- 欄位型別請使用 **TypeScript 支援型別**（string、number、boolean 等）
- 若有多個 Store，可在 `mobx-config.json` 中放多個物件  
