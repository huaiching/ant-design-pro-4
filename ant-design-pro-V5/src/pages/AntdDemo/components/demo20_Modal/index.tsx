import React from 'react';
import { Button, message, Modal } from 'antd';

const App: React.FC = () => {
  const data = [
    '請問是否要繼續？',
    '第二行訊息',
    '第三行訊息',
    '第四行訊息',
  ]

  // 對話框，可用於 顯示 確認訊息
  const openModal = (msgList: string[]) => {
    // 將 訊息集合 轉換為 html標籤
    const description = msgList.map((msg) => (
      <p>{msg}</p>
    ));
    // 顯示 對話框
    Modal.confirm({                    // confirm | warning | info | error
      title: '標題文字',                // 標題文字
      // content: '請問是否要繼續？',    // 內文 單行直接給文字，多行可以用 html標籤
      content: description,
      okText: '繼續',                   // 複寫 確定 的文字 (預設 確定)
      cancelText: '放棄',               // 複寫 取消 的文字 (預設 取消)
      onOk() {                          // 確定 要做的事情
        message.success('繼續作業')
      },
      onCancel() {                      // 取消 要做的事情
        message.error('放棄作業')
      }
    })
  }


  return (
    <>
      <Button type="primary" onClick={()=>openModal(data)}>
        顯示確認訊息
      </Button>
    </>
  );
};

export default App;
