# React 簡介

## 什麼是 React

React是由Facebook開發的 前端框架。

使用「模組化」的開發理念，將 頁面設計成「許多小模組」，使其可以 重複使用。
(傳統html是靜態結構，頁面程式無法重複使用)

使用 JSX 語法結構 (一種JavaScript 和 HTML 結合的語法)，
讓開發者可以更簡潔的進行頁面程式開發。

---

## 資料結構的重點內容

```textile
├─ 📁node_modules               # 第三方依賴套件存放目錄
├─ 📁config                     # 專案設定檔
│   ├─ 📄config.ts              # 應用程式啟動參數設定
│   ├─ 📄routes.ts              # 前端路由配置
├─ 📁src                        # 主要開發目錄
│   ├─ 📁common                 # 共用模組 (工具函數、通用組件等)
│   ├─ 📁locales                # 國際化(i18n)資源
│   │   ├─ 📁zh-TW              # 繁體中文語言包
│   │   │   ├─ 📄menu.ts        # 選單文字資源
│   │   ├─ 📄zh-TW.ts           # 繁體中文資源匯總檔
│   ├─ 📁pages                  # 頁面組件目錄
│   │   ├─ 📁AntdDemo           # Ant Design 範例頁面
│   │   │   ├─ 📁components     # 子組件目錄
│   │   │   ├─ 📄index.tsx      # 主入口文件
│   │   ├─ 📁ReactDemo          # React 基礎語法範例
│   │   ├─ 📁Welcome            # 歡迎頁/首頁
│   │   ├─ 📄404.tsx            # 404 錯誤頁面組件
├─ 📄package.json               # 專案設定檔 (依賴套件與腳本設定)
```

---

## React 的檔案格式

1. ***.ts**：
   
   1. TypeScript 文件
   
   2. 用於定義
   - 無 `JSX` 的 工具函式
   
   - 型別定義
   
   - 常數變數

2. ***.tsx**：
   
   1. TypeScript 文件 + html標籤 + React組件
      
      - html標籤 = 開頭小寫的組件
      
      - React組件 = 開頭大寫的組件
   
   2. 用於定義
   - React 頁面檔案
   
   - 可複用 UI 組件
   
   - 有 `JSX` 的 工具函式

3. **index.tsx**：
   
   - 模組的入口點
   - 當 `import './components'` 時，預設會載入 `./components/index.tsx`

---

## 路由文件(routes.ts)

| 語法        | 說明                       |
|:---------:|:------------------------:|
| path      | 路徑 URL                   |
| redirect  | 訪問根路徑時重定向URL             |
| name      | 路由名稱 (串聯國際化文件 取得中文)      |
| routes    | 嵌套路由                     |
| icon      | 菜單圖標                     |
| component | 對應的頁面檔位置，起點為 `src/pages` |

- 圖標使用參考：
  
  https://4x.ant.design/components/icon-cn/ 

```ts
      {
        name: 'reactDemo',  // 路由組名稱
        icon: 'TrademarkCircleFilled',  // 菜單圖標
        path: '/reactDemo',  // 基礎路徑
        routes: [  // 嵌套路由
          {
            // 頁面文件基本結構示例
            name: 'demo01',  // menu.reactDemo.demo01
            path: 'demo01',  // 相對路徑，實際為 /reactDemo/demo01
            component: './ReactDemo/Demo01',
          },
          {
            // JS 與 TypeScript 語法示例
            name: 'demo02', 
            path: 'demo02',
            routes: [  // 多級嵌套路由
              {
                // CSS 樣式處理
                name: 'demo02-01',
                path: 'demo02-01',  // 實際路徑：/reactDemo/demo02/demo02-01
                component: './ReactDemo/Demo02/Demo02-01',
              },
              {
                // 變數宣告與型態設定
                name: 'demo02-02',
                path: 'demo02-02',
                component: './ReactDemo/Demo02/Demo02-02',
              },
            ]
          },
          {
            // useState 狀態管理
            name: 'demo03', 
            path: 'demo03',
            component: './ReactDemo/Demo03',
          },
      }
```

---

## 國際化文件(locales)

```textile
├─ 📁src                        # 主要開發目錄
│   ├─ 📁locales                # 國際化(i18n)資源
│   │   ├─ 📁zh-TW              # 繁體中文語言包
│   │   │   ├─ 📄menu.ts        # 選單文字資源
│   │   ├─ 📄zh-TW.ts           # 繁體中文資源匯總檔
```

1. 每個國際化文件的 ts 檔，都要於 匯總檔(zh-TW.ts) 進行設定

2. 國際化文件 的格式為 `'代碼': '中文'`
   
   左側選單(menu) 會自動依照 routes 各階層 的 name 進行組合，最前端會加上 menu 字眼
   
   ```ts
   'menu.reactDemo': 'React 基本語法範例'
   ```
