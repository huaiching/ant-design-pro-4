# JS 介紹 - TypeScript簡介 及 使用CSS

## JavaScript 和 TypeScript 的差異

1. TypeScript = JavaScript + 嚴格的型別設定規則

2. JavaScript 可以在網頁中直接使用。
   TypeScript 必須經過編譯，才能將其轉譯為 JavaScript 於網頁中使用。

---

## JS 表達式 與 使用 CSS

1. 使用 JS表達式，要使用 `{ }` 包起來

2. CSS 相關撰寫規定
   
   1. 套用 CSS 樣式，要使用 className 屬性 `className = "CSS樣式名稱"`
   
   2. 標籤的行內樣式，要使用 `{{key:"value"}}` 的形式撰寫 `style={{key:"value", key:"value",...}}`

---

## 範例

- index.tsx
  
  ```tsx
  import './store/index.css'    // 引入 css 樣式模組
  import Demo from './components/demo1'
  
  const VDOM: React.FC = () => {
      const idvName = "divId"     // 設定變數
      const data = "Hello JSX"
      return (
          <div>
              {/* 子組件要使用 大寫開頭 */}
              <Demo/>
              {/* JS表達式 要用 {} 包住 */}
              <div id={idvName}>
                  {/* 使用 css 樣式模組:，要用 className 屬性 */}
                  <h1 className="titleCss">
                      <span>此單元為 </span>
                      {/* css 行內樣式 使用範例 */}
                      <span style={{color:"orange", fontSize:"20px"}}>
                          {data}
                      </span>
                  </h1>
              </div>
          </div>
      )
  }
  
  export default VDOM
  ```

- index.css
  
  ```css
  .titleCss {
      background-color: red;
      font-size: 30px;
    }
  ```

- components/demo1.tsx
  
  ```tsx
  const demo1: React.FC = () => {
      return (
          <div>
              <h1>css使用範例</h1>
          </div>
      )
  }
  
  export default demo1
  ```
