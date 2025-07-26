import React from 'react';
import { Button, Space, message } from 'antd';
import { useNavigate } from '@umijs/max';

const Navigate: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Space direction="vertical">
        {/* 1. 回上一頁 */}
        <Button 
          type="primary" 
          onClick={() => navigate(-1)}
        > 
          回上一頁
        </Button>

        {/* 2. 原頁面跳轉 */}
        <Button
          type="primary"
          onClick={() => navigate('/reactDemo/demo01')}
        >
          原頁面跳轉
        </Button>

        {/* 3. 新開分頁 */}
        <Button
          type="primary"
          onClick={() => window.open('/reactDemo/demo01', '_blank')}
        >
          新開分頁
        </Button>
      </Space>
    </div>
  );
};

export default Navigate;
