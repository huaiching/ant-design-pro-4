// src/components/CodeTsx.tsx （最終無敵版）
import React from 'react';
import './CodeTsx.css';
import { CopyOutlined } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';

const KEYWORDS = 'abstract as async await break case catch class const continue constructor debugger declare default delete do else enum export extends false finally for from function if implements import in instanceof interface let module new null of package private protected public return satisfies static super switch this throw true try typeof var void while with yield'.split(' ');

const tsxHighlight = (code: string): string => {
  let html = code.trim();

  // Step 1: 先把所有字串先完整保護起來（最最最重要！）
  const stringMap = new Map<string, string>();
  let stringIndex = 0;

  html = html.replace(/(['"`])([\s\S]*?)\1/g, (match) => {
    const key = `__STRING_${stringIndex++}__`;
    stringMap.set(key, `<span class="string">${match}</span>`);
    return key;
  });

  // 模板字串也要保護
  html = html.replace(/(`[\s\S]*?`)/g, (match) => {
    const key = `__TEMPLATE_${stringIndex++}__`;
    stringMap.set(key, `<span class="string">${match}</span>`);
    return key;
  });

  // Step 2: 註解（也要避開已經被保護的字串）
  html = html.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');

  // Step 3: 數字
  html = html.replace(/\b(\d[\d_]*(\.\d[\d_]*)?)\b/g, '<span class="number">$1</span>');

  // Step 4: 關鍵字（import、export、from、type 等）
  html = html.replace(new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g'), '<span class="keyword">$1</span>');

  // Step 5: TS 類型關鍵字
  html = html.replace(/\b(string|number|boolean|any|void|never|unknown|object|Record|Partial|Readonly|Array)\b/g,
    '<span class="type">$1</span>');

  // Step 6: 函數名稱
  html = html.replace(/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g, (match, name) => {
    if (KEYWORDS.includes(name)) return match;
    return `<span class="function">${name}</span>`;
  });

  // Step 7: 現在才安全地處理 JSX（因為字串已經被保護了！）
  html = html.replace(/(&lt;)(\/)?([A-Za-z][\w.\-]*)([^&>]*)(&gt;)/g, (match, lt, slash, tag, attrs, gt) => {
    const highlightedAttrs = attrs
      .replace(/([a-zA-Z\-]+)=/g, '<span class="attr-name">$1</span>=')
      .replace(/(=\{)/g, '<span class="brace">$1</span>'); // { 在屬性值裡
    return `<span class="bracket">${lt}</span>${slash || ''}<span class="tag-name">${tag}</span>${highlightedAttrs}<span class="bracket">${gt}</span>`;
  });

  // Step 8: JSX 表達式大括號
  html = html.replace(/(\{|\})/g, '<span class="brace">$1</span>');

  // Step 9: 最後把保護的字串還原回來
  for (const [key, value] of stringMap) {
    html = html.replace(new RegExp(key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g'), value);
  }

  return `<pre class="tsx-code"><code>${html}</code></pre>`;
};

interface CodeTsxProps {
  code: string;
  title?: string;
  copyable?: boolean;
}

const CodeTsx: React.FC<CodeTsxProps> = ({ code, copyable = true }) => {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
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
        className="tsx-highlighter"
        dangerouslySetInnerHTML={{ __html: tsxHighlight(escaped) }}
      />
    </Card>
  );
};

export default CodeTsx;