# useState 狀態機

如果當變數內容改變時，畫面要重新渲染，就需要將這個變數設定為state(狀態機)。

---

### 語法

```tsx
import { useState } from "react"

const [isHot, setIsHot] = useState(true)
```

---

## 數值更新

1. 直接給值 (後蓋前)
   
   ```tsx
   setState(新狀態)
   ```

2. 函式更新
   
   ```tsx
   setState((變數) => {更新邏輯})
   ```
   
   - setState 若 連續多次執行更新時，
     結果會 後蓋前，只保留 最後一次的結果
     如果 每次的結果都要保留到下一次使用，就必須使用 函式進行更新

---

## 範例

```tsx
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Button, Space } from "antd";
import { useState } from "react";

const VDOM: React.FC = () => {
    // 宣告
    const [isHot, setIsHot] = useState(true)
    // 天氣的顯示設定
    const isHotDesc = isHot ? '炎熱' : '涼爽'
    // 透過函式改變天氣值
    // 因為 天氣值 isHot 是狀態機，所以改變時會啟動畫面重新渲染
    // 因此 顯示的 天氣中文內容 就會同步改變
    function chgWeather () {
        setIsHot(!isHot)
    }
    return (
        <PageContainer>
            <Space>
                <Button type="primary" onClick={chgWeather}>改變天氣</Button>
                <h3>今天天氣很{isHotDesc}</h3>
            </Space>
        </PageContainer>
    )
}

export default VDOM



```
