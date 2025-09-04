// src/pages/CaseFlow/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Badge, Row, Col, Typography, message } from 'antd';
import { MliFormCol, MliFormRow } from '@/common/base';

const { Title } = Typography;

// 模擬流程資料
const processList = [
  { key: 'analysis', title: '分析', count: 4 },
  { key: 'development', title: '開發', count: 2 },
  { key: 'testing', title: '測試', count: 6 },
  { key: 'release', title: '上線', count: 0 },
];

const CaseFlow: React.FC = () => {
  return (
      <MliFormRow>
        {processList.map((item) => (
          <MliFormCol colSize={1} key={item.key}>
            <Badge count={item.count}>
              <Card
                title={<Title level={4}>{item.title}</Title>}
                hoverable
                onClick={() => {
                  message.info(`點擊了 ${item.title} 卡片`);
                }}
                style={{
                  textAlign: 'center',
                  borderRadius: 12,
                  backgroundColor: '#e6f7ff', // 淺藍底色
                  border: '1px solid #91d5ff', // 淺藍邊框
                }}
              >
                {item.count > 0 ? `${item.count} 個案件` : '暫無案件'}
              </Card>
            </Badge>
          </MliFormCol>
        ))}
      </MliFormRow>
  );
};

export default CaseFlow;
