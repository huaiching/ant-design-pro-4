import React, { useState } from 'react';
import './index.css';

interface Chapter {
  id: string;
  title: string;
}

const App: React.FC = () => {
  const chapters: Chapter[] = [
    { id: '01', title: 'React_簡介' },
    { id: '02', title: '頁面檔的基本結構' },
    { id: '03_01', title: 'JS 介紹 - TypeScript簡介 及 使用CSS' },
    { id: '03_02', title: 'JS 介紹 - 變數的宣告與型別設定' },
    { id: '03_03', title: 'JS 介紹 - type (複雜型別)' },
    { id: '03_04', title: 'JS 介紹 - interface(介面)' },
    { id: '03_05', title: 'JS 介紹 - 陣列' },
    { id: '03_06', title: 'JS 介紹 - 陣列 - map 與 foreach' },
    { id: '03_07', title: 'JS 介紹 - 陣列 - 數值修改' },
    { id: '03_08', title: 'JS 介紹 - 函式' },
    { id: '03_09', title: 'JS 介紹 - 多型別變數(聯集與交集)' },
    { id: '03_10', title: 'JS 介紹 - JS 語句' },
    { id: '03_11', title: 'JS 介紹 - 樣板字串' },
    { id: '03_12', title: 'JS 介紹 - 空值判斷' },
    { id: '04', title: 'useState 狀態機' },
    { id: '05', title: 'props 組件的信息傳遞 (父傳子)' },
    { id: '06', title: 'useReducer 管理複雜邏輯的狀態機' },
    { id: '07', title: 'useContext 遠端的信息傳遞' },
    { id: '08', title: 'useEffect 效果鉤子' },
    { id: '09', title: 'useRef 從輸入框獲取值' },
    { id: '10', title: 'useSyncExternalStore 外部資料訂閱' },
    { id: '11', title: '附錄 - Button 的 onClick 呼叫函式的寫法' },
    { id: '12', title: '附錄 - 下載後端API產出的檔案' },
    { id: '13', title: '附錄 - 正規表達式' }
  ];

  const [activeHref, setActiveHref] = useState('ReactNote/01_React_簡介.html');

  const handleLinkClick = (href: string) => {
    setActiveHref(href);
  };

  // iframe 載入完成後更新 active 樣式
  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = e.currentTarget;
    try {
      const src = iframe.contentWindow?.location.pathname.split('/').pop();
      if (src) {
        const fullPath = 'ReactNote/' + src;
        setActiveHref(fullPath);
      }
    } catch {
      // 不同來源 (CORS) 時可能無法讀取，略過
    }
  };

  return (
    <div className="app-container">
      <nav>
        <h2>React 教學筆記</h2>
        <ul>
          {chapters.map(chapter => {
            const href = `ReactNote/${chapter.id}_${chapter.title}.html`;
            return (
              <li key={chapter.id}>
                <a
                  href={href}
                  target="content-frame"
                  onClick={() => handleLinkClick(href)}
                  className={activeHref === href ? 'active' : ''}
                >
                  {chapter.id} {chapter.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <iframe
        name="content-frame"
        src={activeHref}
        id="content-frame"
        onLoad={handleIframeLoad}
        title="content"
      />
    </div>
  );
};

export default App;
