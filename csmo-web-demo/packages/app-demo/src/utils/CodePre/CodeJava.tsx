import React from 'react';
import { Card, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './CodeJava.css';
import { codeCopy } from './CodeCopy';

const javaHighlight = (code: string): string => {
  let html = code.trim();

  const placeholderMap = new Map<string, string>();
  let index = 0;

  // 先保護所有字串（最最最重要！）
  html = html.replace(/(["'])([\s\S]*?)\1/g, (match) => {
    const key = `__STR_${index++}__`;
    placeholderMap.set(key, `<span class="java-string">${match}</span>`);
    return key;
  });

  // 保護註解（避免裡面有 " 或 // 被誤處理）
  html = html.replace(/(\/\/.*$)|((\/\*)[\s\S]*?(\*\/))/gm, (match, single, block) => {
    const key = `__COMMENT_${index++}__`;
    placeholderMap.set(key, `<span class="java-comment">${match}</span>`);
    return key;
  });

  // 關鍵字
  const keywords = 'abstract assert boolean break byte case catch char class const continue default do double else enum exports extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try var void volatile while true false null'.split(' ');
  html = html.replace(new RegExp(`\\b(${keywords.join('|')})\\b`, 'g'), '<span class="java-keyword">$1</span>');

  // 類型（內建類 + 常見類）
  const types = 'Boolean Byte Character Double Float Integer Long Number Short String Object List Map Set Stream Optional Thread Runnable'.split(' ');
  html = html.replace(new RegExp(`\\b(${types.join('|')})\\b`, 'g'), '<span class="java-type">$1</span>');

  // 註解關鍵字 @Override @Deprecated 等
  html = html.replace(/(@[A-Za-z]\w*)/g, '<span class="java-annotation">$1</span>');

  // 方法名稱（在 ( 前面的識別字，且後面有 (）
  html = html.replace(/\b([a-zA-Z_]\w*)\s*(?=\([^)]*\)\s*{)/g, (match, name) => {
    if (keywords.includes(name) || types.includes(name)) return match;
    return `<span class="java-function">${name}</span>`;
  });

  // 類名稱（class / interface / enum 後面的名字）
  html = html.replace(/\b(class|interface|enum|@interface)\s+([A-Z][\w]*)/g, '$1 <span class="java-class">$2</span>');

  // 數字
  html = html.replace(/\b(\d+\.?\d*([eE][+-]?\d+)?|\.\d+([eE][+-]?\d+)?)\b/g, '<span class="java-number">$1</span>');


  // 還原字串與註解
  for (const [key, value] of placeholderMap) {
    html = html.replace(new RegExp(key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), value);
  }

  return `<pre class="java-code"><code>${html}</code></pre>`;
};

interface CodeJavaProps {
  code: string;
  title?: string;
  copyable?: boolean;
}

const CodeJava: React.FC<CodeJavaProps> = ({ code, title, copyable = true }) => {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return (
    <Card
      title={title}
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
        className="code-java-highlighter"
        dangerouslySetInnerHTML={{ __html: javaHighlight(escaped) }}
      />
    </Card>
  );
};

export default CodeJava;