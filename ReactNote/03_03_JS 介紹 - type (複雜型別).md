# JS 介紹 - type (複雜型別)

1. type 用來定義 複雜的型別，也就是 裡面有多個屬性的型別。

2. 語法：
   
   ```ts
   type 型別名稱 = {
         必填屬性A: 型別;
         選填屬性B?: 型別;           // 選填屬性 用「?」表示
         readonly 屬性C?: 型別;     // 唯獨屬性 只有初始創建時能夠賦值
   }
   ```

---

## 範例

```tsx
const VDOM: React.FC = () => {
    /* 抽象型別 */
    // 書本 有 名稱、頁數
    type Book = {
        name: string;
        pages: number;
        amt?: number;
        readonly id: number;
    };
    // 產品A: 無選填屬性 amt
    let f_data1: Book = {
        name: "輕鬆學習 TypeScript",
        pages: 150,
        id: 1
    }
    console.log("產品A", f_data1);
    // 產品B: 有選填屬性 amt
    let f_data2: Book = {
        name: "React 真簡單",
        pages: 280,
        amt: 1500,
        id: 2
    }
    console.log("產品B", f_data2);

    return (
        <></>
    )
}

export default VDOM
```
