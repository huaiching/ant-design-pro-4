import React from 'react';
import { ProFormInstance } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

interface Tab1Props {
  formRef: React.RefObject<ProFormInstance>;
}

const Tab1: React.FC<Tab1Props> = ({ formRef }) => {
  return (
    <ProCard 
      ghost
      title="分頁1"
      headerBordered      // 有 分隔線
      collapsible         // 有 摺疊
      defaultCollapsed    // 預設 折疊
    >
       <h3>分頁1</h3>
    </ProCard>
  )
};

export default Tab1;