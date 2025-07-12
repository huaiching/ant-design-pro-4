import React from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import type { RefObject } from 'react';

type Props = {
  formRef: RefObject<ProFormInstance | undefined>;
};

const Tab1: React.FC<Props> = ({ formRef }) => {
  return (
    <ProCard
      title="分頁1"
      headerBordered      // 有分隔線
      collapsible         // 有摺疊
      defaultCollapsed    // 預設折疊
    >
      <h3>分頁1</h3>
    </ProCard>
  );
};

export default Tab1;
