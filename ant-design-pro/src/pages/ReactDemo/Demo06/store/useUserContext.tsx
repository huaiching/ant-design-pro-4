import React, { createContext, useContext, useState, ReactNode } from 'react';

// 定義用戶資料的型別
interface User {
  name: string;
  age: number;
  gender: string;
}

// 定義全域狀態的型別
interface GlobalState {
  user: User;                         // 數值
  updateUser: (user: User) => void;   // 更新方法
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
  };
  
