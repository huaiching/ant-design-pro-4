// src/components/CodeText.tsx
import React from 'react';
import { Card, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './CodeText.css';   // 直接共用 CodeJava 的 CSS 也可以，這裡單獨一份保證不影響其他

interface CodeTextProps {
  content: string;     // 原始文字
  title?: string;      // 左上角標題
  copyable?: boolean;  // 是否顯示複製按鈕
}

const CodeText: React.FC<CodeTextProps> = ({ content, title, copyable = true }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    const { message } = require('antd');
    message.success('已複製到剪貼簿');
  };

  return (
    <Card
      title={title && <span style={{ color: '#858585' }}>{title}</span>}
      size="small"
      bodyStyle={{ padding: 0, margin: '16px 0' }}
      style={{ background: '#1e1e1e', border: '1px solid #303030' }}
      headStyle={{
        background: '#252526',
        borderBottom: '1px solid #303030',
        color: '#858585',
        minHeight: 40,
      }}
      bordered={false}
      extra={
        copyable && (
          <Tooltip title="複製內容">
            <CopyOutlined
              style={{
                color: '#858585',
                fontSize: 16,
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#858585')}
              onClick={handleCopy}
            />
          </Tooltip>
        )
      }
    >
      <pre className="code-content">
        <code>{content}</code>
      </pre>
    </Card>
  );
};

export default CodeText;