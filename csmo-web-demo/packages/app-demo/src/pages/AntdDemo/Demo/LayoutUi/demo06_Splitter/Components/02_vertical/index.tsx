import React from 'react';
import { List, Splitter } from 'antd';
import SubDom01 from './Components/SubDom01';
import SubDom02 from './Components/SubDom02';
import SubDom03 from './Components/SubDom03';

const Vertical: React.FC = () => {
  return (
    <>
      <Splitter
        layout="vertical"        // 垂直分割 (上下分隔)
        style={{
          minHeight: '100vh', // 至少滿螢幕高度
          height: 'auto',     // 高度隨內容自動延伸
        }}
      >
        {/* 頁面 1 */}
        <Splitter.Panel
          defaultSize="30%"      // 預設高度
          resizable              // 可調整高度 (預設即為 true)：全局設定
          collapsible            // 顯示收合按鈕
          min={100}              // 手動調整的最小高度
        >
          <SubDom01 />
        </Splitter.Panel>

        {/* 頁面 2 */}
        <Splitter.Panel
          defaultSize="30%"     // 預設高度
        >
          <SubDom02 />
        </Splitter.Panel>

        {/* 頁面 3 */}
        <Splitter.Panel
        // 垂直布局，最後一個頁面，不需要設定寬度
        >
          <SubDom03 />
        </Splitter.Panel>
      </Splitter>

      <List
        size="small"
        dataSource={[
          "1. 垂直的 Splitter.Panel 頁面需要使用 defaultSize 設定初始 高度，才可使用 resizable 和 collapsible 功能。",
          "2. 最後一個 Splitter.Panel 頁面，不可設置 defaultSize，因為要讓他自動吃下剩餘高度。",
          "3. 垂直布局的 Splitter 高度極限就是 一個頁面的內容高度。",
        ]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
};

export default Vertical;
