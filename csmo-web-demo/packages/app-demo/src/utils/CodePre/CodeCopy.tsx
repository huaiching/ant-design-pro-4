/**
 * 複製文字到剪貼簿的工具函式
 * 支援現代 Clipboard API，並在不支援時使用 fallback 方法
 */
import { message } from 'antd';

export const codeCopy = (text: string): void => {
  // 優先使用現代 Clipboard API（安全上下文下）
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success('已複製到剪貼簿');
      })
      .catch((err) => {
        // console.warn 只在開發環境顯示，避免正式環境 log
        if (process.env.NODE_ENV === 'development') {
          console.warn('Clipboard API 失敗:', err);
        }
        fallbackCopy(text);
      });
  } else {
    // 非安全上下文直接 fallback
    fallbackCopy(text);
  }
};

const fallbackCopy = (text: string): void => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      message.success('已複製到剪貼簿');
    } else {
      message.warning('無法自動複製，請手動選取後 Ctrl+C');
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Fallback copy failed:', err);
    }
    message.warning('無法自動複製，請手動選取後 Ctrl+C');
  } finally {
    document.body.removeChild(textarea);
  }
};