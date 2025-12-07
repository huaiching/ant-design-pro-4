// src/components/CodeTsx.tsx
import React from 'react';
import { Card, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './CodeTsx.css';

const tsxHighlight = (rawCode: string): string => {
  let code = rawCode;

  const tokens: Array<{ key: string; content: string; type: 'string' | 'comment' }> = [];
  let counter = 0;

  const protect = (content: string, type: 'string' | 'comment') => {
    const key = `__${type}_${counter++}__`;
    tokens.push({ key, content, type });
    return key;
  };

  // 1. 保護字串與模板字串
  code = code.replace(/(["'])([\s\S]*?)\1/g, m => protect(m, 'string'));
  code = code.replace(/(`[\s\S]*?`)/g, m => protect(m, 'string'));

  // 2. 保護註解
  code = code.replace(/(\/\/.*$)|(\/\*(.|\s)*?\*\/)/gm, m => protect(m, 'comment'));

  // 3. 高亮 JSX 標籤（正確版！）
  code = code.replace(/<\/?([A-Za-z][\w.\-]*)([^>]*)>/g, (match, tag, attrs) => {
    const isClosing = match.startsWith('</');
    const highlightedAttrs = attrs.replace(/([a-zA-Z\-]+)=/g, '<span class="attr-name">$1</span>=');
    const slash = isClosing ? '/' : '';
    return `<span class="bracket">&lt;</span>${slash}<span class="tag-name">${tag}</span>${highlightedAttrs}<span class="bracket">&gt;</span>`;
  });

  code = code.replace(/<([A-Za-z][\w.\-]*)([^>]*?)\/>/g, (match, tag, attrs) => {
    const highlightedAttrs = attrs.replace(/([a-zA-Z\-]+)=/g, '<span class="attr-name">$1</span>=');
    return `<span class="bracket">&lt;</span><span class="tag-name">${tag}</span>${highlightedAttrs}<span class="bracket">/&gt;</span>`;
  });

  // 4. JSX 大括號
  code = code.replace(/\{|\}/g, '<span class="brace">$&</span>');

  // 5. 關鍵字（安全）
  const keywords = '\\b(await|async|break|case|catch|const|continue|debugger|default|delete|do|else|export|extends|finally|for|from|function|if|import|in|instanceof|interface|let|new|return|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|true|false|null)\\b';
  code = code.replace(new RegExp(keywords, 'g'), '<span class="keyword">$1</span>');

  // 6. 類型關鍵字
  code = code.replace(/\b(string|number|boolean|any|void|never|unknown|object)\b/g, '<span class="type">$1</span>');

  // 7. 函數名
  code = code.replace(/([a-zA-Z_$][\w$]*)\s*(?=\()/, (m, name) => {
    if (/^(if|for|while|switch|catch|function|new)$/.test(name)) return m;
    return `<span class="function">${name}</span>`;
  });

  // 8. 數字
  code = code.replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>');

  // 9. 還原字串與註解
  for (const { key, content, type } of tokens) {
    const span = type === 'string' 
      ? `<span class="string">${content}</span>`
      : `<span class="comment">${content}</span>`;
    code = code.replace(new RegExp(key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g'), span);
  }

  return `<pre class="tsx-code"><code>${code}</code></pre>`;
};

interface CodeTsxProps {
  code: string;
  title?: string;
  copyable?: boolean;
}

const CodeTsx: React.FC<CodeTsxProps> = ({ code, title, copyable = true }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    const { message } = require('antd');
    message.success('已複製');
  };

  return (
    <Card
      title={title}
      bodyStyle={{ padding: 0 }}
      extra={
        copyable && (
          <Tooltip title="複製程式碼">
            <CopyOutlined onClick={handleCopy} style={{ cursor: 'pointer', fontSize: 16 }} />
          </Tooltip>
        )
      }
    >
      <div
        className="tsx-highlighter"
        dangerouslySetInnerHTML={{ __html: tsxHighlight(code) }}
      />
    </Card>
  );
};

export default CodeTsx;