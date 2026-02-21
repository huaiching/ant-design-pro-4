import React from 'react';
import { List, Splitter } from 'antd';
import SubDom01 from './Components/SubDom01';
import SubDom02 from './Components/SubDom02';
import SubDom03 from './Components/SubDom03';

const Nesting: React.FC = () => {
  return (
    <>
      <Splitter
        layout="horizontal"         // 水平分割 (左右分隔)
        style={{ height: '100vh' }} // 撐滿整個畫面高度
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

        <Splitter.Panel>
          <Splitter
            layout="vertical"        // 垂直分割 (上下分隔)
          >
            {/* 頁面 2 */}
            <Splitter.Panel
              defaultSize="30%"     // 預設高度
              resizable             // 可調整高度 (預設即為 true)：全局設定
              collapsible           // 顯示收合按鈕
              min={100}             // 手動調整的最小高度
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
        </Splitter.Panel>
      </Splitter>
      
      <List
        size="small"
        dataSource={[
          "1. 複雜的布局，是透過 Splitter 的巢狀組合來達成，水平佈局中 又有 垂直布局。",
          "2. 關於 水平 與 垂直 布局的設定，詳見 前述範例。"
        ]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
};

export default Nesting;
