# JS 介紹 - JS 語句

## if

```ts
if (布林條件式) {
   內容;
} 
else if (布林條件式) { 
   內容;
} 
……以此類推
else { 
   內容;
}
```

---

## switch

```ts
switch (變數) { 
   case 值A: 
      內容;
      break;     ← 沒有break將會繼續往下執行
   case 值B: 
      內容;
      break;
   ……以此類推
   case 值N: 
      內容;
      break;
   default:      ← 其他情況：變數 不符合 (值A ~ 值N) 會執行這裡
      內容;
      break;
}
```

---

## 三元運算子

1. 語法
   
   ```ts
   布林條件式 ? True的結果 : False的結果
   ```

2. 範例
   
   ```ts
   const data = (age>=18 ? '成年' : '未成年')
   ```
   
   - 如果 age >= 18 會是 成年；否則是 未成年

---

## for

1. 無回傳值
   
   ```ts
   陣列變數.forEach((陣列元素變數) => {
      內容
   })   
   ```

2. 有回傳值 (會自動組成陣列)
   
   ```ts
   const 變數 = 陣列變數.map((陣列元素變數) => {
     內容
   })
   ```

---

## while

```ts
while (布林條件式) {
   內容;
}
```

---

## 範例

```tsx
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const VDOM: React.FC = () => {
    // 範例: if
    const sex = '1'
    let data1 = ""
    if (sex === '1') {
        data1 = "男"
    } else {
        data1 = "女"
    }

    // 範例: 三元表達式
    const age = 18;
    const data2 = (age>=18 ? '成年' : '未成年')

    // 範例: for 
    const data3 = [];
    for (let i = 1 ; i < 5 ; i++) {
        data3.push(<li>{i}</li>)
    }

    // 範例: foreach
    const data4 = ['a','b','c','d']
    data4.forEach((data) => {
        data3.push(<li>{data}</li>)
    })
    const data5 = data4.map((data) => {
        return <li key={data}>{data}</li>
    })

    return (
        <PageContainer>
            <h3>年齡: {age}，是否成年: {data2}，性別: {data1}</h3>
            <ul>
                第一區塊: {data3}
                第二區塊: {data5}
            </ul>
        </PageContainer>
    )
}

export default VDOM
```
