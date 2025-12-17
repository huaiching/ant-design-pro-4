// src/components/CodeYAML.tsx
import React from 'react';
import { Card, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './CodeYAML.css';
import { codeCopy } from './CodeCopy';

const yamlHighlight = (raw: string): string => {
  let code = raw.trim();

  const placeholderMap = new Map<string, string>();
  let idx = 0;

  // Step 1: 保護多行字串 | 和 >（最優先！）
  code = code.replace(/^[ \t]*([|>][+-]?)\s*\n([\s\S]*?)(?=^[ \t]*\S|\Z)/gm, (match, indicator, content) => {
    const key = `__ML_${idx++}__`;
    const text = content.replace(/\n$/.test(content) ? content : content + '\n');
    placeholderMap.set(key, `<span class="yaml-multiline">${indicator}\n${text}</span>`);
    return key;
  });

  // Step 2: 保護註解
  code = code.replace(/(#.*$)/gm, (match) => {
    const key = `__C_${idx++}__`;
    placeholderMap.set(key, `<span class="yaml-comment">${match}</span>`);
    return key;
  });

  // Step 3: 錨點 &anchor 和引用 *alias
  code = code.replace(/(&[A-Za-z0-9_-]+)/g, '<span class="yaml-anchor">$1</span>');
  code = code.replace(/(\*[A-Za-z0-9_-]+)/g, '<span class="yaml-alias">$1</span>');

  // Step 4: 字串（有引號的）
  code = code.replace(/(["'])(.*?)\1/g, '<span class="yaml-string">$&</span>');

  // Step 5: 關鍵字（true, false, null, ~）
  code = code.replace(/\b(true|false|null|~)\b/g, '<span class="yaml-boolean">$1</span>');

  // Step 6: 數字（含負數、科學記號）
  code = code.replace(/\b(-?\d+\.?\d*([eE][+-]?\d+)?)\b/g, '<span class="yaml-number">$1</span>');

  // Step 7: 日期時間（2025-12-25, 2025-12-25T10:20:30Z）
  code = code.replace(/\b(\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?)\b/g,
    '<span class="yaml-datetime">$1</span>');

  // Step 8: 鍵名（: 前面的部分）
  code = code.replace(/^([ \t]*)([^#\s].*?)(?=\s*:)/gm, (match, indent, key) => {
    // 過濾掉只有符號的行（如 ---, ...)
    if (/^[-.]{3}$/.test(key.trim())) return match;
    return `${indent}<span class="yaml-key">${key}</span>`;
  });

  // Step 9: 列表項目 -
  code = code.replace(/^[ \t]*(-)\s+/gm, '<span class="yaml-dash">$1</span> ');

  // Step 10: 文檔分隔符 ---
  code = code.replace(/^(---|\.\.\.)/gm, '<span class="yaml-docsep">$1</span>');

  // Step 11: 還原保護內容
  for (const [key, value] of placeholderMap) {
    code = code.replace(new RegExp(key, 'g'), value);
  }
  
  return `<pre class="yaml-code"><code>${code}</code></pre>`;
};

interface CodeYAMLProps {
  yaml: string;
  title?: string;
  copyable?: boolean;
}

const CodeYAML: React.FC<CodeYAMLProps> = ({ yaml, title = 'YAML', copyable = true }) => {

  return (
    <Card
      bodyStyle={{ padding: 0, margin: '16px 0 16px 0' }}
      size='small'
      variant="borderless"
      extra={
        copyable && (
          <Tooltip title="複製">
            <CopyOutlined onClick={()=>codeCopy(yaml.trim())} />
          </Tooltip>
        )
      }
    >
      <div
        className="code-yaml-highlighter"
        dangerouslySetInnerHTML={{ __html: yamlHighlight(yaml) }}
      />
    </Card>
  );
};

export default CodeYAML;