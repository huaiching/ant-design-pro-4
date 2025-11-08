# useRef 從輸入框獲取值

useRef 是 React 用來從 輸入框 中 獲取 輸入值 的 Hook。

---

## 語法

1. 宣告
   
   - `元件的Ref型態` 需要根據 使用的輸入框 來進行設定
     若使用 Antd 的 Input 則要使用 `InputRef`
   
   - `初始值` 可以進行預設值的設定，建議使用時 將 `初始值` 設定為 null
   
   ```tsx
   const ref變數 = useRef<元件的Ref型態>(初始值)
   ```

2. 元素使用
   
   - 透過 onChange 來觸發 狀態變數 的 `改變事件`，已達成 綁定的目的。
     也就是 輸入框 內容改變時，會同時改變 後台的某個狀態變數
   
   ```tsx
   <Input type='text' ref={ref變數} onChange={改變事件} />
   ```

3. 取得數值
   
   ```tsx
   const 變數 = inputRef.current?.input?.value
   ```

---

## 範例

```tsx
import { PageContainer } from '@ant-design/pro-layout';
import { Input, Space } from 'antd';
import type { InputRef } from 'antd';
import React, { useRef, useState } from 'react';

const MyComponent: React.FC = () => {
  // useRef 的型態 根據 綁定元件 來使用，這裡因為是使用 Inupt，所以要用 InputRef 作為型態
  const inputRef = useRef<InputRef>(null);
  // 設定 姓名變數
  const [userName, setUserName] = useState<string>("")
  // 設定 姓名改變事件
  const chgUserName = () => {
    const refValue = inputRef.current?.input?.value
    const name = refValue !== undefined ? refValue : ""
    setUserName(name)
  }

  return (
    <PageContainer>
      {/* 使用 ref 指向 Input 的 Ref */}
      <Space>
          <Input type='text' ref={inputRef} onChange={chgUserName} />
          <h1>我是{userName}</h1>
      </Space>
    </PageContainer>
  );
};

export default MyComponent;
```
