import { notification } from "antd"

export const notificationSuccess = (msgList: string[]) => {
    // 將 訊息集合 轉換為 html標籤
    const description = msgList.map((msg) => (
      <p key='msg'>{msg}</p>
    ))
    // 顯示 通知提醒框
    notification['success']({         // success / info / warning / error
      message: '我是標題',           // 標題
      // description: '錯誤內容',    // 內文 單行直接給文字，多行可以用 html標籤
      description: description,
      duration: 0,                  // 幾秒後自動關閉，0=不自動關閉
      placement: 'top'              // 顯示位置 'top' | 'topLeft' | 'topRight'(預設) | 'bottom' | 'bottomLeft' | 'bottomRight'
    })
  }
  
export const notificationInfo = (msgList: string[]) => {
    // 將 訊息集合 轉換為 html標籤
    const description = msgList.map((msg) => (
      <p key='msg'>{msg}</p>
    ))
    // 顯示 通知提醒框
    notification['info']({         // success / info / warning / error
      message: '我是標題',           // 標題
      // description: '錯誤內容',    // 內文 單行直接給文字，多行可以用 html標籤
      description: description,
      duration: 0,                  // 幾秒後自動關閉，0=不自動關閉
      placement: 'top'              // 顯示位置 'top' | 'topLeft' | 'topRight'(預設) | 'bottom' | 'bottomLeft' | 'bottomRight'
    })
  }
  
export const notificationWarning = (msgList: string[]) => {
    // 將 訊息集合 轉換為 html標籤
    const description = msgList.map((msg) => (
      <p key='msg'>{msg}</p>
    ))
    // 顯示 通知提醒框
    notification['warning']({         // success / info / warning / error
      message: '我是標題',           // 標題
      // description: '錯誤內容',    // 內文 單行直接給文字，多行可以用 html標籤
      description: description,
      duration: 0,                  // 幾秒後自動關閉，0=不自動關閉
      placement: 'top'              // 顯示位置 'top' | 'topLeft' | 'topRight'(預設) | 'bottom' | 'bottomLeft' | 'bottomRight'
    })
  }
  
export const notificationError = (msgList: string[]) => {
    // 將 訊息集合 轉換為 html標籤
    const description = msgList.map((msg) => (
      <p key='msg'>{msg}</p>
    ))
    // 顯示 通知提醒框
    notification['error']({         // success / info / warning / error
      message: '我是標題',           // 標題
      // description: '錯誤內容',    // 內文 單行直接給文字，多行可以用 html標籤
      description: description,
      duration: 0,                  // 幾秒後自動關閉，0=不自動關閉
      placement: 'top'              // 顯示位置 'top' | 'topLeft' | 'topRight'(預設) | 'bottom' | 'bottomLeft' | 'bottomRight'
    })
  }