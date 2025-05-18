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
