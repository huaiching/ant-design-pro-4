# useEffect 效果鉤子

useEffect 可以讓你於 頁面渲染時，執行指定的操作。

useEffect 共有 2 個參數

- 第一個：定義你要進行的操作

- 第二個：定義監測對象

---

## 每次渲染 執行

無監測對象，就是 `每次渲染` 都要執行

```tsx
useEffect(()=>{
    // useEffect 『啟動』時要執行的操作
    return () => {
        // useEffect 『卸載』時要執行的操作
    }
})
```

---

## 首次渲染 執行

監測對象空白，就是 `首次渲染` 才要執行

```tsx
useEffect(()=>{
    // useEffect 『啟動』時要執行的操作
    return () => {
        // useEffect 『卸載』時要執行的操作
    }
},[])
```

---

## 特定對象觸發渲染 執行

有設定監測對象，就是 `監測對象數值更新` 才要執行

```tsx
useEffect(()=>{
    // Effect 『啟動』時要執行的操作
    return () => {
        // Effect 『卸載』時要執行的操作
    }
},[監測對象, 監測對象, ……])
```

---

## 範例

```tsx
import { PageContainer } from "@ant-design/pro-layout"
import React, { useEffect, useState } from "react"

// 頁面顯示計時器，顯示頁面停留了幾秒
const VDOM: React.FC = () => {
  const [timer, setTimer] = useState(0)
  // Effect 僅在頁面首次渲染時執行
    useEffect(() => {
        // 設定計時器，每 1 秒 執行一次
        // 每次 時間 + 1秒
        setInterval(()=>{
            setTimer(prevTimer => prevTimer + 1)
        },1000)
    },[])
    return (
        <PageContainer>
            <h3>頁面停留 {timer} 秒</h3>
        </PageContainer>
    )
}
export default VDOM
```
