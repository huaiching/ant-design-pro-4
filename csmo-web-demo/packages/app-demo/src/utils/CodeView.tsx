import React, { CSSProperties } from 'react';

interface CodeViewProps {
  code: string;
  language?: 'tsx' | 'java';
  showLineNumbers?: boolean;
  theme?: 'dark' | 'light';
}

const CodeView: React.FC<CodeViewProps> = ({ 
  code, 
  language = 'tsx',
  showLineNumbers = false,
  theme = 'light'
}) => {
  const themes = {
    dark: {
      background: '#2b2b2b',
      text: '#d4d4d4',
      keyword: '#569cd6',
      string: '#ce9178',
      number: '#b5cea8',
      comment: '#6a9955',
      function: '#dcdcaa',
      class: '#4ec9b0',
      operator: '#d4d4d4',
      lineNumber: '#858585',
      lineNumberBg: '#2b2b2b'
    },
    light: {
      background: '#f5f5f5',
      text: '#333333',
      keyword: '#0000ff',
      string: '#a31515',
      number: '#098658',
      comment: '#008000',
      function: '#795e26',
      class: '#267f99',
      operator: '#000000',
      lineNumber: '#999999',
      lineNumberBg: '#f5f5f5'
    }
  };

  const currentTheme = themes[theme];

  const highlightCode = (code: string, lang: string): string => {
    // 使用特殊標記來保護已處理的內容
    const MARKER = '___PROTECTED___';
    let markerIndex = 0;
    const protectedParts: { [key: string]: string } = {};
    
    const protect = (text: string): string => {
      const key = `${MARKER}${markerIndex++}${MARKER}`;
      protectedParts[key] = text;
      return key;
    };
    
    const restore = (text: string): string => {
      let result = text;
      Object.keys(protectedParts).forEach(key => {
        result = result.replace(key, protectedParts[key]);
      });
      return result;
    };

    let highlighted = code;

    // 1. 註解（最先處理）
    highlighted = highlighted.replace(
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      (match) => protect(`<span class="comment">${match}</span>`)
    );

    // 2. 字串
    highlighted = highlighted.replace(
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
      (match) => {
        if (match.includes(MARKER)) return match;
        return protect(`<span class="string">${match}</span>`);
      }
    );

    // 3. 註解標記（Java 特有，在關鍵字之前處理）
    if (lang === 'java') {
      highlighted = highlighted.replace(
        /@[A-Za-z]+/g,
        (match) => {
          if (match.includes(MARKER)) return match;
          return protect(`<span class="annotation">${match}</span>`);
        }
      );
    }

    // 4. 定義語言特定的關鍵字和類型
    let keywords: string[] = [];
    let types: string[] = [];
    
    if (lang === 'tsx') {
      keywords = [
        'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
        'switch', 'case', 'break', 'continue', 'do', 'try', 'catch', 'finally',
        'throw', 'new', 'delete', 'typeof', 'instanceof', 'void', 'this', 'super',
        'class', 'extends', 'export', 'import', 'default', 'from', 'as', 'async',
        'await', 'yield', 'static', 'get', 'set', 'public', 'private', 'protected',
        'interface', 'type', 'enum', 'namespace', 'declare', 'abstract', 'implements',
        'readonly', 'keyof', 'infer', 'is', 'true', 'false', 'null', 'undefined'
      ];
      types = [
        'string', 'number', 'boolean', 'any', 'void', 'never', 'unknown', 'object',
        'Array', 'Promise', 'React', 'FC', 'ReactNode', 'JSX', 'Element', 'Component',
        'Props', 'State', 'Ref', 'useState', 'useEffect', 'useRef', 'useCallback',
        'useMemo', 'useContext'
      ];
    } else if (lang === 'java') {
      keywords = [
        'abstract', 'assert', 'break', 'case', 'catch', 'class', 'const', 'continue',
        'default', 'do', 'else', 'enum', 'extends', 'final', 'finally', 'for',
        'if', 'implements', 'import', 'instanceof', 'interface', 'native', 'new',
        'package', 'private', 'protected', 'public', 'return', 'static', 'strictfp',
        'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient',
        'try', 'volatile', 'while', 'true', 'false', 'null'
      ];
      types = [
        'byte', 'short', 'int', 'long', 'float', 'double', 'boolean', 'char', 'void',
        'String', 'Integer', 'Long', 'Double', 'Float', 'Boolean', 'Character',
        'Object', 'List', 'ArrayList', 'Map', 'HashMap', 'Set', 'HashSet',
        'Collection', 'Optional', 'Stream', 'Exception', 'Throwable', 'Iterator',
        'Expression'
      ];
    }

    // 5. 關鍵字高亮
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      highlighted = highlighted.replace(regex, (match, ...args) => {
        const offset = args[args.length - 2];
        const fullString = args[args.length - 1];
        // 檢查是否在受保護的區域內
        const beforeMatch = fullString.substring(0, offset);
        if (beforeMatch.includes(MARKER) && !beforeMatch.endsWith(MARKER)) {
          return match;
        }
        if (match.includes(MARKER)) return match;
        return protect(`<span class="keyword">${match}</span>`);
      });
    });

    // 6. 類型高亮
    types.forEach(type => {
      const regex = new RegExp(`\\b(${type})\\b`, 'g');
      highlighted = highlighted.replace(regex, (match, ...args) => {
        const offset = args[args.length - 2];
        const fullString = args[args.length - 1];
        const beforeMatch = fullString.substring(0, offset);
        if (beforeMatch.includes(MARKER) && !beforeMatch.endsWith(MARKER)) {
          return match;
        }
        if (match.includes(MARKER)) return match;
        return protect(`<span class="class">${match}</span>`);
      });
    });

    // 7. 數字
    highlighted = highlighted.replace(
      /\b(\d+\.?\d*[fFdDlL]?)\b/g,
      (match) => {
        if (match.includes(MARKER)) return match;
        return protect(`<span class="number">${match}</span>`);
      }
    );

    // 8. 函數名稱
    highlighted = highlighted.replace(
      /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
      (match) => {
        if (match.includes(MARKER)) return match;
        return protect(`<span class="function">${match}</span>`);
      }
    );

    // 9. JSX 標籤（TSX 特有）
    if (lang === 'tsx') {
      highlighted = highlighted.replace(
        /(&lt;|<)\/?([A-Z][a-zA-Z0-9]*)/g,
        (match, bracket, tag) => {
          if (match.includes(MARKER)) return match;
          return protect(`${bracket}<span class="jsx-tag">${tag}</span>`);
        }
      );
    }

    // 最後還原所有受保護的內容
    return restore(highlighted);
  };

  const lines = code.split('\n');
  const highlightedLines = lines.map(line => highlightCode(line, language));

  const preStyle: CSSProperties = {
    background: currentTheme.background,
    color: currentTheme.text,
    padding: showLineNumbers ? '16px 16px 16px 0' : '16px',
    borderRadius: '4px',
    overflow: 'auto',
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: 0,
    display: 'flex'
  };

  const lineNumberStyle: CSSProperties = {
    color: currentTheme.lineNumber,
    textAlign: 'right',
    paddingRight: '16px',
    paddingLeft: '16px',
    userSelect: 'none',
    minWidth: '40px',
    background: currentTheme.lineNumberBg,
    borderRight: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`
  };

  const codeStyle: CSSProperties = {
    flex: 1,
    paddingLeft: showLineNumbers ? '16px' : '0'
  };

  const styleContent = `
    .keyword { color: ${currentTheme.keyword}; font-weight: 600; }
    .string { color: ${currentTheme.string}; }
    .number { color: ${currentTheme.number}; }
    .comment { color: ${currentTheme.comment}; font-style: italic; }
    .function { color: ${currentTheme.function}; }
    .class { color: ${currentTheme.class}; font-weight: 500; }
    .operator { color: ${currentTheme.operator}; }
    .annotation { color: #c586c0; font-style: italic; }
    .jsx-tag { color: ${currentTheme.class}; font-weight: 600; }
  `;

  return (
    <>
      <style>{styleContent}</style>
      <pre style={preStyle}>
        {showLineNumbers && (
          <div style={lineNumberStyle}>
            {lines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
        )}
        <code style={codeStyle}>
          {highlightedLines.map((line, index) => (
            <div 
              key={index}
              dangerouslySetInnerHTML={{ __html: line || '<br/>' }}
            />
          ))}
        </code>
      </pre>
    </>
  );
};

export default CodeView;