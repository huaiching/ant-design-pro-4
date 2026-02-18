// src/components/CodeTsx.tsx
import React from 'react';
import { Card, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './CodeTsx.css';
import { codeCopy } from './CodeCopy';

const tsxHighlight = (rawCode: string): string => {
  let code = rawCode;

  // 增加 tag 類型來存放處理好的 HTML
  const tokens: Array<{ key: string; content: string; type: 'string' | 'comment' | 'tag' }> = [];
  let counter = 0;

  const protect = (content: string, type: 'string' | 'comment' | 'tag') => {
    const key = `__${type}_${counter++}__`;
    tokens.push({ key, content, type });
    return key;
  };

  // 1. 保護字串與模板字串
  code = code.replace(/(["'])([\s\S]*?)\1/g, m => protect(m, 'string'));
  code = code.replace(/(`[\s\S]*?`)/g, m => protect(m, 'string'));

  // 2. 保護註解
  code = code.replace(/(\/\/.*$)|(\/\*(.|\s)*?\*\/)/gm, m => protect(m, 'comment'));

  // 3. 高亮 JSX 標籤 (由內而外處理嵌套)
  let prevCode;
  do {
    prevCode = code;
    // 使用 [^<>] 確保只匹配「不包含其他標籤」的最內層標籤
    code = code.replace(/<\/?([A-Za-z][\w.\-]*)([^<>]*)>/g, (match, tag, attrs) => {
      const isClosing = match.startsWith('</');
      let isSelfClosing = false;
      let cleanAttrs = attrs;

      // 判斷是否為自閉合標籤
      if (attrs.endsWith('/')) {
        isSelfClosing = true;
        cleanAttrs = attrs.slice(0, -1);
      }

      // 高亮屬性名稱
      let highlightedAttrs = cleanAttrs.replace(/([a-zA-Z\-]+)=/g, '<span class="attr-name">$1</span>=');
      // 高亮屬性內的大括號
      highlightedAttrs = highlightedAttrs.replace(/\{|\}/g, '<span class="brace">$&</span>');

      const slashLeft = isClosing ? '/' : '';
      const slashRight = isSelfClosing ? '/' : '';

      // 組合 HTML 並將其保護起來，避免干擾外層解析
      const html = `<span class="bracket">&lt;</span>${slashLeft}<span class="tag-name">${tag}</span>${highlightedAttrs}<span class="bracket">${slashRight}&gt;</span>`;
      return protect(html, 'tag');
    });
  } while (code !== prevCode); // 一直循環直到沒有新的標籤被解析

  // 4. JSX 大括號 (處理不在標籤內的大括號)
  code = code.replace(/\{|\}/g, '<span class="brace">$&</span>');

  // 5. 關鍵字
  const keywords = '\\b(await|async|break|case|catch|const|continue|debugger|default|delete|do|else|export|extends|finally|for|from|function|if|import|in|instanceof|interface|let|new|return|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|true|false|null)\\b';
  code = code.replace(new RegExp(keywords, 'g'), '<span class="keyword">$1</span>');

  // 6. 類型關鍵字
  code = code.replace(/\b(string|number|boolean|any|void|never|unknown|object)\b/g, '<span class="type">$1</span>');

  // 7. 函數名 (修復：補上了 /g 旗標，否則原本只會高亮第一個函數)
  code = code.replace(/([a-zA-Z_$][\w$]*)\s*(?=\()/g, (m, name) => {
    if (/^(if|for|while|switch|catch|function|new)$/.test(name)) return m;
    return `<span class="function">${name}</span>`;
  });

  // 8. 數字
  code = code.replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>');

  // 9. 還原 Tokens (核心修復：必須「反向」還原，以支援嵌套標籤)
  for (let i = tokens.length - 1; i >= 0; i--) {
    const { key, content, type } = tokens[i];
    const span = type === 'string'
      ? `<span class="string">${content}</span>`
      : type === 'comment'
      ? `<span class="comment">${content}</span>`
      : content; // 'tag' 本身已經是完整的 HTML
      
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
  return (
    <Card
      title={title}
      style={{  margin: '30px 0' }}
      styles={{
        body: {padding: 0, margin: '16px 0 16px 0'}
      }}
      extra={
        copyable && (
          <Tooltip title="複製">
            <CopyOutlined onClick={()=>codeCopy(code)} />
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