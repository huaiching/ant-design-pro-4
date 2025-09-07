import { message, Modal } from "antd"

export const modalConfirm = (msgList: string[]) => {
    // 將 訊息集合 轉換為 html標籤
    const description = msgList.map((msg) => (
      <p key='msg'>{msg}</p>
    ))
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
  
export const modalSuccess = (msgList: string[]) => {
    // 將 訊息集合 轉換為 html標籤
    const description = msgList.map((msg) => (
      <p key='msg'>{msg}</p>
    ))
    // 顯示 對話框
    Modal.success({                    // success | warning | info | error
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
  
export const modalWarning = (msgList: string[]) => {
    // 將 訊息集合 轉換為 html標籤
    const description = msgList.map((msg) => (
      <p key='msg'>{msg}</p>
    ))
    // 顯示 對話框
    Modal.warning({                    // confirm | warning | info | error
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
  
export const modalInfo = (msgList: string[]) => {
    // 將 訊息集合 轉換為 html標籤
    const description = msgList.map((msg) => (
      <p key='msg'>{msg}</p>
    ))
    // 顯示 對話框
    Modal.info({                    // confirm | warning | info | error
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
  
export const modalError = (msgList: string[]) => {
    // 將 訊息集合 轉換為 html標籤
    const description = msgList.map((msg) => (
      <p key='msg'>{msg}</p>
    ))
    // 顯示 對話框
    Modal.error({                    // confirm | warning | info | error
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