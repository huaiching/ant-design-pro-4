import React from 'react';
import { Button, notification } from 'antd';

const App: React.FC = () => {
  const data = [
    '錯誤內容',
    '第二行訊息',
    '第三行訊息',
    '第四行訊息',
  ]

  const openNotificationWithMultipleLines = (msgList: string[]) => {
    // 將 訊息集合 轉換為 html標籤
    const description = msgList.map((msg) => (
      <p>{msg}</p>
    ));
    // 顯示 通知提醒框
    notification['error']({         // success / info / warning / error
      message: '我是標題',           // 標題
      // description: '錯誤內容',    // 內文 單行直接給文字，多行可以用 html標籤
      description: description,
      duration: 0,                  // 幾秒後自動關閉，0=不自動關閉
      placement: 'top',             // 顯示位置 'top' | 'topLeft' | 'topRight'(預設) | 'bottom' | 'bottomLeft' | 'bottomRight'
    });
  };

  return (
    <div>
      <Button type="primary" onClick={() => openNotificationWithMultipleLines(data)}>
        顯示通知訊息
      </Button>
    </div>
  );
};

export default App;
