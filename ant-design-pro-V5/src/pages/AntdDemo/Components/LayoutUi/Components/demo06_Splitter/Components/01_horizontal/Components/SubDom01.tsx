import { Flex, Typography } from 'antd';
import React from 'react';

const SubDom01: React.FC = () => {
  return (
    <Flex justify="center" align="center" style={{ height: '100%' }}>
      <Typography.Title level={5}>
        SubDom01
      </Typography.Title>
      <div style={{ height: '1000px' }}>長內容區域...</div>
    </Flex>
  );
};

export default SubDom01;