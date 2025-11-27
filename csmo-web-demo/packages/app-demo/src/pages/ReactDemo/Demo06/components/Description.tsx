// src/pages/UseContextIntro/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const UseContextIntroPage: React.FC = () => {
  return (
    <PageContainer title="useContext 遠端的信息傳遞">
      <Typography>

        <Paragraph>
          一般在進行 信息傳遞時，會使用 props，但它有一個致命的缺點，就是必須逐級傳遞。<br />
          如果當 需要這個信息的子組件 位於 遠端時，信息傳遞就變得很麻煩。<br />
          為了滿足這類的需求，React 使用 context 進行 這類信息的傳遞。
        </Paragraph>

        <Divider />

        <Title level={2}>傳統方法</Title>

        <Paragraph>
          <ol>
            <li>父組件</li>
          </ol>
        </Paragraph>
        <pre><code>{`import { createContext } from "react"
// 宣告 context 變數
// 要下『export』因為 後層組件需要調用
export const Context變數 = createContext()

const VDOM: React.FC = () => {
  return (
        // 使用 Provider 將 後層組件 包起來，並且 數值要放在 value標籤 中
        <Context變數.Provider value={信息}>
            <子組件/>
        </Context變數.Provider>
  )
}
export default VDOM`}
        </code></pre>

        <Paragraph>
          <ol start={2}>
            <li>子組件</li>
          </ol>
        </Paragraph>
        <pre><code>{`// 載入 父組件所在的組件，並設定取得 Context變數
import { Context變數 } from 'context所在的組件'
import { useContext } from "react"

const VDOM_C: React.FC = () => {
 // 使用 useContext 將 Context變數 的數值取出來
 const 存放數值的變數 = useContext(Context變數)
 return (
     <>
         // 這裡設定要顯示的內容
     </>
 )
}
export default VDOM`}
        </code></pre>

        <Divider />

        <Title level={2}>進階方法: 設定全域狀態變數</Title>

        <Paragraph>- 全域狀態變數設定</Paragraph>
        <Paragraph>store/useUserContext.tsx</Paragraph>
        <pre><code>{`import React, { createContext, useContext, useState, ReactNode } from 'react';

// 定義用戶資料的型別
interface User {
  name: string;
  age: number;
  gender: string;
}

// 定義全域狀態的型別
interface GlobalState {
  user: User; // 數值
  updateUser: (user: User) => void; // 更新方法
}

// 創建 Context
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// 創建提供者
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: '',
    age: 0,
    gender: '',
  });

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <GlobalContext.Provider value={{ user, updateUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

// 自訂 hook 方便使用 Context
// 因為 GlobalContext 有 user 和 updateUser 屬性，所以會丟出 這兩個信息
export const useUserGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
      throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
  };`}
        </code></pre>

        <Paragraph>- 父組件: 使用全域狀態變數</Paragraph>
        <Paragraph>index.tsx</Paragraph>
        <pre><code>{`import React from 'react';
import { GlobalProvider } from './store/useUserContext';
import SubDom1 from './components/subDom1';
import SubDom2 from './components/subDom2';
import { PageContainer } from '@ant-design/pro-layout';

const App: React.FC = () => {
  return (
    <PageContainer>
      <GlobalProvider>
        <SubDom1 />
        <SubDom2 />
      </GlobalProvider>
    </PageContainer>
  );
};

export default App;`}
        </code></pre>

        <Paragraph>- 子組件: 更新全域狀態變數</Paragraph>
        <Paragraph>subDom1.tsx</Paragraph>
        <pre><code>{`import React, { useState } from 'react';
import { useUserGlobalContext } from '../store/useUserContext';
import { Button, Input, Space } from 'antd';

const Profile: React.FC = () => {
  const { user, updateUser } = useUserGlobalContext();
  const [newUser, setNewUser] = useState(user);

  const handleUpdate = () => {
    updateUser(newUser);
  };

  return (
    <Space>
      <Input
        type="text"
        placeholder="姓名"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <Input
        type="number"
        placeholder="年齡"
        value={newUser.age}
        onChange={(e) => setNewUser({ ...newUser, age: Number(e.target.value) })}
      />
      <Input
        type="text"
        placeholder="性別"
        value={newUser.gender}
        onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
      />
      <Button onClick={handleUpdate}>Update</Button>
    </Space>
  );
};

export default Profile;`}
        </code></pre>

        <Paragraph>- 子組件: 顯示全域狀態變數資料</Paragraph>
        <Paragraph>subDom2.tsx</Paragraph>
        <pre><code>{`import { useUserGlobalContext } from '../store/useUserContext';

const Component = () => {
    const { user } = useUserGlobalContext();
    return (
        <>
            <h2>姓名：{user.name}</h2>
            <h2>年齡：{user.age}歲</h2>
            <h2>性別：{user.gender}</h2>
        </>
    )
}
export default Component`}
        </code></pre>

      </Typography>
    </PageContainer>
  );
};

export default UseContextIntroPage;