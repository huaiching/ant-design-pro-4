import React, { useState } from 'react';
import { Tabs, Button, Space } from 'antd';

const { TabPane } = Tabs;

const tabItems = [
  { key: '1', label: '步驟一', content: '這是第一步的內容' },
  { key: '2', label: '步驟二', content: '這是第二步的內容' },
  { key: '3', label: '步驟三', content: '這是第三步的內容' },
];

const StepTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState(tabItems[0].key);

  const currentIndex = tabItems.findIndex(item => item.key === activeKey);

  const goNext = () => {
    if (currentIndex < tabItems.length - 1) {
      setActiveKey(tabItems[currentIndex + 1].key);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setActiveKey(tabItems[currentIndex - 1].key);
    }
  };

  return (
    <div>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {tabItems.map(item => (
          <TabPane tab={item.label} key={item.key}>
            <div>{item.content}</div>
          </TabPane>
        ))}
      </Tabs>

      <Space style={{ marginTop: 16 }}>
        <Button onClick={goPrev} disabled={currentIndex === 0}>
          上一步
        </Button>
        <Button onClick={goNext} disabled={currentIndex === tabItems.length - 1}>
          下一步
        </Button>
      </Space>
    </div>
  );
};

export default StepTabs;
