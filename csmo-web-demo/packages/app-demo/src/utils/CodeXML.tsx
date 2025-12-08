// src/components/CodeXML.tsx
import React from 'react';
import { Card, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './CodeXML.css';

const xmlHighlight = (code: string): string => {
  let html = code.trim();

  const placeholderMap = new Map<string, string>();
  let idx = 0;

  // 保護 CDATA、註解（最優先）
  html = html.replace(/(<!\[CDATA\[[\s\S]*?\]\]>)/g, (match) => {
    const key = `__CDATA_${idx++}__`;
    placeholderMap.set(key, `<span class="xml-cdata">${match}</span>`);
    return key;
  });

  html = html.replace(/(<!--[\s\S]*?-->)/g, (match) => {
    const key = `__COMMENT_${idx++}__`;
    placeholderMap.set(key, `<span class="xml-comment">${match}</span>`);
    return key;
  });

  // 處理 <?xml ... ?> 宣告
  html = html.replace(/(&lt;\?xml[^?]*\?>)/g, (match, content) => {
    const processed = content
      .replace(/([a-zA-Z\-]+)=/g, '<span class="xml-attr-name">$1</span>=');
    return `<span class="xml-proc-instr">${processed}</span>`;
  });

  // 處理 <Tag ...> 和 </Tag>
  html = html.replace(/(&lt;\/?)([A-Za-z][\w:\-]*)([^&]*?)(&gt;)/g, (match, open, tagName, attrs, close) => {
    // 屬性高亮
    const highlightedAttrs = attrs.replace(
      /([a-zA-Z][\w:\-]*)=(["'])(.*?)\2/g,
      '<span class="xml-attr-name">$1</span>=<span class="xml-attr-value">$2$3$2</span>'
    );

    const isClosing = open.includes('/');
    return `<span class="xml-bracket">${open}</span>` +
      `<span class="xml-tag ${isClosing ? 'xml-tag-closing' : 'xml-tag-opening'}">${tagName}</span>` +
      `${highlightedAttrs}` +
      `<span class="xml-bracket">${close}</span>`;
  });

  // 處理獨立標籤 <br/> <img ... />
  html = html.replace(/(&lt;[A-Za-z][\w:\-]*[^&]*\/&gt;)/g, (match) => {
    return match.replace(
      /([a-zA-Z][\w:\-]*)=(["'])(.*?)\2/g,
      '<span class="xml-attr-name">$1</span>=<span class="xml-attr-value">$2$3$2</span>'
    );
  });

  // 還原 CDATA 和註解
  for (const [key, value] of placeholderMap) {
    html = html.replace(new RegExp(key, 'g'), value);
  }

  return `<pre class="xml-code"><code>${html}</code></pre>`;
};

interface CodeXMLProps {
  code: string;
  title?: string;
  copyable?: boolean;
}

const CodeXML: React.FC<CodeXMLProps> = ({ code, title = 'XML', copyable = true }) => {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

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
          <Tooltip title="複製 XML">
            <CopyOutlined style={{ cursor: 'pointer', fontSize: 16 }} onClick={handleCopy} />
          </Tooltip>
        )
      }
    >
      <div
        className="code-xml-highlighter"
        dangerouslySetInnerHTML={{ __html: xmlHighlight(escaped) }}
      />
    </Card>
  );
};

export default CodeXML;