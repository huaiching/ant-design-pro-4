import React from 'react';
import { List, Splitter } from 'antd';
import SubDom01 from './Components/SubDom01';
import SubDom02 from './Components/SubDom02';
import SubDom03 from './Components/SubDom03';

const Horizontal: React.FC = () => {

  return (
    <>
      {/* 分隔容器 */}
      <Splitter
        layout="horizontal"   // 水平分割 (左右分隔)
        style={{
          minHeight: '100vh',
          height: 'auto'
        }}
      >
        {/* 頁面 1 */}
        <Splitter.Panel
          defaultSize="33%"   // 預設寬度
          resizable           // 可調整寬度 (預設即為 true)：全局設定
          collapsible         // 顯示收合按鈕
          min={100}           // 手動調整的最小寬度
        >
          <SubDom01 />
        </Splitter.Panel>

        {/* 頁面 2 */}
        <Splitter.Panel
          defaultSize="33%"   // 預設寬度
        >
          <SubDom02 />
        </Splitter.Panel>

        {/* 頁面 3 */}
        <Splitter.Panel>
          <SubDom03 />
        </Splitter.Panel>
      </Splitter>

      <List
        size="small"
        dataSource={[
          "1. 水平的 Splitter.Panel 頁面需要使用 defaultSize 設定初始 寬度，才可使用 resizable 和 collapsible 功能。",
          "2. 最後一個 Splitter.Panel 頁面，不可設置 defaultSize，因為要讓他自動吃下剩餘寬度。"
        ]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  )
}

export default Horizontal;
