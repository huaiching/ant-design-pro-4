// src/pages/CaseFlow/index.tsx
import React from 'react';
import { Card, Badge, Row, Col, Typography, message } from 'antd';
import { MliFormCol, MliFormRow } from '@mli-csmo/base';


// 模擬流程資料
const processList = [
  { key: 'analysis', title: '分析', count: 4 },
  { key: 'development', title: '開發', count: 20 },
  { key: 'testing', title: '測試', count: 100 },
  { key: 'release', title: '上線', count: 0 },
];

const cardOnClick = (title: string) => {
  message.info(`點擊了 ${title} 卡片`);
};

const CaseFlow: React.FC = () => {
  return (
    <>
      <MliFormRow>
        {processList.map((item) => (
          <MliFormCol colSize={1} key={item.key}>
            <Card
              hoverable
              onClick={() => cardOnClick(item.title)}
              style={{
                textAlign: 'center',
                borderRadius: 12,
                backgroundColor: '#e6f7ff', // 淺藍底色
                border: '1px solid #91d5ff', // 淺藍邊框
              }}
            >
              <Badge
                showZero
                count={item.count}
                offset={[10, 0]}
                style={{
                  backgroundColor: item.count > 0 ? 'red' : 'blue'
                }}
              >
                <Typography.Title level={4}>{item.title}</Typography.Title>
              </Badge>
            </Card>
          </MliFormCol>
        ))}
      </MliFormRow>
    </>
  );
};

export default CaseFlow;
