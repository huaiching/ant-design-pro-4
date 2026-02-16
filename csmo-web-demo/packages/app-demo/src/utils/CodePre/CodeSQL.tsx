import React from 'react';
import { Card, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './CodeSQL.css';
import { codeCopy } from './CodeCopy';

const sqlHighlight = (sql: string): string => {
  let html = sql.trim();

  // 保護字串（最優先！）
  const stringMap = new Map<string, string>();
  let idx = 0;

  html = html.replace(/(['"])([\s\S]*?)\1/g, (match) => {
    const key = `__STR_${idx++}__`;
    stringMap.set(key, `<span class="sql-string">${match}</span>`);
    return key;
  });

  // 註解
  html = html.replace(/(\/\/.*$)|(--.*$)/gm, '<span class="sql-comment">$1$2</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="sql-comment">$1</span>');

  // SQL 關鍵字（大小寫不敏感，但顯示時保持原樣）
  const keywords = `
    SELECT INSERT UPDATE DELETE FROM WHERE AND OR NOT OR IN EXISTS BETWEEN LIKE
    INNER JOIN LEFT RIGHT FULL OUTER CROSS ON GROUP BY HAVING ORDER BY ASC DESC
    LIMIT OFFSET AS DISTINCT COUNT SUM AVG MIN MAX CASE WHEN THEN ELSE END
    CREATE ALTER DROP TABLE INDEX VIEW PROCEDURE FUNCTION TRIGGER DATABASE SCHEMA
    PRIMARY KEY FOREIGN KEY UNIQUE CHECK DEFAULT NULL IS INTO VALUES SET
    UNION ALL INTERSECT EXCEPT WITH RECURSIVE CAST COALESCE NULLIF
  `.trim().split(/\s+/);

  const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
  html = html.replace(kwRegex, (match) => `<span class="sql-keyword">${match}</span>`);

  // 函數（常見聚合與內建函數）
  const functions = ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'NULLIF', 'CAST', 'NOW', 'UPPER', 'LOWER', 'TRIM', 'SUBSTR'];
  const funcRegex = new RegExp(`\\b(${functions.join('|')})\\b`, 'gi');
  html = html.replace(funcRegex, '<span class="sql-function">$&</span>');

  // 數字
  html = html.replace(/\b(\d+\.?\d*|\.\d+)\b/g, '<span class="sql-number">$1</span>');

  // 表名與欄位名（在 . 兩側或 AS 後面）
  html = html.replace(/\b([a-zA-Z_]\w*)\s*\.\s*([a-zA-Z_]\w*)/g, '$1.<span class="sql-table">$2</span>');
  html = html.replace(/\b([a-zA-Z_]\w*)\b(?=\s+AS)/gi, '<span class="sql-alias">$1</span>');

  // 還原字串
  for (const [key, value] of stringMap) {
    html = html.replace(new RegExp(key, 'g'), value);
  }

  return `<pre class="sql-code"><code>${html}</code></pre>`;
};

interface CodeSQLProps {
  sql: string;
  title?: string;
  copyable?: boolean; // 預設開啟複製
}

const CodeSQL: React.FC<CodeSQLProps> = ({ sql, title, copyable = true }) => {
  const highlighted = sqlHighlight(sql);

  return (
    <Card
      title={title}
      style={{  margin: '30px 0' }}
      styles={{
        body: {padding: 0, margin: '16px 0 16px 0'}
      }}
      size='small'
      variant="borderless"
      extra={
        copyable && (
          <Tooltip title="複製">
            <CopyOutlined onClick={()=>codeCopy(sql)}
            />
          </Tooltip>
        )
      }
    >
      <div
        className="code-sql-highlighter"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </Card>
  );
};

export default CodeSQL;