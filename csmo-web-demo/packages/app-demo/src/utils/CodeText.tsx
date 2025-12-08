// src/components/CodeText.tsx
import React from 'react';
import { Card, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './CodeText.css';

const textHighlight = (raw: string): string => {
  let code = raw.trim();

  
  return `<pre class="text-code"><code>${code}</code></pre>`;
};

interface CodeTEXTProps {
  code: string;
  title?: string;
  copyable?: boolean;
}

const CodeText: React.FC<CodeTEXTProps> = ({ code, title = 'TEXT', copyable = true }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    const { message } = require('antd');
    message.success('已複製到剪貼簿');
  };

  return (
    <Card
      bodyStyle={{ padding: 0, margin: '16px 0 16px 0' }}
      size='small'
      variant="borderless"
      extra={
        copyable && (
          <Tooltip title="複製">
            <CopyOutlined style={{ cursor: 'pointer', fontSize: 16 }} onClick={handleCopy} />
          </Tooltip>
        )
      }
    >
      <div
        className="code-text-highlighter"
        dangerouslySetInnerHTML={{ __html: textHighlight(code) }}
      />
    </Card>
  );
};

export default CodeText;