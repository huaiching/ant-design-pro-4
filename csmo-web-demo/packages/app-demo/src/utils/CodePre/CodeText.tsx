// src/components/CodeText.tsx
import React from 'react';
import { Card, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './CodeText.css';
import { codeCopy } from './CodeCopy';

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
  return (
    <Card
      bodyStyle={{ padding: 0, margin: '16px 0 16px 0' }}
      size='small'
      variant="borderless"
      extra={
        copyable && (
          <Tooltip title="複製">
            <CopyOutlined onClick={()=>codeCopy(code)} />
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